import mysql.connector
import MySQL_Config

try: 
    db_connection = mysql.connector.connect(**MySQL_Config.config)

    cursor = db_connection.cursor()

    update_table_data = "update employee set emp_salary = emp_salary + ((emp_salary / 100) * 10)"
    cursor.execute(update_table_data)

    db_connection.commit()

except mysql.connector.Error as e:
    print("Error")
finally:
    if db_connection.is_connected():
        cursor.close()
        db_connection.close()

print("table updated")