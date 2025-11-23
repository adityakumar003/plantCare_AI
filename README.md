# Plant Disease Prediction

A small full-stack project that detects plant leaf diseases using a trained ML model served by a Flask backend and a React (Vite) frontend.

**Quick overview**
- **Backend:** `backend/app.py` (Flask) — serves a `/predict` endpoint and uses `backend/plant_disease_prediction_model.h5`.
- **Frontend:** `plant-disease-ui/` — Vite + React UI for uploading images and displaying predictions.

**Repository structure**

- `backend/`
  - `app.py` — Flask app (prediction endpoint)
  - `plant_disease_prediction_model.h5` — trained model file (included)

- `plant-disease-ui/`
  - React app (Vite)
  - `src/` — UI source files

- `package.json` — root package (if present)

**Requirements**

- Node >= 16 (for the frontend)
- Python 3.8+ (for the backend)
- `pip` to install Python dependencies

**Backend — Setup & Run (Windows `cmd.exe`)**

1. Create and activate a Python virtual environment:

```cmd
cd backend
python -m venv venv
venv\Scripts\activate
```

2. Install dependencies (create `requirements.txt` if not present):

```cmd
pip install flask tensorflow pillow numpy
rem OR: pip install -r requirements.txt
```

3. Start the Flask app:

```cmd
set FLASK_APP=app.py
set FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000
```

Notes:
- The Flask service expects the model file at `backend/plant_disease_prediction_model.h5`. If you replace the model, keep the filename or update `app.py` accordingly.
- If your model requires a specific TensorFlow version, pin it in `requirements.txt`.

**API — Example**

- Endpoint: `POST http://localhost:5000/predict` (multipart/form-data with key `image`)

Example `curl` (Windows `cmd.exe`):

```cmd
curl -X POST -F "image=@C:\path\to\leaf.jpg" http://localhost:5000/predict
```

The API should return a JSON object with fields like `disease`, `confidence`, `severity`, `description`, and `treatment` (example structure used by the UI).

**Frontend — Setup & Run (Windows `cmd.exe`)**

1. Install dependencies and run the dev server:

```cmd
cd plant-disease-ui
npm install
npm run dev
```

2. Open the dev URL printed by Vite (usually `http://localhost:5173`). The UI uploads images and posts them to the backend endpoint — confirm the backend is running on `http://localhost:5000`.

3. To build the production frontend:

```cmd
npm run build
npm run preview
```

**Development notes & tips**

- The frontend expects a `/home` route for navigation from the landing page — ensure the React router or page links match your setup.
- If the backend listens on a different port or host, update the request URL in `plant-disease-ui/src/*` where the fetch is made.
- Use the browser dev console to troubleshoot CORS issues; add CORS support in Flask with `flask-cors` if needed:

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```

**How the UI works (high level)**

- User uploads an image via the drag-and-drop or file browser control.
- Frontend sends the image to the backend `/predict` endpoint.
- Backend loads the image, runs the model, and returns a JSON prediction.
- UI displays disease details, confidence bar, severity chip, and recommended treatments.

**Contributing**

- Improve the model: retrain and replace `backend/plant_disease_prediction_model.h5`.
- Improve the UI: edit files under `plant-disease-ui/src/` (components `landing.jsx`, `home.jsx`, `upload.jsx` etc.).

**License**

- Add a license file or choose a license for your project.

If you'd like, I can also:
- Add a `requirements.txt` generated from your environment.
- Add a simple `Procfile` or `Dockerfile` for deployment.

***
+Generated on Nov 24, 2025 — adjust as needed for your environment.
