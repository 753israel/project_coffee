from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

# חיבור לדטהבייס
def init_database(app: Flask):
    db.init_app(app)

def create_tables():
    db.create_all()

def drop_tables():
    db.drop_all()
