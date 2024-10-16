class ErrorSalaryBelowMinimum (Exception):
    "Salary was below the minimum"
    

try:
    name = input("Enter your name:")
    dept = input("Enter your department:")
    salary = int(input("Enter your expected salary:"))

    if (salary < 1000):
        raise ErrorSalaryBelowMinimum("Salary too low")
    else:

        print(name)
        print(dept)
        print(salary)

except ErrorSalaryBelowMinimum:
    print("Below the minimum required salary")
