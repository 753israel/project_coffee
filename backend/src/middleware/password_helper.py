# utils/security.py
from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(plain_password: str) -> str:
    """
    Hash a plain password using PBKDF2 (via Werkzeug).
    """
    return generate_password_hash(plain_password, method="pbkdf2:sha256", salt_length=16)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Compare a plain password against a stored hashed password.
    """
    return check_password_hash(hashed_password, plain_password)
