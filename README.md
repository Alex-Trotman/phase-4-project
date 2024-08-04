# Habit Tracker

## Overview

Habit Tracker is a comprehensive web application designed to help users manage and track their daily habits. With features such as habit creation, daily logging, and data visualization, it aims to provide users with insights into their behavior and encourage positive habit formation.

## Features

- **User Authentication**: Secure registration, login, and logout functionality.
- **Habit Management**: Create, update, and delete habit categories and individual habits.
- **Daily Logging**: Log habits daily and track specific metrics like calories burned or hours slept.
- **Data Visualization**: View habit data in daily, weekly, and monthly formats, with line and pie charts for insights.
- **Reporting**: Generate detailed reports to analyze habit trends and performance over time.

## Project Structure

### Server
- **`config.py`**: Configuration file for setting up the Flask app, database URI, and other settings.
  - **Functions**:
    - `Config`: Contains configuration settings like `SQLALCHEMY_DATABASE_URI` and `app.secret_key`.
- **`models.py`**: Contains SQLAlchemy models for the application.
  - **Models**:
    - `User`: Represents users with attributes like `id`, `username`, `password_hash`, and method `authenticate`.
    - `Category`: Represents habit categories with attributes `id`, `name`, and `user_id`.
    - `Habit`: Represents individual habits with attributes `id`, `name`, `user_id`, `category_id`, and `metric_type`.
    - `HabitLog`: Represents logs for habits with attributes `id`, `habit_id`, `log_date`, `status`, and `note`.
    - `HabitData`: Represents logs for habits with attributes `id`, `log_id`, `habit_id`, and `metric_value`.
- **`seed.py`**: Script to seed the database with initial data.
### Client

- **`client/`**: Directory containing the React frontend application.

  - **Files**:
    - `package.json`, `package-lock.json`: Configuration files for managing dependencies.

  - **`src/`**: Source code for the React application.

    - **Files**:

      - `App.js`: Main component of the React application.
      - `MyContext.jsx`: Context provider for managing global state.
      - `index.js`: Entry point of the React application.

    - **Directories**:
      - `components/`: Contains reusable React components.
      - `pages/`: Contains page-level React components.
      - `styles/`: Contains CSS files for styling the application.

  - **`public/`**: Public assets for the React application.
    - **Files**:
      - `index.html`: Main HTML file for the React application.

### Configuration Files

- **`Pipfile`**: Specifies Python packages and dependencies for the server.
- **`Pipfile.lock`**: Lock file for the specified Python packages.

## Getting Started

To get started with the Habit Tracker project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker
   ```

2. **Set up a virtual environment:**

   ```bash
   cd server
   pipenv install
   pipenv shell
   ```
   
4. **Set up the database:**

   ```bash
   cd server
   flask db init
   flask db migrate -m "Initial migration."
   flask db upgrade
   python seed.py
   ```

5. **Install dependencies:**
   In a different terminal, run:
   ```bash
   cd client
   npm install
   npm start
   ```

6. **Run the application:**

   ```bash
   export FLASK_RUN_PORT=5555
   flask run
   ```
   or run
   
   ```bash
   python app.py
   ```

8. **Access the application:**
   Open your web browser and go to `http://localhost:3000/`.

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [React Documentation](https://reactjs.org/)
