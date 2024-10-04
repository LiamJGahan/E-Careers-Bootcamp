with open("empty_text.txt", "r") as fp:

    lines = []
    
    for i, line in enumerate(fp):

        if i < 2:
            lines.append(line.strip())
        else:
            break
print(lines)