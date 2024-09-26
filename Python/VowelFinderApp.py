def vowel_finder():
    vowel_list = ["a", "e" , "i", "o", "u"]
    found_vowel = False

    string = input("Enter a word or letter: ")

    for char in vowel_list:
        if string.find(char) != -1:
            found_vowel = True

    if found_vowel:
        print('Vowel Found')
    else:
        print('Vowel Not Found')

vowel_finder()