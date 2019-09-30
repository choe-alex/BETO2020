import numpy as np
import pandas as pd
import selenium
from selenium import webdriver
import bs4
from bs4 import BeautifulSoup
import time
import re
import nltk
from gensim.models import Word2Vec
from nltk.corpus import stopwords
from collections import defaultdict

def extractor(url,driver,wait_time):
    """
    Accepts a url and stores its html code before parsing and extracting the abstract as text.
    Feeds directly into parser, so don't call this function unless you want to obtain the abstract
    from a single url.
    """
    driver.get(url)
    time.sleep(wait_time) # important

    html_doc = driver.page_source # stores the source HTML code in the driver's page_source attribute
    soup = BeautifulSoup(html_doc, 'html.parser')
    abstract = soup.find('div', {'class':"Abstracts u-font-serif"}).text

    return abstract

def parse_all(driver):
    """
    The following method is designed to automatically parse each url contained in a long list 
    of scraped urls, and writes the title, abstract, and doi to a new text file with a user
    input "file_name.txt."
    
    Arguments:
    driver - desired webdriver; must
    """
    
    url_lst = input("Enter name of file with .txt extension with list of urls: ")
    data = pd.read_csv(url_lst,header=None,names=['url']) #text file containing a list of the scraped urls (should be in same directory)
    file_name = input("Input the file name with .txt extension you wish to store abstracts in: ")
    file = open(file_name,'w')

    max_iters = len(data) #total number of scraped urls to be parsed
    print("The parser will parse: " + str(max_iters) + " urls.")

    for i in range(0,max_iters):
        print('On url ',i)
        driver.refresh()
        time.sleep(2)
        urli = str(extractor(data.iloc[i,0],driver,3))
        file.write(urli)
        file.write('\n')
    driver.quit()

    return file_name

### Actual executable code is shown below ###
### driver = webdriver.Chrome()
### parse_all(driver)

def tokenizer(file_name):
    """ 
    Accepts text file as a string (e.g. "abstracts.txt") containing a list of abstracts as input and cleans up text using regex.
    """
    with open(file_name) as file:
        corpus = file.readlines()
        processed_abstracts = [w.lower() for w in corpus]
        processed_abstracts = [re.sub('[^a-zA-Z]', ' ', w) for w in processed_abstracts]
        processed_abstracts = [re.sub(r'\s+', ' ', w) for w in processed_abstracts]
    tokens = [nltk.word_tokenize(sent) for sent in processed_abstracts]

    for i in range(len(processed_abstracts)):
        tokens[i] = [w for w in tokens[i] if w not in stopwords.words('english')]

    return tokens


