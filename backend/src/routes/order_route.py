from flask import Blueprint ,jsonify ,request
print("ORDER ROUTE: START IMPORT")

import backend.src.controlers.order_controler as order_controller
print("IMPORT 1 OK")

from backend.src.middleware.token_helper import verify_token
print("IMPORT 2 OK")

from backend import http_code
print("IMPORT 3 OK")

import os
print("IMPORT 4 OK")

from dotenv import load_dotenv
print("IMPORT 5 OK")

COFFEE_PRICE = os.getenv("COFFEE_PRICE")

order_coffee_bp = Blueprint("order_coffee_bp", __name__, url_prefix="/api/coffee")
print("ORDER ROUTE: BLUEPRINT CREATED")

@order_coffee_bp.before_request
def protect():
    if request.method == "OPTIONS":
        return None  # לא בודקים טוקן ב־OPTIONS

    user = verify_token()
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

@order_coffee_bp.route("/user/<user_id>", methods=["GET"])
def get_orders_by_user(user_id):
    print("ROUTE FUNCTION ENTERED")

    user_id = int(user_id)

    orders_user = order_controller.get_all_order_by_user(user_id)
    print("ORDERS FROM DB:", orders_user)

    if orders_user:
        orders = [order_controller.order_to_dict(order) for order in orders_user]
        return jsonify(orders), http_code.HTTP_CODE_SUCCESS

    return jsonify([]), http_code.HTTP_CODE_SUCCESS

@order_coffee_bp.route("/<int:coffee_id>", methods=["POST"])
def create_order_route(coffee_id):
    try:
        data = request.get_json()

        if not data or "user_id" not in data:
            return jsonify({"status": "error", "message": "user_id missing"}), 400

        user_id = int(data["user_id"])

        # יצירת הזמנה חדשה
        new_order = order_controller.create_order(user_id, coffee_id)

        return jsonify({
            "status": "success",
            "order": order_controller.order_to_dict(new_order)
        }), 200

    except Exception as e:
        print("ORDER ERROR:", e)
        return jsonify({"status": "error", "message": str(e)}), 500