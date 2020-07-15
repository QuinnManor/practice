# Working with Hash Tables (dictionaries)

# Map Keys to Values (K:V pairs)
# A lot faster than other data structures

# Create a hash table (dictionary)
item_one = dict({'key1': 14, 'key2': 28})
print(item_one)

# Create a hash table progressively (dictionary)
item_two = {}
item_two.update({'key1': 14, 'key2': 28})
print(item_two)

# Access a nonexistent key
# item_one['key3']

# Replace an item
item_one['key1'] = 17
print(item_one)

# Iterate over all the contents of a hash table
for k,v in item_two.items():
    print(f"key: {k} --- value: {v}")