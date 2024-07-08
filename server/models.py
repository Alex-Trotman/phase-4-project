from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

# class User(db.Model, SerializerMixin):
#     pass

# class Habit(db.Model, SerializerMixin):
#     pass

# class Category(db.Model, SerializerMixin):
#     pass


"""
# Models Requirements for Phase 4 Project: Full-Stack Application

## General Requirements:
- Use a Flask API backend with a React frontend.
- Have **at least** three models on the backend.

## Models and Relationships:
1. **Relationships:**
   - At least two one-to-many relationships.
   - At least one reciprocal many-to-many relationship.
   - The many-to-many association model/table must have a user-submittable attribute, i.e., an attribute aside from the foreign keys.
   
2. **CRUD Actions:**
   - Full CRUD actions for at least one resource.
   - Minimum of create and read actions for EACH resource.

3. **Attributes and Foreign Keys:**
   - Ensure each model includes necessary attributes and foreign keys to establish relationships.
   - Consider what other attributes might be needed to display data in the frontend or to fulfill other aspects of user stories.

4. **Example Entities:**
   - User
   - Dog House
   - Review

## Example Entity Relationship Diagram (ERD):
User -< Review >- DogHouse
DogHouse >- User

## Development Tips:
- Regularly run:
  - `flask db revision --autogenerate -m '<descriptive message>'`
  - `flask db upgrade head`
- Create an empty initial revision with: `flask db revision -m 'Create DB'`
"""
