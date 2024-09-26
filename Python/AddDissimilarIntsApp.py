def add_dissimilar_integers():
    integer1 = int(input("Enter first integer: "))
    integer2 = int(input("Enter second integer: "))
    integer3 = int(input("Enter third integer: "))

    if integer1 == integer2 or integer1 == integer3 or integer2 == integer3:
        print(0)
    else:
        print(integer1 + integer2 + integer3)

add_dissimilar_integers()