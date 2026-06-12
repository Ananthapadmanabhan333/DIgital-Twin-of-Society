FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for PostGIS and PyTorch if needed
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# We'll add SQLAlchemy, psycopg2, PyTorch later, but ensure basic reqs work
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir sqlalchemy psycopg2-binary redis kafka-python torch torchvision

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
