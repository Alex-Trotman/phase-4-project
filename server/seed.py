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
            username = "demo"  # Set to a specific username
            password = "demo"  # Set to a specific password
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
            for _ in range(5):
                category = Category(
                    name=fake.word(),
                    user_id=user.id
                )
                db.session.add(category)
                categories.append(category)

        db.session.commit()  # Commit categories to the database

        # Create habits for each category
        habits = []
        for category in categories:
            for _ in range(5):
                habit = Habit(
                    name=fake.word(),
                    user_id=category.user_id,
                    category_id=category.id,
                    metric_type=rc(['boolean', 'numeric'])  # Randomly assign metric type
                )
                db.session.add(habit)
                habits.append(habit)

        db.session.commit()

        # Create habit logs for each habit, spanning the entire year
        habit_logs = []
        for habit in habits:
            start_date = datetime(datetime.now().year, 1, 1)
            end_date = datetime(datetime.now().year, 12, 31)
            days_between = (end_date - start_date).days

            # Create logs for approximately 80% of the days in the year
            for _ in range(int(days_between * 0.5)):
                random_day = start_date + timedelta(days=randint(0, days_between))
                habit_log = HabitLog(
                    habit_id=habit.id,
                    log_date=random_day,
                    status=rc([True, False]) if habit.metric_type == 'boolean' else None,
                    note=fake.sentence() if rc([True, False]) else None
                )
                db.session.add(habit_log)
                habit_logs.append(habit_log)

        db.session.commit()

        # Create habit data for each habit log
        for habit_log in habit_logs:
            if habit_log.habit.metric_type == 'numeric':
                habit_data = HabitData(
                    log_id=habit_log.id,
                    habit_id=habit_log.habit_id,
                    metric_value=randint(1, 100)
                )
                db.session.add(habit_data)
            elif habit_log.habit.metric_type == 'text':
                habit_data = HabitData(
                    log_id=habit_log.id,
                    habit_id=habit_log.habit_id,
                    metric_text=fake.sentence()
                )
                db.session.add(habit_data)

        db.session.commit()

        print("Seed complete!")
