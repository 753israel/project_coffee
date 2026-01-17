from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

# חיבור לדטהבייס
def init_database(app: Flask):
    db.init_app(app)


def create_tables():
    from backend.src.models.user_model import User
    from backend.src.models.order_model import Order
    from backend.src.models.coffee_model import Coffee 
    db.create_all()
    


def drop_tables():
    db.drop_all()



