#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Import your models
from models import User, Category, Habit, HabitLog, HabitData

# app.config['SECRET_KEY'] = 'your_secret_key_here'
# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        print("RIGHT HERE", user_id)
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                print(user)
                return user.to_dict(), 200
            else:
                return {'message': '401: Not Authorized'}, 401
        else:
            return {'message': '401: Not Authorized'}, 401

    # def get(self):
    #     test = session.get('user_id')
    #     print("RIGHT HERE", test)
    #     user = User.query.filter(User.id == session.get('user_id')).first()
    #     if user:
    #         print(user)
    #         return user.to_dict()
    #     else:
    #         return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

# @app.route('/session')
# def check_session():
#     user_id = session.get('user_id')
#     print("Checking session: user_id =", user_id)  # Debug print
#     if user_id:
#         user = User.query.get(user_id)
#         return user.to_dict(), 200
#     return {'error': 'Not logged in'}, 401

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
            print("Login successful: user_id set to", user.id)  # Debug print
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
        print("Signup successful: user_id set to", new_user.id)  # Debug print
        return new_user.to_dict(), 201
    
class Logout(Resource):
    def delete(self): 
        session.clear()
        return {'message': '204: No Content'}, 204

api.add_resource(Logout, "/logout")
api.add_resource(Login, "/login")
api.add_resource(SignUp, "/signup")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
