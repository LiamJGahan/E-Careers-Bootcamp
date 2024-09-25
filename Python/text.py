a = float(input())
b = float(input())
c = str(input())

result = 0

if (c == "Add"):
    result = a + b
if (c == "Subtract"):
    result = a - b
if (c == "Times"):
    result = a * b
if (c == "Divide"):
    result = a / b


print(result)