#!/usr/bin/env python3

# Standard library imports

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

api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, "/logout")
api.add_resource(Login, "/login")
api.add_resource(SignUp, "/signup")
api.add_resource(CategoryResource, '/categories', '/categories/<int:category_id>')
api.add_resource(HabitResource, '/habits', '/habits/<int:habit_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
