from backend.src.models.user_model import User
from backend.database import db
from sqlalchemy import select, or_




        
def add_user(user:User):
    existing = db.session.query(User).filter_by(user_id=user.user_id).first()
    if existing:
        raise ValueError("User already exists")
    db.session.add(user)
    db.session.commit()
    db.session.refresh(user)
    return user

def user_exists(user_id: str, email: str) -> bool:
    try:
        statement = select(User).where(or_(User.user_id == user_id, User.email == email))
        user = db.session.execute(statement).first()
        if user:
            return True
        else:
            return False
    except:
        return True

def login_user(email_login: str, password_login: str) -> User:
    user_login = db.session.query(User).filter(User.email == email_login, User.password == password_login).first()
    if user_login:
         return user_login
    else:
         raise ValueError("The password or email is incorrect.")
        


def user_from_dict(user_dict: dict):
    return User.from_dict(user_dict)


def user_to_dict(user: User):
    return user.to_dict()