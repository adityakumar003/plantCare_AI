from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

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

        # Severity condition
        if confidence > 80:
            severity = "High"
        elif confidence > 50:
            severity = "Moderate"
        else:
            severity = "Low"

        response = {
            "disease": disease_name,
            "confidence": confidence,
            "severity": severity,
            "description": f"{disease_name} detected with {confidence}% confidence.",
            "treatment": [
                "Remove infected leaves",
                "Apply appropriate fungicide or pesticide",
                "Improve ventilation and sunlight exposure",
                "Avoid overhead watering to reduce moisture"
            ]
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
