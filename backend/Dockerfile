FROM python:3.10-slim

WORKDIR /app

# Install system deps for Pillow / TensorFlow if needed
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libglib2.0-0 ca-certificates wget \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app

EXPOSE 5000

ENV FLASK_ENV=production

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
