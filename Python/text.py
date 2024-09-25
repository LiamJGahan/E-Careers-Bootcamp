first_string = "a,b,c"
second_string = "x,y,z"

result = second_string.replace(",", " ") + " " + first_string.replace(",", " ")

print(result)