# Society Twin AI

A powerful AI-driven Digital Twin of Society capable of simulating, predicting, and optimizing real-world societal systems before crises occur.

## Mission

Build a government-scale AI platform that creates a living digital replica of cities, districts, states, and nations. The system predicts and simulates:
- Floods
- Traffic Congestion
- Healthcare Demand
- Population Migration
- Resource Optimization

## Architecture

This platform leverages a microservices, event-driven architecture:
- **Frontend Command Center**: Next.js (React), TailwindCSS, Mapbox GL for interactive 3D simulations.
- **Backend API**: FastAPI (Python) for rapid, high-performance service endpoints.
- **Multi-Agent Governance AI**: LangGraph/CrewAI framework where AI agents (Climate, Traffic, Governor) analyze data and debate policy outcomes.
- **Machine Learning**: PyTorch models (LSTMs, GNNs) for predictive forecasting.
- **Data Infrastructure**: PostgreSQL (PostGIS) for spatial data, Redis for caching, Kafka for real-time streams.

## Getting Started

### Prerequisites
- Docker & Docker Compose

### Quickstart

To spin up the entire ecosystem locally:

```bash
docker-compose up --build
```

This will initialize:
1. PostgreSQL (with PostGIS) on port `5432`
2. Redis on port `6379`
3. Kafka & Zookeeper on ports `9092` & `2181`
4. FastAPI Backend on `http://localhost:8000`
5. Next.js Command Center on `http://localhost:3000`

### Mapbox Configuration
To view the interactive map layers, you must provide a valid Mapbox access token. Update the `mapboxAccessToken` prop in `frontend/src/app/page.tsx`.

## Modules

Currently, the MVP includes:
- **Command Center Dashboard**: Real-time simulation interface.
- **Multi-Agent Governance System**: Mocked agents that synthesize events to produce actionable policy recommendations.
- **PyTorch ML Scaffolding**: Foundational stubs for `FloodLSTM` and `TrafficGNN` models.

## License
MIT License
