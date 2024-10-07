import mysql.connector
import MySQL_Config

try: 
    db_connection = mysql.connector.connect(**MySQL_Config.config)

    cursor = db_connection.cursor()

    select_table_data = """select * from employee where emp_id = %s"""
    cursor.execute(select_table_data, params= [102])
    data = cursor.fetchall()

    for row in data:
        print("EmpID", row[0],)
        print("EmpoName", row[1],)
        print("EmpDept", row[2],)
        print("EmpolyeeID", row[3])
        print("-----------------")

    db_connection.commit()

except mysql.connector.Error as e:
    print("Error")
finally:
    if db_connection.is_connected():
        cursor.close()
        db_connection.close()
