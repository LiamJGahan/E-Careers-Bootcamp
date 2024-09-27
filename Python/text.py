list_1 = [5, 10, 15, 20, 25, 50,20]
list_2 = []

first_20 = True

for num in list_1:
    if  num == 20 and first_20 == True:
        continue
    else:
        list_2.append(num)

print(list_2)
