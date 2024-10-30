from flask import Flask, jsonify, request
# from flask_mysqldb import MySQL
from flask_cors import cross_origin
import mysql.connector

app = Flask(__name__)

def create_connection():
    connection = mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = '123pass',
        database = 'e_careers'
    )
    return connection 

#mysql = MySQL(app)

@app.route('/data/students', methods=['POST'])
def create_table():
    cur = mysql.connection.cursor()
    cur.execute('''CREATE TABLE students(stud_id int primary key, stud_name varchar(20) not null, stud_age int, 
    grade varchar(1))''')
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Table created successfully'})

@app.route('/data', methods=['GET'])
@cross_origin(origins='*')
def get_data():
    connection = create_connection()
    cur = connection.cursor(dictionary=True)
    cur.execute('''SELECT * from students''')
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route('/data', methods=['POST'])
def post_data():
    cur = mysql.connection.cursor()
    id = request.json['id']
    name = request.json['stud_name']
    age = request.json['stud_age']
    grade = request.json['grade']
    cur.execute('''INSERT INTO students (stud_id, stud_name, stud_age, grade) VALUES(%s, %s, %s, %s)''', (id, name, age, grade))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Data inserted successfully'})

@app.route('/data/<int:id>', methods=['GET'])
def get_data_by_id(id):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * from students where stud_id = %s''', (id,))
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route('/data/<int:id>', methods=['PUT'])
def update_data_by_id(id):
    cur = mysql.connection.cursor()
    name = request.json['stud_name']
    age = request.json['stud_age']
    cur.execute('''UPDATE students SET stud_name = %s, stud_age = %s WHERE stud_id = %s''', (name, age, id))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Data updated successfully'})

@app.route('/data/DELETE/<int:id>', methods=['DELETE'])
def delete_students_by_id(id):
    cur = mysql.connection.cursor()
    cur.execute('''Delete From students WHERE stud_id = %s''', (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Data deleted successfully'})

if __name__ == '__main__':
    app.run(port=5002)