import csv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

# Setup headless browser
options = Options()
options.headless = True
driver = webdriver.Chrome(options=options)

# Open the Flipkart product review page
driver.get("https://www.flipkart.com/boult-zen-enc-mic-40h-battery-life-low-latency-gaming-made-india-5-3v-bluetooth/product-reviews/itm42ba3da4c8d78")
driver.implicitly_wait(5)

# Parse page source
soup = BeautifulSoup(driver.page_source, 'html.parser')
driver.quit()

# Extract name, rating, review
names = soup.find_all('p', {'class': '_2NsDsF AwS1CA'})
ratings = soup.find_all('div', {'class': 'XQDdHH Ga3i8K'})
reviews = soup.find_all('div', {'class': 'ZmyHeo'})

# Save to CSV
with open('reviews.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Rating', 'Review'])
    for name, rating, review in zip(names, ratings, reviews):
        writer.writerow([name.text, rating.text, review.text])
