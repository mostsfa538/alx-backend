#!/usr/bin/env python3
""" Basic cashe """
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ A basic caching system """

    def put(self, key, item):
        """ assign to the dictionary self.cache_data """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """ return the value in self.cache_data linked to key """
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data.get(key)
