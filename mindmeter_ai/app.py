"""
MindMeter AI - Academic Productivity & Burnout Predictor
Flask Application Factory & Route Registration
"""
import os
from flask import Flask, render_template, redirect, url_for
from flask_login import LoginManager
from config import Config
from models import db, User

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    os.makedirs(os.path.join(os.path.dirname(__file__), 'instance'), exist_ok=True)

    db.init_app(app)
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    from routes.auth import auth_bp
    from routes.dashboard import dashboard_bp
    from routes.tracker import tracker_bp
    from routes.prediction import prediction_bp
    from routes.planner import planner_bp
    from routes.analytics import analytics_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(dashboard_bp, url_prefix='/dashboard')
    app.register_blueprint(tracker_bp, url_prefix='/tracker')
    app.register_blueprint(prediction_bp, url_prefix='/prediction')
    app.register_blueprint(planner_bp, url_prefix='/planner')
    app.register_blueprint(analytics_bp, url_prefix='/analytics')

    @app.route('/')
    def index():
        return render_template('index.html')

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
