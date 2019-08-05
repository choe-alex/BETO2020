import numpy as np
import pandas as pd
import selenium
from selenium import webdriver
import bs4
from bs4 import BeautifulSoup
import time


def extractor(url,driver,wait_time):
    """
    Accepts a url and stores its html code before parsing and extracting the title,
    abstract, doi, and the body as text.
    """
    driver = webdriver.Chrome()
    driver.get(url)
    time.sleep(wait_time) # important

    html_doc = driver.page_source # stores the source HTML code in the driver's page_source attribute
    soup = BeautifulSoup(html_doc, 'html.parser')

    title = soup.find('span', {'class':"title-text"}).text
    abstract = soup.find('div', {'class':"Abstracts u-font-serif"}).text

    try:
        doi = soup.find('div',{'id':"doi-link"}).text
    except:
        print("Oops, I was unable to extract the DOI.")
        doi = None

    try:
        body = soup.find('div', {'id':"body"}).text
    except:
        print("oops, I was unable to extract the body of the article.")
        body = None

    #lst = [doi,title,abstract,body]
    return abstract

"""
The following code accepts a text file containing a list of the scraped urls and writes the abstract of each url to a new file.
"""
data = pd.read_csv('sd_test.txt',header=None) # 'sd_test.txt' is the file containing a list of the urls
driver = webdriver.Chrome()
file_name = input("Input the file name with .txt extension you wish to store extracted data in: ")
file = open(file_name,'w')

max_iters = 10 # set by user
for i in range(1,max_iters):
    print('On url ',i)
    driver.refresh()
    time.sleep(2)
    urli = extractor(data.iloc[i,0],driver,3)
    file.write(urli)
    file.write('\n')


driver.quit()