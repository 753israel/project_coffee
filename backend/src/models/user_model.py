from src.database import db
from sqlalchemy.orm import relationship

class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)    
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    orders = relationship("Order", back_populates="user") # קישור לטבלת Order


def to_dict(self):
    user_dict = {}
    user_dict["user_id"] = self.user_id
    user_dict["name"] = self.name
    user_dict["role"] = self.role
    user_dict["phone"] = self.phone
    user_dict["email"] = self.email
    return user_dict

@staticmethod
def from_dict(user_dict: dict):
    user_id = user_dict.get("user_id",None)
    name = user_dict["name"]
    role = user_dict["role"]
    phone = user_dict["phone"]
    email = user_dict["email"]
    password = user_dict["password"]
    return User(user_id = user_id , name = name ,role = role , phone = phone ,email = email , password = password)




