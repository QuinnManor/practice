# Working with Stacks

# Stacks are last-in, first-out (LIFO) data structures 
# Last item pushed in, is the first item pushed out

# Use Cases
# Use a stack for backtracking: 
    # Store website links in a stack
        # when you click the back button on a web-page, it references the last link stored

# Create a stack (or list)
stack = []

# Add to a stack
stack.append(14)
stack.append(28)

# Print Stack
print(stack)

# Remove item from stack
x = stack.pop()
print(f"Popped: {x}")
print(stack)