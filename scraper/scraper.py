import psycopg2
from bs4 import BeautifulSoup
from selenium import webdriver
import time


SEED_URL = 'https://www.sreality.cz/en/search/for-sale/apartments'


def scrape_site(cursor):
  options = webdriver.ChromeOptions()
  options.headless = True
  options.add_argument('--disable-browser-side-navigation')
  browser = webdriver.Chrome(chrome_options=options, executable_path='./chromedriver.exe')

  curr_page = 1
  count = 0

  while count < 500:
    # Get the source code for the current page
    browser.get(f"{SEED_URL}?page={curr_page}")
    time.sleep(5)
    soup = BeautifulSoup(browser.page_source, "lxml")
    print(f"Scraping {SEED_URL}?page={curr_page}", end = "; ")
    curr_page += 1

    # Get all apartments and process them
    apartment_divs = soup.find_all("div", class_="property")
    print(f"found {len(apartment_divs)} apartments on this page")
    for apartment_div in apartment_divs:
      link = apartment_div.find_all("a", class_="title", limit=1)[0]["href"] # Apartment link
      title = apartment_div.find_all("span", class_="name", limit=1)[0].text # Apartment title
      location = apartment_div.find_all("span", class_="locality", limit=1)[0].text # Apartment location
      price = apartment_div.find_all("span", class_="norm-price", limit=1)[0].text # Apartment price

      # Insert current apartment into DB
      cursor.execute("""INSERT INTO apartments (id, link, title, location, price) 
                      VALUES (%s, %s, %s, %s, %s)""", (count, link, title, location, price))


      image_links = []
      # Get all link elements from preact > div > div and process them
      image_elements = apartment_div.find_all("preact", limit=1)[0].find_all("div", limit=1, recursive=False)[0] \
      .find_all("div", limit=1, recursive=False)[0].find_all("a", recursive=False)
      for image_element in image_elements:
        # Get image source from image
        image_link = image_element.find_all("img", limit=1)[0]["src"] # Image link
        image_links.append(image_link)
        # Insert each image into DB
        cursor.execute("INSERT INTO apartment_images (apartment_id, link) VALUES (%s, %s)", (count, image_link))

      count += 1

if __name__ == "__main__":
  # Establish connection
  conn = psycopg2.connect(
    database="mcltypct",
    user='mcltypct',
    password='5JvaPQTf4pTkND1gqkvNAqjSn_zWsNAA',
    host='hattie.db.elephantsql.com',
    port= '5432'
  )
  conn.autocommit = True
  cursor = conn.cursor()

  cursor.execute(open("apartments.sql", "r").read()) # Init DB

  conn.commit()

  scrape_site(cursor) # Start scraping the site

  cursor.close() # Close cursor
  conn.close() # Close connection
