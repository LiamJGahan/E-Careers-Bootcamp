import mysql.connector

# parameters connected to mysql
db_connection = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "123pass"
)

# create cursor to execute the query
cursor = db_connection.cursor()

create_database_query = "CREATE DATABASE test_db"
cursor.execute(create_database_query)

# commit changes
db_connection.commit()

# close cursor and connections
cursor.close()
db_connection.close()

print("database created")