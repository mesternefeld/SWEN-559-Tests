import unittest
import requests


class TestSum(unittest.TestCase):

    def test_sum(self):
        """Checks to see if 1 + 2 + 3 = 6"""
        self.assertEqual(sum([1, 2, 3]), 6, "Should be 6")

    def test_sum_tuple(self):
        """Checks to see if 1 + 2 = 6. THIS SHOULD FAIL"""
        self.assertEqual(sum((3, 2)), 6, "Should be 6")

    def test_prime_true(self):
        """Checks to see if 101 is prime"""
        self.assertTrue(is_prime(101), "101 is a prime number")

    def test_prime_false(self):
        """Confirms that 99 is not prime"""
        self.assertFalse(is_prime(99), "99 is not a prime number")

    def test_split_error(self):
        """Confirms that trying to split a list gives a TypeError"""
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        with self.assertRaises(TypeError):
            s.split(2)

    def test_replace(self):
        """Checks that I should be staying inside and not infecting people"""
        s = 'I am sick and therefore, I should go see my friends'
        s = s.replace("go see my friends", "STAY INSIDE")
        self.assertEqual(s, 'I am sick and therefore, I should STAY INSIDE')

    def test_get_request(self):
        """Checks that the API returns a 200 response"""
        response = requests.get(
            'https://jsonplaceholder.typicode.com/todos/1', auth=('user', 'pass'))
        self.assertEqual(response.status_code, 200)


def is_prime(num):
    """Returns True if the provided number, num, is prime"""
    if num > 1:
        for i in range(2, num):
            if (num % i) == 0:
                return False
    return True


if __name__ == '__main__':
    unittest.main()
