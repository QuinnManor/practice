# Creating a Linked List


# Node class
class Node(object):
    def __init__(self, val):
        self.val = val
        self.next = None

    def get_data(self):
        return self.val

    def set_data(self, val):
        self.val = val

    def get_next(self):
        return self.next

    def set_next(self, next):
        self.next = next


# LinkedList Class
class LinkedList(object):
    def __init__(self, head=None):
        self.head = head
        self.count = 0

    def get_count(self):
        return self.count

    def insert(self, data):
        new_node = Node(data)
        new_node.set_next(self.head)
        self.head = new_node
        self.count += 1

    def find(self, val):
        item = self.head
        while item != None:
            if item.get_data() == val:
                return item
            else:
                item.get_next()
        return None

    def delete_index(self, index):
        if index > self.count-1:
            return

        if index == 0:
            self.head = self.head.get_next()
        else:
            temp_index = 0
            node = self.head
            while temp_index < index - 1:
                node = node.get_next()
                temp_index += 1
            node.set_next(node.get_next().get_next())
            self.count
    
    def dump_list(self):
        temp_node = self.head
        while temp_node != None:
            print(f"Node: {temp_node.get_data()}")
            temp_node = temp_node.get_next()


# create linked list and insert some items
item_list = LinkedList()
item_list.insert(14)
item_list.insert(28)
item_list.dump_list()

# print items in list
# print(f"Item Count: {item_list.get_count()}")
# print(f"Finding item: {item_list.find(14)}")
# print(f"Finding item: {item_list.find(28)}")

# delete item from a list
item_list.delete_index(0)
print(f"Item Count: {item_list.get_count()}")
print(f"Finding item: {item_list.find(14)}")