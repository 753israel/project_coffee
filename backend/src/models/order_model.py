from backend.database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from backend.src.models.user_model import User
from backend.src.models.coffee_model import Coffee



class Order(db.Model):
    __tablename__ = "orders"
    order_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, ForeignKey('users.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    price = db.Column(db.Numeric(10,2), nullable=False)
    coffee_id = db.Column(db.Integer, ForeignKey('coffee.coffee_id'), nullable=False)
    coffee = relationship("Coffee", back_populates="orders")
    user = relationship("User", back_populates="orders")


    def to_dict(self):
        order_dict = {}
        order_dict["order_id"] = self.order_id
        order_dict["user_id"] = self.user_id
        order_dict["created_at"] = self.created_at.strftime("%Y-%m-%d")  # המרה למחרוזת בפורמט תקין
        order_dict["price"] = float(self.price)
        order_dict["coffee_id"] =  self.coffee_id
        return order_dict


    @staticmethod
    def from_dict(order_dict: dict):
        order_id = order_dict.get("order_id")
        user_id =  order_dict["user_id"] 
        created_at = order_dict.get("created_at", datetime.now(timezone.utc))
        price = order_dict["price"]
        coffee_id = order_dict["coffee_id"]
        return Order(order_id=order_id, user_id=user_id, created_at=created_at, price=price,coffee_id=coffee_id)