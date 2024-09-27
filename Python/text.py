import random

list_1 = [1, 2, 3, 4, 5, 6, 7, 8]
list_2 = []

list_1_count = len(list_1)

for i in range(list_1_count):
    random_num = random.choice(list_1)
    list_2.append(random_num)
    list_1.remove(random_num)

print(list_2)