import numpy as np
import pandas as pd
import selenium
from selenium import webdriver
import bs4
from bs4 import BeautifulSoup
import time

""" This code is used to scrape Springer Nature of publication URLs and write them to
    a text file in the current directory for later use.

    To use this code, go to link.springer.com and click 'advanced search.' Then, un-check
    the box next to 'Include Preview-Only content' before searching.
    Then, copy the URL and paste it into the terminal when prompted for user input.

"""

def scrape_page(driver):
    """ This method finds all hrefs on the webpage. """
    elements = driver.find_elements_by_xpath("//a[@href]") # finds hyperlinks that contain hrefs and stores in variable "elements"
    return elements

def href_filter(elements):
    """ 
    This method takes a list of scraped selenium web elements and returns only the
    hrefs that lead to publications.
    """
    clean_list = []
    
    for elems in elements:
        url = elements.get_attribute("href")
        if 'article' in url and 'pdf' not in url\
                            and 'chapter' not in url\
                            and 'search' not in url\
                            and 'full' not in url\
                            and 'abs' not in url\
                            and 'show=' not in url:
            clean_list.append(url)
    return clean_list

html_links = []
while counter <= 10:
    time.sleep(6)

    counter += 1
    pgs = driver.find_elements_by_class_name("next")
    nxt_page = str(pgs[pg_counter].get_attribute('href'))
    driver.get(nxt_page)
    elements = scrape_page(driver)
    html_links.append(href_filter(elements))
    pg_counter += 1
    print('Size HTML list:  ', len(html_links))

return html_links

def scrape_all(first_url,driver,year):
    """ 
    This method takes the first Springer Nature url and navigates through all 60 pages
    of listed publications, scraping each url on each page for a given year. It then 
    returns a list of the urls.
    """
    urls = []
    for page in html_links:                         
        driver.get(page)
        time.sleep(1) # Necessary to allow the page to load
        elements = scrape_page(driver)
        links = href_filter(elements)
        if len(links) < 2:
            break
        for link in links:
            urls.append(links)
    
    return urls

file = open('html_list.txt','w')
html_links = href_filter(elements)
for link in html_links:
    if type(link) is str:
        file.write(link)
        file.write('\n')

driver.quit()