from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db
from sqlalchemy.ext.hybrid import hybrid_property
import bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash',)

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


class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    habits = db.relationship('Habit', backref='category', lazy=True)


class Habit(db.Model, SerializerMixin):
    __tablename__ = 'habits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    metric_type = db.Column(db.String, nullable=False) # 'boolean', 'numeric', 'text'

    logs = db.relationship('HabitLog', backref='habit', lazy=True)
    data = db.relationship('HabitData', backref='habit', lazy=True)


class HabitLog(db.Model, SerializerMixin):
    __tablename__ = 'habit_logs'

    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'), nullable=False)
    log_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Boolean, nullable=True) # for boolean habits
    note = db.Column(db.Text, nullable=True) # optional note for the log entry

    habit_data = db.relationship('HabitData', backref='habit_log', lazy=True)


class HabitData(db.Model, SerializerMixin):
    __tablename__ = 'habit_data'

    id = db.Column(db.Integer, primary_key=True)
    log_id = db.Column(db.Integer, db.ForeignKey('habit_logs.id'), nullable=False)
    habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'), nullable=False)
    metric_value = db.Column(db.Float, nullable=True) # value for numeric habits
    metric_text = db.Column(db.Text, nullable=True) # value for text habits
