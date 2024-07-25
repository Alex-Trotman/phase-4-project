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

- **`app.py`**: The main entry point of the Flask application, initializing the app and defining route endpoints.
  - **Functions**:
    - `create_app()`: Initializes the Flask application.
    - `register_routes(app)`: Registers all routes for the application.
- **`config.py`**: Configuration file for setting up the Flask app, database URI, and other settings.
  - **Functions**:
    - `Config`: Contains configuration settings like `SQLALCHEMY_DATABASE_URI` and `SECRET_KEY`.
- **`models.py`**: Contains SQLAlchemy models for the application.
  - **Models**:
    - `User`: Represents users with attributes like `id`, `username`, `email`, `password_hash`, and methods `set_password` and `check_password`.
    - `Category`: Represents habit categories with attributes `id`, `name`, and `user_id`.
    - `Habit`: Represents individual habits with attributes `id`, `name`, `category_id`, and `user_id`.
    - `Log`: Represents daily logs for habits with attributes `id`, `habit_id`, `date`, `status`, and `metrics`.
- **`seed.py`**: Script to seed the database with initial data.

  - **Functions**:
    - `seed_data()`: Seeds the database with sample categories and habits.

- **`migrations/`**: Directory containing Alembic migration files for database schema changes.
  - **Files**:
    - `README`, `alembic.ini`, `env.py`, `script.py.mako`, `versions/`: Files and directories necessary for managing database migrations.
- **`instance/`**: Directory containing the SQLite database file `app.db`.

### Client

- **`client/`**: Directory containing the React frontend application.

  - **Files**:

    - `README.md`: Documentation specific to the client application.
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
      - `favicon.ico`, `logo192.png`, `logo512.png`, `manifest.json`, `robots.txt`: Static assets and configuration files.

### Configuration Files

- **`Pipfile`**: Specifies Python packages and dependencies for the server.
- **`Pipfile.lock`**: Lock file for the specified Python packages.
- **`CONTRIBUTING.md`**: Guidelines for contributing to the project.
- **`LICENSE.md`**: License information for the project.

## Getting Started

To get started with the Habit Tracker project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker
   ```

2. **Set up a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database:**

   ```bash
   flask db init
   flask db migrate -m "Initial migration."
   flask db upgrade
   ```

5. **Run the application:**

   ```bash
   flask run
   ```

6. **Access the application:**
   Open your web browser and go to `http://127.0.0.1:5000`.

## Contributing

If you wish to contribute to the Habit Tracker project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [React Documentation](https://reactjs.org/)

## Screenshots

![Home Page](client/public/screenshots/home_page.png)
![Habit List](client/public/screenshots/habit_list.png)
![Log Habits](client/public/screenshots/log_habits.png)
![Reports](client/public/screenshots/reports.png)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.

---

Feel free to customize and expand this README as needed to fit your specific project.
