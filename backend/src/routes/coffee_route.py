from flask import Blueprint ,jsonify ,request
from backend.src.middleware.token_helper import verify_token
from werkzeug.utils import secure_filename
import os
import uuid
import backend.src.controlers.coffee_controler as controller_coffee
from backend import http_code

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IMAGES = os.path.join(BASE_DIR, 'static')

coffee_bp = Blueprint("coffee_bp", __name__, url_prefix="/api/coffee")


@coffee_bp.before_request
def protect():
    if request.method == "OPTIONS":
        return None  # לא בודקים טוקן ב־OPTIONS

    user = verify_token()
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    

    
@coffee_bp.route("/new", methods=["POST"])
def post_coffee():
    try:
        # ממיר את כל ה־form למילון רגיל
        coffee_dict = request.form.to_dict()
        # מקבל את קובץ התמונה
        image = request.files.get("image")
        # בדיקה אם הועלתה תמונה
        if image is None or image.filename.strip() == "":
            return jsonify({"error": "No image uploaded"}), http_code.HTTP_CODE_INVALID_DATA
        # ניקוי שם הקובץ מסיכונים
        filename = secure_filename(image.filename)
        # חילוץ סיומת הקובץ (jpg, png וכו')
        ext = filename.split(".")[-1]
        # יצירת שם חדש וייחודי לתמונה
        image_filename = f"{uuid.uuid4().hex}.{ext}"
        # יצירת תיקיית התמונות אם לא קיימת
        os.makedirs(IMAGES, exist_ok=True)
        # בניית הנתיב המלא לתמונה
        image_path = os.path.join(IMAGES, image_filename)
        # ניסיון לשמור את התמונה
        try:
            image.save(image_path)
        except Exception:
            return jsonify({"error": "לא ניתן לשמור את התמונה, יתכן שאין מספיק מקום בדיסק"}), http_code.HTTP_CODE_SERVER_ERROR
        # שמירת שם התמונה בתוך המילון
        coffee_dict["image"] = image_filename
        # המרת מילון לאובייקט Coffee
        coffee = controller_coffee.coffee_from_dict(coffee_dict)
        # ניסיון להוסיף את הקפה למסד הנתונים
        try:
            new_coffee = controller_coffee.add_coffee(coffee)
        except ValueError as e:
            # לדוגמה: Coffee already exists
            return jsonify({"error": str(e)}), http_code.HTTP_CODE_INVALID_DATA
        # אם הכול עבר בהצלחה – מחזירים JSON של הקפה החדש
        return jsonify(new_coffee.to_dict()), http_code.HTTP_CODE_CREATED
    except Exception as e:
        # שגיאה כללית שלא צפינו
        return jsonify({"error": "Server error", "details": str(e)}), http_code.HTTP_CODE_SERVER_ERROR
    

@coffee_bp.route("/", methods=["GET"])
def get_all_coffee():
    user = verify_token()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    all_coffee = controller_coffee.get_all_coffee() or []
    coffee_list = []

    for coffee in all_coffee:
        c = coffee.to_dict()
        c["image"] = c["image"]   # רק השם, בלי /static/
        coffee_list.append(c)

    return jsonify(coffee_list), 200