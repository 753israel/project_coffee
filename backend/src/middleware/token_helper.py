from flask import request, jsonify, g
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
import datetime
from datetime import timezone, timedelta
import os

from backend.src.models.user_model import User
from backend import http_code

# טעינת secret key אמיתי
secret_key = os.getenv("SECRET_KEY", "default_secret_key")

def generate_token(user: User):
    payload = {
        "user_id": user.user_id,
        "role": user.role,
        "exp": datetime.datetime.now(timezone.utc) + timedelta(days=1)
    }

    token = jwt.encode(payload, secret_key, algorithm="HS256")

    # הפיכה ל־string אם צריך
    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return token


def verify_token():
    authorization_header = request.headers.get("Authorization")

    if not authorization_header:
        return None

    if not authorization_header.startswith("Bearer "):
        return None

    try:
        token = authorization_header.split(" ")[1]
        decoded_data = jwt.decode(token, secret_key, algorithms=["HS256"])
        g.user = decoded_data
        return decoded_data

    except Exception:
        return None