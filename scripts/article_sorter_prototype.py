import numpy as np 
import pandas as pd 
import selenium
from selenium import webdriver
import bs4
from bs4 import BeautifulSoup
import time

"""
Prototyping:
1. Import a text file containing just one abstract
2. Open text file, clean up text and tokenize words
3. Pass tokens through Word2Vec, 
4. Search through list of tokens using regex

