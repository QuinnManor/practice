# Find the greatest common denominator (gcd) of two numbers
# using Euclid's Algorithm


def gcd(num_one, num_two):
    while num_two != 0:
        t = num_one
        num_one = num_two
        num_two = t % num_two
    return num_one

print(gcd(22, 16))