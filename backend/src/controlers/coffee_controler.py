from backend.src.models.coffee_model import Coffee
from backend.src.database import db



def add_coffee(coffee: Coffee):
    existing = db.session.query(Coffee).filter_by(coffee_id = coffee.coffee_id).first()

    if existing:
        raise ValueError("Coffee already exists")
    
    db.session.add(coffee)
    db.session.commit()
    db.session.refresh(coffee)
    return coffee


def get_all_coffee():
    coffee_list = db.session.query(Coffee).all()

    if not coffee_list:
        raise ValueError("You don't have a coffee list")
    return coffee_list
    

def coffee_from_dict(coffee_dict: dict) -> Coffee:
    return Coffee.from_dict(coffee_dict)


def coffee_to_dict(coffee: Coffee) -> dict:
    return Coffee.to_dict(coffee) 