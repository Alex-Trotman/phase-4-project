#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Import your models
from models import User, Category, Habit, HabitLog, HabitData

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class UserResource(Resource):
    def get(self):
        users = User.query.all()
        
        return users, 200

api.add_resource(UserResource, "/users")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
