from flask import Blueprint, render_template, Response
from flask_login import login_required, current_user
from models import StudyRecord
import csv
import io

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/')
@login_required
def view():
    records = current_user.study_records.order_by(StudyRecord.date.asc()).all()
    return render_template('analytics.html', records=records)

@analytics_bp.route('/export-csv')
@login_required
def export_csv():
    records = current_user.study_records.order_by(StudyRecord.date.asc()).all()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['Date', 'Study Hours', 'Sleep Duration', 'Breaks', 'Screen Time', 'Pending Assignments', 'Tasks Completed', 'Productivity', 'Stress', 'Subjects'])

    for r in records:
        writer.writerow([r.date, r.study_hours, r.sleep_duration, r.break_frequency, r.screen_time, r.assignments_pending, r.tasks_completed, r.productivity_level, r.stress_level, r.subjects])

    output.seek(0)
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment;filename=mindmeter_report.csv"}
    )
