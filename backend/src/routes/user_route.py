from flask import Blueprint, jsonify, request
import backend.src.controlers.user_controler as controler
from backend.src.middleware.token_helper import generate_token
from backend import http_code
import os

users_bp = Blueprint("users_bp", __name__, url_prefix="/api/users")


# -------------------------
# REGISTER
# -------------------------
@users_bp.route("/register", methods=["POST"])
def user_register():
    try:
        user_dict = request.get_json()

        secret_key_USER_CODE = os.getenv("USER_CODE")
        secret_key_ADMIN_CODE = os.getenv("ADMIN_CODE")

        company_code = user_dict.get("role_password")

        user = controler.user_from_dict(user_dict)

        if user.role == "regular" and company_code != secret_key_USER_CODE:
            return jsonify({"error": "Invalid user"}), http_code.HTTP_CODE_INVALID_DATA

        if user.role == "admin" and company_code != secret_key_ADMIN_CODE:
            return jsonify({"error": "Invalid user"}), http_code.HTTP_CODE_INVALID_DATA

        add_user = controler.add_user(user)

        return jsonify(controler.user_to_dict(add_user)), http_code.HTTP_CODE_SUCCESS

    except ValueError as e:
        return jsonify({"error": str(e)}), http_code.HTTP_CODE_INVALID_DATA

    except Exception:
        return jsonify({"error": "Server error"}), http_code.HTTP_CODE_SERVER_ERROR


# -------------------------
# LOGIN
# -------------------------
@users_bp.route("/login", methods=["POST"])
def user_login():
    try:
        data = request.get_json()

        if data is None:
            return jsonify({"error": "Invalid JSON"}), 400

        email = data.get("email")
        password = data.get("password")

        user = controler.login_user(email, password)

        if not user:
            return jsonify({"error": "Invalid user"}), http_code.HTTP_CODE_INVALID_DATA

        token = generate_token(user)

        response_data = {
            "user": controler.user_to_dict(user),
            "token": token
        }

        return jsonify(response_data), http_code.HTTP_CODE_SUCCESS

    except ValueError as e:
        return jsonify({"error": str(e)}), http_code.HTTP_CODE_INVALID_DATA

    except Exception:
        return jsonify({"error": "Server error"}), http_code.HTTP_CODE_SERVER_ERROR