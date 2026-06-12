from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents.governor import run_simulation

app = FastAPI(title="Society Twin AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Society Twin AI Backend MVP"}

@app.get("/api/v1/predict/flood")
def predict_flood():
    # Mock data for MVP
    return {
        "status": "success",
        "data": {
            "risk_level": "High",
            "probability": 0.85,
            "affected_zones": ["Zone A", "Zone B"]
        }
    }

@app.get("/api/v1/predict/traffic")
def predict_traffic():
    # Mock data for MVP
    return {
        "status": "success",
        "data": {
            "congestion_level": "Severe",
            "bottlenecks": ["Main St Intersect", "Highway 4"]
        }
    }

class ScenarioRequest(BaseModel):
    scenario: str

@app.post("/api/v1/simulate")
def simulate_scenario(req: ScenarioRequest):
    result = run_simulation(req.scenario)
    return {
        "status": "success",
        "scenario": req.scenario,
        "results": result
    }
