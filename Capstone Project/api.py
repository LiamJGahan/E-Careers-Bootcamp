from flask import Flask, jsonify, request
from flask_cors import cross_origin
import mysql.connector

app = Flask(__name__)

def create_connection():
    connection = mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = '123pass',
        database = 'capstone_project'
    )
    return connection 

# Retrieves all quizzes with their titles and descriptions.
@app.route("/api/quizzes", methods=["GET"])
@cross_origin(origins='*')
def get_all_quizzes():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""SELECT * FROM QUIZZES""")
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

# Retrieves questions and their choices for a specific quiz ID.
@app.route("/api/quizzes/<int:quiz_id>/questions", methods=["GET"])
@cross_origin(origins='*')
def get_questions_and_choices(quiz_id):
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""SELECT choices.id, question_id, choice_text, is_correct, quiz_id, question_text FROM choices Join questions ON questions.id = choices.question_id WHERE quiz_id = %s""", (quiz_id,))
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

# Accepts a JSON payload containing the quiz ID and answers, then calculates the score.
@app.route("/api/submit", methods=['POST'])
@cross_origin(origins='*')
def sumbit_and_score():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    answers = request.json['user_answers']
    id = request.json['quiz_id']
    cursor.execute("""SELECT choices.id, is_correct FROM choices Join questions ON questions.id = choices.question_id WHERE quiz_id = %s""", (id,))
    cursor_data = cursor.fetchall()
    
    score = 0
    for data in cursor_data:
        id = data["id"]
        if data['is_correct'] == 1:
            for answer in answers:
                if answer['choice_id'] == id:                
                    score += 1

    cursor.close()
    return jsonify(score)


if __name__ == '__main__':
    app.run(port=5002)