from typing import TypedDict, Annotated, List
from langgraph.graph import StateGraph, END
import json

class AgentState(TypedDict):
    scenario: str
    flood_risk: str
    traffic_status: str
    recommendations: List[str]
    final_policy: str

def climate_agent(state: AgentState):
    # Mock climate agent logic
    # In a real scenario, this would query the DB and use LLM
    risk = "High flood risk in Zone A due to simulated 40% rainfall increase."
    return {"flood_risk": risk}

def traffic_agent(state: AgentState):
    # Mock traffic agent logic
    status = "Severe congestion on Highway 4; bottlenecks expected during evacuation."
    return {"traffic_status": status}

def governor_agent(state: AgentState):
    # Synthesize recommendations
    recommendation = f"Based on Climate ({state.get('flood_risk')}) and Traffic ({state.get('traffic_status')}), recommend early evacuation of Zone A via alternative Route B."
    
    current_recs = state.get("recommendations", [])
    current_recs.append(recommendation)
    
    return {
        "recommendations": current_recs,
        "final_policy": "Activate Emergency Response Plan Alpha. Deploy resources to Zone A. Reroute traffic from Highway 4."
    }

# Build LangGraph
workflow = StateGraph(AgentState)

workflow.add_node("climate_agent", climate_agent)
workflow.add_node("traffic_agent", traffic_agent)
workflow.add_node("governor_agent", governor_agent)

# Simple linear flow for MVP
workflow.set_entry_point("climate_agent")
workflow.add_edge("climate_agent", "traffic_agent")
workflow.add_edge("traffic_agent", "governor_agent")
workflow.add_edge("governor_agent", END)

app_graph = workflow.compile()

def run_simulation(scenario: str):
    initial_state = {
        "scenario": scenario,
        "flood_risk": "",
        "traffic_status": "",
        "recommendations": [],
        "final_policy": ""
    }
    result = app_graph.invoke(initial_state)
    return result
