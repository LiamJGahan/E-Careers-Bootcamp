def get_factors_of_number(num):
    
    factors_list = []

    for i in range(num):

        if i == 0: continue
        if num % i == 0:
            factors_list.append(i)

    return factors_list