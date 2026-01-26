import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from backend.src.routes.user_route import users_bp
from backend.src.routes.coffee_route import coffee_bp
from backend.src.routes.order_route import order_coffee_bp
from backend.database import init_database, create_tables

load_dotenv()

SERVER_PORT = int(os.getenv("SERVER_PORT", 5000))
SERVER_IP = os.getenv("SERVER_IP", "0.0.0.0")
DATABASE_URL = os.getenv("DATABASE_URL")




app = Flask(
    __name__,
    static_folder="../frontend/build",
    static_url_path="/"
)

# 🔥 נתיב מוחלט לתיקיית התמונות



app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


IMAGES_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "backend", "static")
)
print("IMAGES_DIR:", IMAGES_DIR)
app.add_url_rule(
    "/static/<path:filename>",
    endpoint="static_files",
    view_func=lambda filename: send_from_directory(IMAGES_DIR, filename)
)

CORS(app)

app.register_blueprint(users_bp)
app.register_blueprint(coffee_bp)
app.register_blueprint(order_coffee_bp)

init_database(app)

with app.app_context():
    create_tables()

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    full_path = os.path.join(app.static_folder, path)

    if path != "" and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)

    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host=SERVER_IP, port=SERVER_PORT)