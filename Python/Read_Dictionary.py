import csv

grades_for_students = [
    
    {"Name":"Callum", "Grade":"B"},
    {"Name":"Shane", "Grade":"C"},
    {"Name":"Luke", "Grade":"A"},
    {"Name":"Kevin", "Grade":"C"},
    {"Name":"David", "Grade":"E"}
]

with open("dictonary.csv", "w", newline="") as fp:
    field_names = ["Name", "Grade"]
    writer = csv.DictWriter(fp, field_names, delimiter= "|")
    writer.writeheader()
    writer.writerows(grades_for_students)
        