#!/usr/bin/env python3
""" LFUCache cashing """
from base_caching import BaseCaching
from collections import OrderedDict


class LFUCache(BaseCaching):
    """ LFUCache class """

    def __init__(self):
        """ Initiliaze """
        super().__init__()
        self.cache_data = OrderedDict()
        self.freq = {}

    def put(self, key, item):
        """ Must assign to the dictionary self.cache_data """

        if key is None or item is None:
            return

        if key in self.cache_data.keys():
            del self.cache_data[key]
            self.cache_data[key] = item
            self.freq[key] += 1
            return
        elif len(self.cache_data) >= super().MAX_ITEMS:
            min_freq_keys = [k for k, v in self.freq.items()
                             if v == min(self.freq.values())]
            min_timestamp_key = min(min_freq_keys, key=lambda k: self.freq[k])
            self.cache_data.pop(min_timestamp_key)
            self.freq.pop(min_timestamp_key)
            print(f'DISCARD: {min_timestamp_key}')
        self.cache_data[key] = item
        self.freq[key] = 1

    def get(self, key):
        """ Must return the value in self.cache_data linked to key """

        if key is None or key not in self.cache_data.keys():
            return None
        val = self.cache_data[key]
        del self.cache_data[key]
        self.cache_data[key] = val
        self.freq[key] += 1
        return val
