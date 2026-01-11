from backend.src.models.order_model import Order
from backend.src.models.user_model import User
from backend.src.models.coffee_model import Coffee
from backend.database import db

def add_order(order: Order):

    user = db.session.query(User).filter_by(user_id=order.user_id).first()
    if not user:
        raise ValueError("User does not exist")

    coffee = db.session.query(Coffee).filter_by(coffee_id=order.coffee_id).first()
    if not coffee:
        raise ValueError("Coffee item does not exist")

    db.session.add(order)
    db.session.commit()
    db.session.refresh(order)

    return order

def get_all_order_by_user(user_id:int):
    user_orders = db.session.query(Order).filter_by(user_id = user_id).all()
    return user_orders

def order_from_dict(order_dict: dict):
    return Order.from_dict(order_dict)


def order_to_dict(order: Order):
    return Order.to_dict()