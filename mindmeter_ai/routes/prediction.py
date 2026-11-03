from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required, current_user
from ml_model.prediction import get_burnout_prediction
from models import db, BurnoutPrediction, StudyRecord

prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/')
@login_required
def view():
    latest_record = current_user.study_records.order_by(StudyRecord.date.desc()).first()
    
    if latest_record:
        result = get_burnout_prediction(
            latest_record.study_hours,
            latest_record.sleep_duration,
            latest_record.assignments_pending,
            latest_record.break_frequency,
            latest_record.screen_time,
            latest_record.productivity_level,
            latest_record.stress_level
        )
    else:
        result = get_burnout_prediction(5.0, 7.0, 3, 2, 7.0, 7, 5)

    return render_template('burnout.html', prediction=result, record=latest_record)

@prediction_bp.route('/api/predict', methods=['POST'])
@login_required
def api_predict():
    data = request.get_json() or {}
    pred = get_burnout_prediction(
        data.get('study_hours', 5.0),
        data.get('sleep_duration', 7.0),
        data.get('pending_assignments', 3),
        data.get('break_frequency', 2),
        data.get('screen_time', 6.0),
        data.get('productivity_level', 7),
        data.get('stress_level', 5)
    )
    return jsonify(pred)
