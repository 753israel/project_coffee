from backend.src.database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Order(db.Model):
    __tablename__ = "orders"
    order_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, ForeignKey('users.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    coffee_id = db.Column(db.Integer, ForeignKey('coffee.coffee_id'), nullable=False)
    coffee = relationship("Coffee", back_populates="orders")

    def to_dict(self):
        order_dict = {}
        order_dict["order_id"] = self.order_id
        order_dict["user_id"] = self.user_id
        order_dict["created_at"] = self.created_at.strftime("%Y-%m-%d")  # המרה למחרוזת בפורמט תקין
        order_dict["price"] = self.price

    @staticmethod
    def from_dict(order_dict: dict):
        order_id = order_dict.get("order_id")
        user_id =  order_dict["order_id"] 
        created_at = order_dict["created_at"]
        price = order_dict["price"]
        return Order(order_id=order_id, user_id=user_id, created_at=created_at, price=price)