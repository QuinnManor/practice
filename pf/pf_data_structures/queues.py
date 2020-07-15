# Working with Queues

# Queues are first-in, first-out (FIFO) data structures 
# Last item pushed in, is the first item pushed out

# Use Cases
# Procesing orders
    # Ensures the order of a product are fulfilled in the order they were submitted
# Messaging
    # Make sure each message sent, is in the order they were written

# Create a queue (or deque from the collections)
from collections import deque
queue = deque()

# Add to a stack
queue.append(14)
queue.append(28)

# Print Stack
print(queue)

# Remove item from queue
x = queue.popleft()
print(f"Popped: {x}")
print(queue)