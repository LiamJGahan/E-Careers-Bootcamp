list = ["red", "green", "blue"]

try:
    user_num = int(input("Enter username:"))
    print(list[user_num])
except IndexError:
    print("Number given is out of index")