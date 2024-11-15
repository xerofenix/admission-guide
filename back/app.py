from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.feedback_route import feedback_blueprint

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

# Register the feedback route
app.register_blueprint(feedback_blueprint, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
