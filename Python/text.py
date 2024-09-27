sample_dict = {
  'Physics': 82,
  'Math': 65,
  'history': 75
}

for key, value in sample_dict.items():

    if  value == min(sample_dict.values()):
        print(key) 

