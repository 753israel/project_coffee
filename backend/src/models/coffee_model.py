from backend.database import db
from sqlalchemy.orm import relationship





class Coffee(db.Model):
    __tablename__ = "coffee"
    coffee_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    orders = relationship("Order", back_populates="coffee")

    def to_dict(self):
        coffee_dict={}
        coffee_dict["coffee_id"] = self.coffee_id
        coffee_dict["name"] = self.name
        coffee_dict["description"] = self.description
        coffee_dict["image"] = self.image
        coffee_dict["price"] = self.price
        return coffee_dict

    @staticmethod
    def from_dict(coffee_dict: dict):
        coffee_id = coffee_dict.get("coffee_id")
        name = coffee_dict["name"]
        description = coffee_dict["description"]
        image = coffee_dict["image"]
        price = coffee_dict["price"]
        return Coffee(coffee_id=coffee_id, name=name, description=description, image=image, price=price)    