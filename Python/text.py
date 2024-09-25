import os

filename = str(input("Enter file name here"))
path = os. path. splitext(filename)

print(path[1])