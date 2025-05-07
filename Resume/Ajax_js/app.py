from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

# Setup headless browser
options = Options()
options.headless = True
driver = webdriver.Chrome(options=options)

# Open URL
driver.get("https://www.flipkart.com/boult-zen-enc-mic-40h-battery-life-low-latency-gaming-made-india-5-3v-bluetooth/product-reviews/itm42ba3da4c8d78")
driver.implicitly_wait(5)

# Parse content
soup = BeautifulSoup(driver.page_source, 'html.parser')
driver.quit()

# Extract data
names = soup.find_all('p', {'class': '_2NsDsF AwS1CA'})
ratings = soup.find_all('div', {'class': 'XQDdHH Ga3i8K'})
reviews = soup.find_all('div', {'class': 'ZmyHeo'})

# Display all together
for name, rating, review in zip(names, ratings, reviews):
    print(f"Name: {name.get_text()}")
    print(f"Rating: {rating.get_text()}")
    print(f"Review: {review.get_text()}\n")
