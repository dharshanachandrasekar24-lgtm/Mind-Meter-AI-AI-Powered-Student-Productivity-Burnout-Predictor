from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
from models import db, StudyRecord

tracker_bp = Blueprint('tracker', __name__)

@tracker_bp.route('/', methods=['GET', 'POST'])
@login_required
def index():
    if request.method == 'POST':
        date = request.form.get('date')
        study_hours = float(request.form.get('study_hours', 0.0))
        subjects = request.form.get('subjects', '')
        sleep_duration = float(request.form.get('sleep_duration', 7.0))
        break_frequency = int(request.form.get('break_frequency', 2))
        screen_time = float(request.form.get('screen_time', 6.0))
        assignments_pending = int(request.form.get('assignments_pending', 0))
        tasks_completed = int(request.form.get('tasks_completed', 0))
        productivity_level = int(request.form.get('productivity_level', 7))
        stress_level = int(request.form.get('stress_level', 5))
        notes = request.form.get('notes', '')

        record = StudyRecord(
            user_id=current_user.id,
            date=date,
            study_hours=study_hours,
            subjects=subjects,
            sleep_duration=sleep_duration,
            break_frequency=break_frequency,
            screen_time=screen_time,
            assignments_pending=assignments_pending,
            tasks_completed=tasks_completed,
            productivity_level=productivity_level,
            stress_level=stress_level,
            notes=notes
        )
        db.session.add(record)
        db.session.commit()
        flash('Daily study record logged successfully', 'success')
        return redirect(url_for('tracker.index'))

    records = current_user.study_records.order_by(StudyRecord.date.desc()).all()
    return render_template('tracker.html', records=records)

@tracker_bp.route('/delete/<int:record_id>', methods=['POST'])
@login_required
def delete(record_id):
    rec = StudyRecord.query.filter_by(id=record_id, user_id=current_user.id).first_or_404()
    db.session.delete(rec)
    db.session.commit()
    flash('Record deleted', 'info')
    return redirect(url_for('tracker.index'))
