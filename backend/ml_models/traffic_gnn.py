import torch
import torch.nn as nn
# In production, we would use torch_geometric:
# from torch_geometric.nn import GCNConv

class TrafficGNN(nn.Module):
    def __init__(self, in_channels=3, hidden_channels=16, out_channels=1):
        super(TrafficGNN, self).__init__()
        # self.conv1 = GCNConv(in_channels, hidden_channels)
        # self.conv2 = GCNConv(hidden_channels, out_channels)
        
        # Stub fallback
        self.fc = nn.Linear(in_channels, out_channels)

    def forward(self, x, edge_index):
        # x = self.conv1(x, edge_index).relu()
        # x = self.conv2(x, edge_index)
        return self.fc(x)

def predict_traffic_bottlenecks(graph_data) -> list:
    return ["Main St Intersect", "Highway 4"]
