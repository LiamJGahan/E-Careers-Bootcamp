def number_search():

    numbers_list = []
    number_counter = 0

    while True:
        if len(numbers_list) >= 5:

            user_second_input = int(input("Enter a number to search in the list: "))

            for number in numbers_list:
        
                if number == user_second_input:
                    number_counter += 1

            print(number_counter)
            break

        user_first_input = int(input("Enter a number to add to the list: "))

        numbers_list.append(user_first_input)

number_search()

print("Program End") 