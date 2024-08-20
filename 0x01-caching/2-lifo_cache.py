#!/usr/bin/env python3
""" LIFO Caching """
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache class """

    def put(self, key, item):
        """  assign to the dictionary self.cache_data """
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data.keys()) > super().MAX_ITEMS:
            remove = list(self.cache_data.keys())[-2]
            print(f"DISCARD: {remove}")
            del self.cache_data[remove]

    def get(self, key):
        """ return the value in self.cache_data linked to key """
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data.get(key)
