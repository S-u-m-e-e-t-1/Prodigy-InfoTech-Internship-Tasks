import requests
from bs4 import BeautifulSoup
import csv

# URL of the e-commerce website (Flipkart search results page)
URL = "https://www.flipkart.com/search?q=laptop"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept-Language": "en-US, en;q=0.5",
}

def get_product_data(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        print("Failed to retrieve the page")
        return []
    
    soup = BeautifulSoup(response.text, "html.parser")
    products = []
    
    for product in soup.find_all("div", class_="tUxRFH"):
        name_tag = product.find("div", class_="KzDlHZ")
        price_tag = product.find("div", class_="Nx9bqj _4b5DiR")
        rating_tag = product.find("div", class_="XQDdHH")
        
        if name_tag and price_tag:
            name = name_tag.text.strip()
            price = price_tag.text.strip()
            rating = rating_tag.text.strip() if rating_tag else "No rating"
            products.append([name, price, rating])
    
    return products

# Get product data
data = get_product_data(URL)

# Save to CSV
if data:
    with open("products.csv", "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Product Name", "Price", "Rating"])
        writer.writerows(data)
    print("Data saved to products.csv")
else:
    print("No data found.")
