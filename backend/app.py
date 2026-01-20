from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# --------------------------
# Configure Gemini AI
# --------------------------
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    print("✅ Gemini AI configured successfully")
else:
    print("⚠️  WARNING: GEMINI_API_KEY not found. AI recommendations will use fallback.")

# --------------------------
# Load Model
# --------------------------
MODEL_PATH = "plant_disease_prediction_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# --------------------------
# Load class labels from labels.txt
# --------------------------
try:
    with open("labels.txt", "r") as f:
        CLASS_NAMES = [line.strip() for line in f.readlines()]
    print(f"\n✅ Loaded {len(CLASS_NAMES)} labels from labels.txt\n")
except Exception as e:
    print(f"⚠ ERROR: labels.txt missing or unreadable -> {e}")
    CLASS_NAMES = None


# --------------------------
# Preprocess Image
# --------------------------
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))  # adjust based on model training input size
    img = np.array(img) / 255.0
    return np.expand_dims(img, axis=0)


# --------------------------
# Generate AI Treatment Recommendations
# --------------------------
def generate_treatment_recommendations(disease_name, confidence, severity):
    """
    Use Google Gemini AI to generate personalized treatment recommendations.
    Returns None for healthy plants.
    Falls back to generic recommendations if API is unavailable.
    """
    # Check if plant is healthy
    if "healthy" in disease_name.lower():
        return None  # No treatment needed for healthy plants
    
    # Fallback generic recommendations
    fallback_treatment = [
        "Remove infected leaves and dispose of them properly",
        "Apply appropriate fungicide or pesticide as recommended",
        "Improve air circulation and sunlight exposure",
        "Avoid overhead watering to reduce moisture on leaves",
        "Monitor plant health regularly and isolate infected plants"
    ]
    
    if not GEMINI_API_KEY:
        return fallback_treatment
    
    try:
        # Create the Gemini model (using the correct model path)
        model = genai.GenerativeModel('models/gemini-2.0-flash-lite')
        
        # Construct detailed prompt
        prompt = f"""You are an expert plant pathologist and agricultural specialist. A plant has been diagnosed with the following disease:

Disease: {disease_name}
Confidence: {confidence}%
Severity: {severity}

Provide 5-6 specific, actionable treatment steps for this exact disease. Your recommendations should be:
1. Specific to this disease (not generic advice)
2. Include immediate actions to take
3. Mention specific fungicides, pesticides, or organic treatments with product names when applicable
4. Include cultural practices to prevent spread
5. Provide long-term management strategies

Format your response as a simple numbered list. Each step should be one clear, concise sentence. Do not include any introductory text, explanations, or conclusions - ONLY the numbered treatment steps.

Example format:
1. First treatment step here
2. Second treatment step here
3. Third treatment step here"""
        
        # Generate content
        response = model.generate_content(prompt)
        
        if response and response.text:
            # Parse the response into a list
            treatment_text = response.text.strip()
            # Split by lines and clean up
            treatments = []
            for line in treatment_text.split('\n'):
                line = line.strip()
                # Remove numbering if present (e.g., "1. " or "1) ")
                if line and len(line) > 3:
                    # Remove common numbering patterns
                    import re
                    cleaned = re.sub(r'^\d+[\.\)\-]\s*', '', line)
                    if cleaned and not cleaned.startswith('*'):  # Skip bullet points
                        treatments.append(cleaned)
            
            # Return treatments if we got valid results, otherwise fallback
            if treatments and len(treatments) >= 3:
                return treatments[:6]  # Limit to 6 items
            else:
                print("⚠️  Gemini returned insufficient treatments, using fallback")
                return fallback_treatment
        else:
            print("⚠️  Gemini returned empty response, using fallback")
            return fallback_treatment
            
    except Exception as e:
        error_message = str(e)
        
        # Check if it's a rate limit error
        if "quota" in error_message.lower() or "rate limit" in error_message.lower():
            print(f"⚠️  Gemini API Rate Limit: {e}")
            print("   Using fallback treatment recommendations")
            # Return fallback with a note about rate limiting
            return [
                "⚠️ Note: AI recommendations temporarily unavailable due to API rate limits",
                "Remove infected leaves and dispose of them properly to prevent disease spread",
                "Apply appropriate fungicide or pesticide as recommended for this specific disease",
                "Improve air circulation around plants and ensure adequate sunlight exposure",
                "Avoid overhead watering to reduce moisture on leaves",
                "Monitor plant health regularly and isolate infected plants from healthy ones"
            ]
        else:
            print(f"❌ Gemini API Error: {e}")
            print("   Using fallback treatment recommendations")
            return fallback_treatment



# --------------------------
# Prediction Route
# --------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        img_bytes = request.files["image"].read()
        processed = preprocess_image(img_bytes)

        predictions = model.predict(processed)[0]
        predicted_index = int(np.argmax(predictions))

        # 🔍 Validate matching label count
        if CLASS_NAMES is None or len(CLASS_NAMES) != len(predictions):
            return jsonify({
                "error": "Label file mismatch!",
                "model_output_classes": len(predictions),
                "labels_in_file": len(CLASS_NAMES) if CLASS_NAMES else 0,
                "message": "Make sure labels.txt contains the same number of classes as the model."
            }), 500

        disease_raw = CLASS_NAMES[predicted_index]
        confidence = round(float(np.max(predictions)) * 100, 2)

        # 🔥 Format name for readability
        disease_name = disease_raw.replace("___", " ").replace("_", " ").title()
        
        # Check if plant is healthy
        is_healthy = "healthy" in disease_raw.lower()

        # Severity condition
        if confidence > 80:
            severity = "High"
        elif confidence > 50:
            severity = "Moderate"
        else:
            severity = "Low"

        # Generate AI-powered treatment recommendations (None for healthy plants)
        treatment_recommendations = generate_treatment_recommendations(
            disease_name, confidence, severity
        )
        
        # Create response based on plant health
        if is_healthy:
            response = {
                "disease": "No Disease Detected",
                "confidence": confidence,
                "severity": "None",
                "description": f"Your {disease_name.replace('Healthy', '').strip()} plant appears to be healthy! No disease detected.",
                "treatment": None,
                "is_healthy": True
            }
        else:
            response = {
                "disease": disease_name,
                "confidence": confidence,
                "severity": severity,
                "description": f"{disease_name} detected with {confidence}% confidence.",
                "treatment": treatment_recommendations,
                "is_healthy": False
            }

        print(f"🟢 Prediction: {response}")
        return jsonify(response)

    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500


# --------------------------
# Default Route
# --------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "🌱 Plant Disease Detection API Running"})


# --------------------------
# Run Server
# --------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
