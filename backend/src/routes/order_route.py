from flask import Blueprint, jsonify ,request
import backend.src.controlers.order_controler as order_controller
from middleware.token_helper import verify_token
from backend import http_code
import os
from dotenv import load_dotenv

load_dotenv()  # טוען משתני סביבה מהקובץ .env

COFFEE_PRICE = os.getenv("COFFEE_PRICE")


order_coffee_bp = Blueprint("order_coffee_bp", __name__, url_prefix="/api/coffee")

@order_coffee_bp.before_request
def protect():
    error = verify_token()
    if error:
        return error
    
@order_coffee_bp.route("/<int:coffee_id>", methods=["POST"])
def send_order(coffee_id):
    try:
        # מקבל JSON מהלקוח
        order_coffee = request.json
        
        # מוסיף את ה-ID של הקפה להזמנה
        order_coffee["coffee_id"] = coffee_id

        # שולח לקונטרולר
        order = order_controller.add_order(order_coffee)

        # אם ההוספה הצליחה
        if order:
            return jsonify({"status": "success"}), http_code.HTTP_CODE_CREATED

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), http_code.HTTP_CODE_SERVER_ERROR
    

@order_coffee_bp.route("/user/<user_id>", methods=["GET"])
def get_orders_by_user(user_id):
    try:
        # מביא את כל ההזמנות של המשתמש
        orders_user = order_controller.get_all_order_by_user(user_id)

        # אם יש הזמנות – ממירים ל־dict
        if orders_user:
            orders = [order_controller.order_to_dict(order) for order in orders_user]
            return jsonify(orders), http_code.HTTP_CODE_SUCCESS

        # אם אין הזמנות – מחזירים רשימה ריקה
        return jsonify([]), http_code.HTTP_CODE_SUCCESS

    except Exception as e:
        # במקרה של שגיאה אמיתית
        return jsonify({"error": "Server error", "details": str(e)}), http_code.HTTP_CODE_SERVER_ERROR