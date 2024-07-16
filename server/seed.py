#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Category, Habit, HabitLog, HabitData

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Drop and recreate the tables
        db.drop_all()
        db.create_all()

        # Create users
        users = []
        for _ in range(1):
            username = fake.user_name()
            password = fake.password()
            user = User(
                username=username,
                password_hash=password  # This will trigger the setter to hash the password
            )
            db.session.add(user)
            users.append(user)
            print(f"Created user: {username} with password: {password}")  # Log the username and password

        db.session.commit()

        # Create categories for each user
        categories = []
        for user in users:
            for _ in range(3):
                category = Category(
                    name=fake.word(),
                    user_id=user.id
                )
                db.session.add(category)
                categories.append(category)

        db.session.commit()  # Commit categories to the database

        # Create habits for each category
        # habits = []
        # for category in categories:
        #     for _ in range(2):
        #         habit = Habit(
        #             name=fake.word(),
        #             user_id=category.user_id,
        #             category_id=category.id,
        #             metric_type=rc(['boolean', 'numeric']) # , 'text'
        #         )
        #         db.session.add(habit)
        #         habits.append(habit)

        # db.session.commit()

        # # Create habit logs for each habit
        # habit_logs = []
        # for habit in habits:
        #     for _ in range(10):
        #         log_date = datetime.now() - timedelta(days=randint(0, 30))
        #         habit_log = HabitLog(
        #             habit_id=habit.id,
        #             log_date=log_date,
        #             status=rc([True, False]) if habit.metric_type == 'boolean' else None,
        #             note=fake.sentence() if rc([True, False]) else None
        #         )
        #         db.session.add(habit_log)
        #         habit_logs.append(habit_log)

        # db.session.commit()

        # # Create habit data for each habit log
        # for habit_log in habit_logs:
        #     if habit_log.habit.metric_type == 'numeric':
        #         habit_data = HabitData(
        #             log_id=habit_log.id,
        #             habit_id=habit_log.habit_id,
        #             metric_value=randint(1, 100)
        #         )
        #         db.session.add(habit_data)
        #     elif habit_log.habit.metric_type == 'text':
        #         habit_data = HabitData(
        #             log_id=habit_log.id,
        #             habit_id=habit_log.habit_id,
        #             metric_text=fake.sentence()
        #         )
        #         db.session.add(habit_data)

        db.session.commit()

        print("Seed complete!")
