from flask_cors import CORS
from flask import Flask
from backend.src.routes.user_route import users_bp
from backend.src.database import init_database, create_tables, drop_tables

# flask - http פריימוורק שנותן שרת 
# routes כולל תמיכה ב 

# 1) create flask
app = Flask(__name__)

# postgresql מוסיפים לפלאסק את נתיב החיבור ל
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://coffee_db:12345@10.0.0.10:5432/coffee_user"

# כאשר דפדפן שמחובר לשרת אחר שולח בקשה לשרת הזה
# headers מורה לפלאסק לשלוח כתשובה 
# חזרה לדפדפן ששלח את הבקשה
# אחרת הדפדפן חוסם את התשובה
CORS(app)

# כדי להורות לפלאסק להעביר בקשות לראוט
app.register_blueprint(users_bp)

# database  חיבור ל
init_database(app)

# יצירת טבלאות אם אינן קיימות
with app.app_context():
    # drop_tables()
    create_tables()

# run flask
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)  #https מריץ את פלאסק