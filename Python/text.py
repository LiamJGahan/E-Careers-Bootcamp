with open("empty_text.txt", "r") as fp:

    lines = []
    
    for i, line in enumerate(fp):
        
        lines.append(line.strip())

print(lines)