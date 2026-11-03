import os
import joblib
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'burnout_model.pkl')

def get_burnout_prediction(study_hours, sleep_duration, pending_assignments, break_frequency, screen_time, productivity_level, stress_level):
    features = np.array([[
        float(study_hours),
        float(sleep_duration),
        int(pending_assignments),
        int(break_frequency),
        float(screen_time),
        int(productivity_level),
        int(stress_level)
    ]])

    category = 'Prototype Estimate'
    if os.path.exists(MODEL_PATH):
        try:
            model = joblib.load(MODEL_PATH)
            pred_class = model.predict(features)[0]
            cat_map = {0: 'Low Risk', 1: 'Moderate Risk', 2: 'High Risk'}
            category = cat_map.get(pred_class, 'Low Risk')
        except Exception:
            category = 'Moderate Risk'

    # Mathematical sub-scores
    sleep_score = max(0, (7.5 - sleep_duration) * 15) if sleep_duration < 7.5 else 5
    stress_score = stress_level * 10
    workload_score = pending_assignments * 15
    break_score = max(0, (study_hours / 1.75 - break_frequency) * 20)
    screen_score = max(0, (screen_time - 8.0) * 15)

    weighted = (sleep_score * 0.28) + (stress_score * 0.24) + (workload_score * 0.16) + (break_score * 0.14) + (screen_score * 0.10)
    risk_score = int(np.clip(weighted, 4, 100))

    if category == 'Prototype Estimate':
        category = 'High Risk' if risk_score >= 70 else 'Moderate Risk' if risk_score >= 40 else 'Low Risk'

    return {
        'risk_score': risk_score,
        'risk_category': category,
        'contributing_factors': {
            'Sleep Deficit': int(sleep_score * 0.28),
            'Subjective Stress': int(stress_score * 0.24),
            'Assignment Backlog': int(workload_score * 0.16),
            'Break Deprivation': int(break_score * 0.14),
            'Screen Strain': int(screen_score * 0.10),
        }
    }
