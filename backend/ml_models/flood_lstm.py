import torch
import torch.nn as nn

class FloodLSTM(nn.Module):
    def __init__(self, input_size=5, hidden_size=64, num_layers=2):
        super(FloodLSTM, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])
        return self.sigmoid(out)

# Mock inference function
def predict_flood_risk(rainfall_data: list) -> float:
    # In production, we'd load weights and run model
    # model = FloodLSTM()
    # model.load_state_dict(torch.load("weights.pth"))
    # return model(tensor_data).item()
    return 0.82  # Mocked output for deployment scaffolding
