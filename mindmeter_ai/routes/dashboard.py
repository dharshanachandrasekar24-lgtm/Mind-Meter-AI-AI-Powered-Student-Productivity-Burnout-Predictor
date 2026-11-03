from flask import Blueprint, render_template
from flask_login import login_required, current_user
from models import StudyRecord, Assignment, StudySchedule, Habit

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/')
@login_required
def view():
    records = current_user.study_records.order_by(StudyRecord.date.asc()).all()
    assignments = current_user.assignments.all()
    schedule = current_user.schedules.all()
    habits = current_user.habits.all()
    
    today_record = records[-1] if records else None
    today_hours = today_record.study_hours if today_record else 0.0
    pending_count = sum(1 for a in assignments if a.status != 'Completed')

    return render_template(
        'dashboard.html',
        user=current_user,
        records=records,
        today_hours=today_hours,
        pending_count=pending_count,
        assignments=assignments,
        schedule=schedule,
        habits=habits
    )
