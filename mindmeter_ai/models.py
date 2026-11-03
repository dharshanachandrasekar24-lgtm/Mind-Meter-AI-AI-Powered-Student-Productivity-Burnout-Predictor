from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    college_name = db.Column(db.String(150), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    year_of_study = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    study_records = db.relationship('StudyRecord', backref='student', lazy='dynamic', cascade='all, delete-orphan')
    predictions = db.relationship('BurnoutPrediction', backref='student', lazy='dynamic', cascade='all, delete-orphan')
    assignments = db.relationship('Assignment', backref='student', lazy='dynamic', cascade='all, delete-orphan')
    schedules = db.relationship('StudySchedule', backref='student', lazy='dynamic', cascade='all, delete-orphan')
    habits = db.relationship('Habit', backref='student', lazy='dynamic', cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class StudyRecord(db.Model):
    __tablename__ = 'study_records'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.String(10), nullable=False) # YYYY-MM-DD
    study_hours = db.Column(db.Float, nullable=False, default=0.0)
    subjects = db.Column(db.String(250), nullable=False)
    sleep_duration = db.Column(db.Float, nullable=False, default=7.0)
    break_frequency = db.Column(db.Integer, nullable=False, default=2)
    screen_time = db.Column(db.Float, nullable=False, default=6.0)
    assignments_pending = db.Column(db.Integer, nullable=False, default=0)
    tasks_completed = db.Column(db.Integer, nullable=False, default=0)
    productivity_level = db.Column(db.Integer, nullable=False, default=7)
    stress_level = db.Column(db.Integer, nullable=False, default=5)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Subject(db.Model):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(20), nullable=False)
    credits = db.Column(db.Integer, default=3)
    difficulty = db.Column(db.String(20), default='Medium')

class Assignment(db.Model):
    __tablename__ = 'assignments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    due_date = db.Column(db.String(10), nullable=False)
    estimated_hours = db.Column(db.Float, default=3.0)
    status = db.Column(db.String(50), default='Pending')
    priority = db.Column(db.String(20), default='Medium')

class StudySchedule(db.Model):
    __tablename__ = 'study_schedules'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    day = db.Column(db.String(50), nullable=False)
    start_time = db.Column(db.String(20), nullable=False)
    end_time = db.Column(db.String(20), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    task_title = db.Column(db.String(200), nullable=False)
    block_type = db.Column(db.String(50), default='Study')
    priority = db.Column(db.String(20), default='Medium')
    completed = db.Column(db.Boolean, default=False)

class Habit(db.Model):
    __tablename__ = 'habits'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    current_streak = db.Column(db.Integer, default=0)
    best_streak = db.Column(db.Integer, default=0)
    completed_today = db.Column(db.Boolean, default=False)

class BurnoutPrediction(db.Model):
    __tablename__ = 'burnout_predictions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    risk_score = db.Column(db.Integer, nullable=False)
    risk_category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ChatHistory(db.Model):
    __tablename__ = 'chat_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sender = db.Column(db.String(20), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
