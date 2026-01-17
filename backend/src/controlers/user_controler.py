from backend.src.models.user_model import User
from backend.database import db
from backend.src.middleware.password_helper import hash_password, verify_password
from werkzeug.security import check_password_hash


# ----------------------------------------------------
# יצירת משתמש חדש
# ----------------------------------------------------
def add_user(user: User):
    # בדיקה אם המשתמש כבר קיים לפי אימייל
    existing = db.session.query(User).filter_by(email=user.email).first()
    if existing:
        raise ValueError("User already exists")

    # הצפנת סיסמה לפני שמירה
    user.password = hash_password(user.password)

    db.session.add(user)
    db.session.commit()
    db.session.refresh(user)
    return user


# ----------------------------------------------------
# התחברות משתמש
# ----------------------------------------------------
def login_user(email, password):
    user = User.query.filter_by(email=email).first()

    if not user:
        print("❌ No user found with that email")
        return None

    # בדיקת סיסמה מוצפנת
    if not check_password_hash(user.password, password):
        print("❌ Password does not match")
        return None

    print("✅ User authenticated successfully")
    return user




# ----------------------------------------------------
# המרת dict → User
# ----------------------------------------------------
def user_from_dict(user_dict: dict):
    return User.from_dict(user_dict)


# ----------------------------------------------------
# המרת User → dict
# ----------------------------------------------------
def user_to_dict(user: User):
    return user.to_dict()