import numpy as np
import pandas as pd
import selenium
from selenium import webdriver
import bs4
from bs4 import BeautifulSoup
import time


def extractor(url,driver,wait_time):
    """
    This method accepts a url and stores its html code before being parsed by BeautifulSoup. 
    The title, abstract, body, and doi of the article are then extracted and stored in a list.
    """
    driver = webdriver.Chrome()
    driver.get(url)
    time.sleep(wait_time) # important

    html_doc = driver.page_source # stores the source HTML code in the driver's page_source attribute
    soup = BeautifulSoup(html_doc, 'html.parser')

    title = soup.find('h2', {'class': "citation__title"}).text
    abstract = soup.find('div', {'class': "article-section__content en main"}).text

    try:
        doi = soup.find('a', {'class': "epub-doi"}).text
    except:
        print("Oops, I was unable to extract the DOI.")
        doi = None

    try:
        body = soup.find('div', {'class': "article-section__content"}).text
    except:
        print("oops, I was unable to extract the body of the article.")
        body = None

    lst = [title,abstract,body,doi]
    return lst

def parse_wrapper(max_iters,driver,data,file):
    """
    The following method is designed to automatically parse each url contained in a long list 
    of scraped urls, and writes the title, abstract, and doi to a new text file with a user
    input "file_name.txt."
    
    Arguments:
    max_iters - total number of scraped urls to be parsed
    driver - desired webdriver
    data - text file containing a list of the scraped urls
    file - the new text file given by the user input
    """
    for i in range(0,max_iters):
        print('On url ',i)
        driver.refresh()
        time.sleep(2)
        urli = str(extractor(data.iloc[i,0],driver,3))
        file.write(urli)
        file.write('\n')
    
data = pd.read_csv('wiley_scrape.txt',header=None,names=['url']) # 'wiley_scrape.txt' is the local file containing a list of the scraped urls

max_iters = len(data)
print("The parser will parse: " + str(max_iters) + " urls.")

driver = webdriver.Chrome()
file_name = input("Input the file name with .txt extension you wish to store extracted data in: ")
file = open(file_name,'w')

parse_wrapper(max_iters,driver,data,file)

driver.quit()