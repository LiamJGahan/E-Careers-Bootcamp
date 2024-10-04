with open("empty_text.txt", "r") as fp:

    lines = fp.readlines()
    lines.reverse()

print(lines)