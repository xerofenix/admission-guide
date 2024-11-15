from flask import Blueprint, request, jsonify
from models.db_connection import get_db_connection

feedback_blueprint = Blueprint("feedback", __name__)

@feedback_blueprint.route("/feedback", methods=["POST"])
def submit_feedback():
    data = request.get_json()
    email = data.get("email")
    feedback_text = data.get("feedback")

    if not email or not feedback_text:
        return jsonify({"error": "Email and feedback are required"}), 400

    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO feedback (email, feedback) VALUES (%s, %s)"
        cursor.execute(query, (email, feedback_text))
        conn.commit()

        return jsonify({"message": "Feedback submitted successfully"}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Database error"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
