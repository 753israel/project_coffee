from flask import Blueprint, jsonify, request
import backend.src.controlers.user_controler as controler
from backend.src.middleware import token_helper,password_helper
from backend import http_code
import os

users_bp = Blueprint("users_bp", __name__, url_prefix="/api/users")

@users_bp.route("/register", methods=["POST"])
def user_register():
    try:
        secret_key_USER_CODE = os.getenv("USER_CODE")
        secret_key_ADMIN_CODE = os.getenv("ADMIN_CODE")
        user_dict = request.get_json()
        company_code = user_dict.get("role_password")
        user = controler.user_from_dict(user_dict)

        
        if user.role != 'regular' and company_code != secret_key_USER_CODE:
            return jsonify({"error": "Invalid user"}),http_code.HTTP_CODE_INVALID_DATA
        if user.role != 'admin' and company_code != secret_key_ADMIN_CODE:
             return jsonify({"error": "Invalid user"}),http_code.HTTP_CODE_INVALID_DATA
        
        add_user = controler.add_user(user)
        if add_user:
            return jsonify(controler.user_to_dict(add_user)),http_code.HTTP_CODE_SUCCESS
        
    except ValueError as e:
        return jsonify({"error": str(e)}), http_code.HTTP_CODE_INVALID_DATA
    



@users_bp.route("/login", methods=["POST"])
def user_login():
    try:
        email = request.get_json("email")
        password = request.get_json("password")
        user = controler.login_user(email , password)

        if not user:
            return jsonify({"error": "Invalid user"}), http_code.HTTP_CODE_INVALID_DATA
        
        token = token_helper(user)
        return jsonify(controler.user_to_dict(user), token),http_code.HTTP_CODE_SUCCESS
    
    except ValueError as e:
        return jsonify({"error": str(e)}), http_code.HTTP_CODE_INVALID_DATA
            

        
        