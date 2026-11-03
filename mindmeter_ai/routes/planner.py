from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user
from models import db, StudySchedule, Assignment

planner_bp = Blueprint('planner', __name__)

@planner_bp.route('/')
@login_required
def view():
    schedule = current_user.schedules.all()
    assignments = current_user.assignments.all()
    return render_template('planner.html', schedule=schedule, assignments=assignments)

@planner_bp.route('/toggle/<int:block_id>', methods=['POST'])
@login_required
def toggle(block_id):
    block = StudySchedule.query.filter_by(id=block_id, user_id=current_user.id).first_or_404()
    block.completed = not block.completed
    db.session.commit()
    return redirect(url_for('planner.view'))
