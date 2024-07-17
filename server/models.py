from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db
from sqlalchemy.ext.hybrid import hybrid_property
import bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash', '-categories', '-habits')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    categories = db.relationship('Category', backref='user', lazy=True)
    habits = db.relationship('Habit', backref='user', lazy=True)

    def __repr__(self):
        return f'User {self.username}, ID {self.id}'

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self._password_hash.encode('utf-8'))

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'categories': [category.to_dict_simple() for category in self.categories],
            'habits': [habit.to_dict_simple() for habit in self.habits]
        }


class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    serialize_rules = ('-habits', '-user')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    habits = db.relationship('Habit', backref='category', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'habits': [habit.to_dict_simple() for habit in self.habits]
        }

    def to_dict_simple(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Habit(db.Model, SerializerMixin):
    __tablename__ = 'habits'

    serialize_rules = ('-logs', '-data', '-category', '-user')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    metric_type = db.Column(db.String, nullable=False) # 'boolean', 'numeric', 'text'

    logs = db.relationship('HabitLog', backref='habit', lazy=True)
    data = db.relationship('HabitData', backref='habit', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'metric_type': self.metric_type,
            'logs': [log.to_dict_simple() for log in self.logs],
            'data': [data.to_dict_simple() for data in self.data]
        }

    def to_dict_simple(self):
        return {
            'id': self.id,
            'name': self.name,
            'metric_type': self.metric_type
        }


class HabitLog(db.Model, SerializerMixin):
    __tablename__ = 'habit_logs'

    serialize_rules = ('-habit', '-habit_data')

    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'), nullable=False)
    log_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Boolean, nullable=True) # for boolean habits
    note = db.Column(db.Text, nullable=True) # optional note for the log entry

    habit_data = db.relationship('HabitData', backref='habit_log', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'habit_id': self.habit_id,
            'log_date': self.log_date,
            'status': self.status,
            'note': self.note,
            'habit_data': [data.to_dict_simple() for data in self.habit_data]
        }

    def to_dict_simple(self):
        return {
            'id': self.id,
            'log_date': self.log_date,
            'status': self.status
        }


class HabitData(db.Model, SerializerMixin):
    __tablename__ = 'habit_data'

    serialize_rules = ('-habit', '-habit_log')

    id = db.Column(db.Integer, primary_key=True)
    log_id = db.Column(db.Integer, db.ForeignKey('habit_logs.id'), nullable=False)
    habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'), nullable=False)
    metric_value = db.Column(db.Float, nullable=True) # value for numeric habits
    metric_text = db.Column(db.Text, nullable=True) # value for text habits

    def to_dict(self):
        return {
            'id': self.id,
            'log_id': self.log_id,
            'habit_id': self.habit_id,
            'metric_value': self.metric_value,
            'metric_text': self.metric_text
        }

    def to_dict_simple(self):
        return {
            'id': self.id,
            'metric_value': self.metric_value,
            'metric_text': self.metric_text
        }
