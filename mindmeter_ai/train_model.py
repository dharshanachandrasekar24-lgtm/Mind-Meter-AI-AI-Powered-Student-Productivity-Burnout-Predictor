"""
MindMeter AI - Machine Learning Model Training Pipeline
Uses Scikit-learn Random Forest Classifier to estimate academic burnout risk.
Generates synthetic validation logs calibrated against student fatigue literature.
"""
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

def generate_synthetic_student_data(n_samples=2500, random_state=42):
    np.random.seed(random_state)
    
    study_hours = np.random.uniform(1.0, 12.0, n_samples)
    sleep_duration = np.random.normal(6.8, 1.4, n_samples).clip(3.5, 10.5)
    pending_assignments = np.random.poisson(3.5, n_samples).clip(0, 10)
    break_frequency = np.random.poisson(2.5, n_samples).clip(0, 8)
    screen_time = np.random.uniform(4.0, 14.0, n_samples)
    productivity_level = np.random.randint(1, 11, n_samples)
    stress_level = np.random.randint(1, 11, n_samples)

    scores = []
    labels = []

    for i in range(n_samples):
        sleep_pen = max(0, (7.5 - sleep_duration[i]) * 15) if sleep_duration[i] < 7.5 else 0
        stress_pen = stress_level[i] * 4.5
        workload_pen = pending_assignments[i] * 6.0
        break_pen = max(0, (study_hours[i] / 2.0 - break_frequency[i]) * 8)
        screen_pen = max(0, (screen_time[i] - 8.0) * 5)
        
        raw_score = 10 + sleep_pen + stress_pen + workload_pen + break_pen + screen_pen - (productivity_level[i] * 2)
        score = int(np.clip(raw_score, 0, 100))
        scores.append(score)

        if score >= 70:
            labels.append(2) # High Risk
        elif score >= 40:
            labels.append(1) # Moderate Risk
        else:
            labels.append(0) # Low Risk

    df = pd.DataFrame({
        'study_hours': study_hours,
        'sleep_duration': sleep_duration,
        'pending_assignments': pending_assignments,
        'break_frequency': break_frequency,
        'screen_time': screen_time,
        'productivity_level': productivity_level,
        'stress_level': stress_level,
        'risk_score': scores,
        'burnout_category': labels
    })
    return df

def train_and_save_model():
    print("[*] Synthesizing 2,500 student semester logs for ML validation...")
    df = generate_synthetic_student_data()
    
    features = ['study_hours', 'sleep_duration', 'pending_assignments', 
                'break_frequency', 'screen_time', 'productivity_level', 'stress_level']
    X = df[features]
    y = df['burnout_category']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    print("[*] Training Scikit-learn Random Forest Classifier (120 Estimators, max_depth=8)...")
    clf = RandomForestClassifier(n_estimators=120, max_depth=8, random_state=42, class_weight='balanced')
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"[+] Model Validation Accuracy: {acc * 100:.2f}%")
    print(classification_report(y_test, y_pred, target_names=['Low Risk', 'Moderate Risk', 'High Risk']))

    os.makedirs(os.path.join(os.path.dirname(__file__), 'ml_model'), exist_ok=True)
    target_path = os.path.join(os.path.dirname(__file__), 'ml_model', 'burnout_model.pkl')
    joblib.dump(clf, target_path)
    print(f"[✓] Model successfully serialized to {target_path}")

if __name__ == '__main__':
    train_and_save_model()
