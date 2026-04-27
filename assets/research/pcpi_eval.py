from dataclasses import dataclass

def clamp(value: float, low: float = 0, high: float = 100) -> float:
    return max(low, min(high, value))

@dataclass
class PCPIFeatures:
    final_judgment_retention: float
    reasoning_scaffolding: float
    alternatives_tradeoffs: float
    user_context_integration: float
    verification_path: float
    skill_transfer: float
    appropriate_automation: float
    over_decision: float
    substitute_tone: float
    premature_closure: float
    hidden_black_box: float
    dependency_reinforcement: float
    normative_pressure: float

def classify_pcpi(score: float) -> str:
    if score >= 80:
        return "capacity_building"
    if score >= 60:
        return "capacity_preserving"
    if score >= 40:
        return "mixed_at_risk"
    if score >= 20:
        return "capacity_eroding"
    return "participation_collapse"

def score_pcpi(features: PCPIFeatures) -> dict:
    positives = [
        features.final_judgment_retention,
        features.reasoning_scaffolding,
        features.alternatives_tradeoffs,
        features.user_context_integration,
        features.verification_path,
        features.skill_transfer,
        features.appropriate_automation,
    ]
    penalties = [
        features.over_decision,
        features.substitute_tone,
        features.premature_closure,
        features.hidden_black_box,
        features.dependency_reinforcement,
        features.normative_pressure,
    ]
    positive_participation = sum(positives) / len(positives)
    collapse_penalty = sum(penalties) / len(penalties)
    score = clamp((positive_participation * 100) - (collapse_penalty * 60))
    return {
        "pcpi_score": round(score, 2),
        "classification": classify_pcpi(score),
        "positive_participation": round(positive_participation, 3),
        "collapse_penalty": round(collapse_penalty, 3),
    }

if __name__ == "__main__":
    example = PCPIFeatures(
        final_judgment_retention=1.0,
        reasoning_scaffolding=1.0,
        alternatives_tradeoffs=0.8,
        user_context_integration=0.7,
        verification_path=0.9,
        skill_transfer=0.8,
        appropriate_automation=0.9,
        over_decision=0.0,
        substitute_tone=0.0,
        premature_closure=0.1,
        hidden_black_box=0.0,
        dependency_reinforcement=0.0,
        normative_pressure=0.0,
    )
    print(score_pcpi(example))
