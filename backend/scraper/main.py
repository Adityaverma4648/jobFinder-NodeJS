import requests
from bs4 import BeautifulSoup

r = requests.get(
    'https://internshala.com/internships/work-from-home-internships/')

# Parsing the HTML
soup = BeautifulSoup(r.content, 'html.parser')
s = soup.find('div', id='internship_list_container')
leftbar = s.find_all('div', class_='individual_internship')

for profile in leftbar:
    company_URL = profile.find('div', class_='profile')
