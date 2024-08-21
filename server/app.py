#!/usr/bin/env python3

# Standard library imports
from datetime import datetime

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Import your models
from models import User, Category, Habit, HabitLog, HabitData

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
            else:
                return {'message': '401: Not Authorized'}, 401
        else:
            return {'message': '401: Not Authorized'}, 401

@app.route('/clear_session')
def clear_session():
    session.clear()
    return {'message': 'Session cleared'}, 200

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()
        password = request.get_json()['password']
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {'error': 'Invalid username or password'}, 401
    
class SignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        if User.query.filter_by(username=username).first():
            return {'error': 'Username already exists'}, 400
        new_user = User(username=username)
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    
class Logout(Resource):
    def delete(self): 
        session.clear()
        return {'message': '204: No Content'}, 204
    
class CategoryResource(Resource):
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        categories = Category.query.filter_by(user_id=user_id).all()
        return [category.to_dict() for category in categories], 200

    def post(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        data = request.get_json()
        new_category = Category(name=data['name'], user_id=user_id)
        db.session.add(new_category)
        db.session.commit()
        return new_category.to_dict(), 201

    def put(self, category_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        data = request.get_json()
        category = Category.query.filter_by(id=category_id, user_id=user_id).first()
        if not category:
            return {'message': '404: Not Found'}, 404
        category.name = data['name']
        db.session.commit()
        return category.to_dict(), 200

    def delete(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        data = request.get_json()
        category_id = data.get('id')
        category = Category.query.filter_by(id=category_id, user_id=user_id).first()
        if not category:
            return {'message': '404: Not Found'}, 404
        db.session.delete(category)
        db.session.commit()
        return {'message': '204: No Content'}, 204

class HabitResource(Resource):
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        habits = Habit.query.filter_by(user_id=user_id).all()
        return [habit.to_dict() for habit in habits], 200
    
    def post(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        data = request.get_json()
        category_id = data.get('category_id')
        if not category_id:
            return {'message': '400: category_id is required'}, 400
        new_habit = Habit(
            name=data['name'],
            metric_type=data['type'],
            user_id=user_id,
            category_id=category_id
        )
        db.session.add(new_habit)
        db.session.commit()
        return new_habit.to_dict(), 201
    
    def put(self, habit_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        data = request.get_json()
        habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first()
        if not habit:
            return {'message': '404: Not Found'}, 404
        habit.name = data['name']
        habit.metric_type = data['type']
        habit.category_id = data.get('category_id', habit.category_id)
        db.session.commit()
        return habit.to_dict(), 200

    def delete(self, habit_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first()
        if not habit:
            return {'message': '404: Not Found'}, 404
        db.session.delete(habit)
        db.session.commit()
        return {'message': '204: No Content'}, 204

class HabitLogResource(Resource):
    def get(self, habit_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first()
        if not habit:
            return {'message': '404: Not Found'}, 404
        logs = HabitLog.query.filter_by(habit_id=habit_id).all()
        return [log.to_dict() for log in logs], 200
    
    def post(self, habit_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first()
        if not habit:
            return {'message': '404: Not Found'}, 404
        data = request.get_json()
        try:
            log_date = datetime.strptime(data['log_date'], '%Y-%m-%d')
        except ValueError:
            return {'message': 'Invalid date format, expected YYYY-MM-DD'}, 400
        
        new_log = HabitLog(
            habit_id=habit_id,
            log_date=log_date,
            status=data.get('status'),
            note=data.get('note')
        )
        db.session.add(new_log)
        db.session.commit()
        return new_log.to_dict(), 201

    def put(self, log_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        log = HabitLog.query.join(Habit).filter(Habit.user_id == user_id, HabitLog.id == log_id).first()
        if not log:
            return {'message': '404: Not Found'}, 404
        data = request.get_json()
        try:
            log_date = datetime.strptime(data['log_date'], '%Y-%m-%d')
        except ValueError:
            return {'message': 'Invalid date format, expected YYYY-MM-DD'}, 400
        
        log.log_date = log_date
        log.status = data.get('status')
        log.note = data.get('note')
        db.session.commit()
        return log.to_dict(), 200

    def delete(self, log_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        log = HabitLog.query.join(Habit).filter(Habit.user_id == user_id, HabitLog.id == log_id).first()
        if not log:
            return {'message': '404: Not Found'}, 404
        db.session.delete(log)
        db.session.commit()
        return {'message': '204: No Content'}, 204

class HabitDataResource(Resource):
    def get(self, habit_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401

        habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first()
        if not habit:
            return {'message': '404: Not Found'}, 404

        habit_data_with_logs = db.session.query(HabitData, HabitLog).join(HabitLog, HabitData.log_id == HabitLog.id).filter(HabitData.habit_id == habit_id).all()
        result = [
            {
                'id': data.id,
                'log_id': data.log_id,
                'habit_id': data.habit_id,
                'metric_value': data.metric_value,
                'metric_text': data.metric_text,
                'log_date': log.log_date.isoformat() if log.log_date else None
            }
            for data, log in habit_data_with_logs
        ]

        return result, 200

    def post(self, habit_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first()
        if not habit:
            return {'message': '404: Not Found'}, 404
        data = request.get_json()

        try:
            log_date = datetime.strptime(data['log_date'], '%Y-%m-%d')
        except ValueError:
            return {'message': 'Invalid date format, expected YYYY-MM-DD'}, 400

        new_log = HabitLog(
            habit_id=habit_id,
            log_date=log_date,
            status=None,  # Since it's a metric log, status can be None
            note=data.get('note')
        )
        db.session.add(new_log)
        db.session.commit()

        new_data = HabitData(
            log_id=new_log.id,
            habit_id=habit_id,
            metric_value=data.get('metric_value'),
            metric_text=data.get('metric_text')
        )
        db.session.add(new_data)
        db.session.commit()
    
        response_data = new_data.to_dict()
        response_data['log_date'] = new_log.log_date.isoformat()
        return response_data, 201


    def put(self, data_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        data = HabitData.query.join(Habit).filter(Habit.user_id == user_id, HabitData.id == data_id).first()
        if not data:
            return {'message': '404: Not Found'}, 404
        data_request = request.get_json()

        data.metric_value = data_request.get('metric_value', data.metric_value)
        data.metric_text = data_request.get('metric_text', data.metric_text)
        db.session.commit()
        return data.to_dict(), 200

    def delete(self, data_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        data = HabitData.query.join(Habit).filter(Habit.user_id == user_id, HabitData.id == data_id).first()
        if not data:
            return {'message': '404: Not Found'}, 404
        db.session.delete(data)
        db.session.commit()
        return {'message': '204: No Content'}, 204

class AveragePerDaily(Resource):
    def get(self):
        # Assuming you pass the user_id as a query parameter in the request
        user_id = session.get('user_id')
        
        # Get all habits associated with the user
        habits = Habit.query.filter_by(user_id=user_id).all()

        # Get all habit logs associated with those habits
        habit_ids = [habit.id for habit in habits]
        habit_logs = HabitLog.query.filter(HabitLog.habit_id.in_(habit_ids)).all()
        
        # Calculate total completions and unique days
        total_completions = len(habit_logs)
        unique_days = db.session.query(db.func.date(HabitLog.log_date)).filter(HabitLog.habit_id.in_(habit_ids)).distinct().count()
        
        # Calculate the average habits completed per day
        if unique_days > 0:
            average_per_daily = total_completions / unique_days
        else:
            average_per_daily = 0

        return {'average_per_daily': round(average_per_daily, 2)}

# Add the resource to the API
api.add_resource(AveragePerDaily, '/api/habits/average-per-daily')
    
# class HabitLogsForDayResource(Resource):
#     def get(self, log_date):
#         user_id = session.get('user_id')
#         if not user_id:
#             return {'message': '401: Not Authorized'}, 401

#         logs = HabitLog.query.join(Habit).filter(Habit.user_id == user_id, HabitLog.log_date == log_date).all()
#         return [log.to_dict() for log in logs], 200

# class HabitDataForDayResource(Resource):
#     def get(self, log_date):
#         user_id = session.get('user_id')
#         if not user_id:
#             return {'message': '401: Not Authorized'}, 401

#         habit_data_with_logs = db.session.query(HabitData, HabitLog).join(HabitLog, HabitData.log_id == HabitLog.id).join(Habit).filter(Habit.user_id == user_id, HabitLog.log_date == log_date).all()
#         result = [
#             {
#                 'id': data.id,
#                 'log_id': data.log_id,
#                 'habit_id': data.habit_id,
#                 'metric_value': data.metric_value,
#                 'metric_text': data.metric_text,
#                 'log_date': log.log_date.isoformat() if log.log_date else None
#             }
#             for data, log in habit_data_with_logs
#         ]

#         return result, 200

api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, "/logout")
api.add_resource(Login, "/login")
api.add_resource(SignUp, "/signup")
api.add_resource(CategoryResource, '/categories', '/categories/<int:category_id>')
api.add_resource(HabitResource, '/habits', '/habits/<int:habit_id>')
api.add_resource(HabitLogResource, '/habits/<int:habit_id>/logs', '/logs/<int:log_id>')
api.add_resource(HabitDataResource, '/habits/<int:habit_id>/data', '/data/<int:data_id>')
# api.add_resource(HabitLogsForDayResource, '/logs/<string:log_date>')
# api.add_resource(HabitDataForDayResource, '/data/<string:log_date>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
