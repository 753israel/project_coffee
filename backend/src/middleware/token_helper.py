from flask import request, jsonify, g
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
import datetime
from datetime import timezone, timedelta  # ווידוא שהכל יובא נכון

from backend.src.models.user_model import User
from backend import http_code

secret_key = "os.getenv(\"SECRET_KEY\")"

def generate_token(user: User):
    payload = {
        "user_id": user.user_id,
        "role": user.role,
        "exp": datetime.datetime.now(timezone.utc) + timedelta(days=1)
    }
    token = jwt.encode(payload, secret_key, algorithm="HS256") 
    if isinstance(token, bytes):
        token = token.encode('utf-8')
    return token

def verify_token():
    if request.method == "OPTIONS":
        return

    authorization_header = request.headers.get("Authorization")
    if not authorization_header:
        return jsonify({"error": "missing security data, please login"}), 401
    if not authorization_header.startswith("Bearer "):
        return jsonify({"error": "please login"}), 401

    try:
        token = authorization_header.split(" ")[1]
        if isinstance(token, bytes):
            token = token.decode('utf-8')

        decoded_data = jwt.decode(token, secret_key, algorithms=["HS256"])
        g.user = decoded_data
    except ExpiredSignatureError:
        return jsonify({"error": "session expired, please login"}), http_code.HTTP_CODE_NOT_AUTHENTICATED
    except InvalidTokenError:
        return jsonify({"error": "invalid security, please login"}), http_code.HTTP_CODE_NOT_AUTHENTICATED
    except:
        return jsonify({"error": "unknown security, please login"}), http_code.HTTP_CODE_NOT_AUTHENTICATED