# PCPI Formula

```text
PCPI = clamp((PositiveParticipation * 100) - (CollapsePenalty * 60), 0, 100)
```

PositiveParticipation is the mean of:

- final_judgment_retention
- reasoning_scaffolding
- alternatives_tradeoffs
- user_context_integration
- verification_path
- skill_transfer
- appropriate_automation

CollapsePenalty is the mean of:

- over_decision
- substitute_tone
- premature_closure
- hidden_black_box
- dependency_reinforcement
- normative_pressure

Classification bands:

- 80-100: capacity_building
- 60-79: capacity_preserving
- 40-59: mixed_at_risk
- 20-39: capacity_eroding
- 0-19: participation_collapse
