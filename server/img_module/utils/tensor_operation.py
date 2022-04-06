import torch


def normalization_by_range(t):
    max = torch.max(t)
    min = torch.min(t)
    normalized_t = (t - min) / (max - min)

    return normalized_t
