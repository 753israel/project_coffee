from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

# חיבור לדטהבייס
def init_database(app: Flask):
    db.init_app(app)


def create_tables():
    # from backend.src.models.user_model import User
    # from backend.src.models.order_model import Order
    # from backend.src.models.coffee_model import Coffee 
    db.create_all()
    


def drop_tables():
    db.drop_all()















# ---------------------------------------------------------
# GRANT ALL ON SCHEMA public TO coffee_user;
# נותן למשתמש coffee_user את כל ההרשאות על הסכמה public.
# זה כולל יצירת טבלאות, שינוי טבלאות, מחיקה, והרשאות שימוש.
# בקיצור: coffee_user מקבל שליטה מלאה על כל מה שבתוך public.
# ---------------------------------------------------------

# ---------------------------------------------------------
# ALTER DATABASE coffee_db OWNER TO coffee_user;
# משנה את הבעלות על הדאטאבייס coffee_db.
# coffee_user הופך להיות הבעלים של כל הדאטאבייס.
# כבעלים הוא יכול לשנות הגדרות, ליצור schemas, לתת הרשאות וכו'.
# ---------------------------------------------------------

# ---------------------------------------------------------
# ALTER DEFAULT PRIVILEGES IN SCHEMA public
# GRANT ALL ON TABLES TO coffee_user;
# מגדיר הרשאות ברירת מחדל לטבלאות חדשות שיווצרו בעתיד.
# כל טבלה חדשה שתיווצר בתוך public תיתן אוטומטית הרשאות מלאות ל-coffee_user.
# זה חשוב כדי שלא תצטרך לתת הרשאות מחדש לכל טבלה חדשה.
# ---------------------------------------------------------