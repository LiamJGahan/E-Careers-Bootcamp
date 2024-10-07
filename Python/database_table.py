import mysql.connector
import MySQL_Config

# connect to mysql
db_connection = mysql.connector.connect(**MySQL_Config.config)

# create cursor to execute the query
cursor = db_connection.cursor()

create_database_query = "create table user_2 (user_id int primary key);"
cursor.execute(create_database_query)

# commit changes
db_connection.commit()

# close cursor and connections
cursor.close()
db_connection.close()

print("table created")