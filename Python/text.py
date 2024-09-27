list_1 = ["Ten", "Twenty", "Thirty"]
list_2 = [10, 20, 30]

res = dict(map(lambda i,j : (i,j) , list_1,list_2))

print(res)