list_1 = [5, 10, 15, 200, 25, 50,20]
list_2 = []

first_20 = True

for num in list_1:
    if  num == 20 and first_20 == True:
        list_2.append(200)
        first_20 = False
        print(first_20)
    else:
        list_2.append(num)

print(list_2)
