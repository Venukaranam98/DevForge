import requests

API_KEY = "PASTE_YOUR_EXACT_API_KEY"

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={API_KEY}"

r = requests.get(url)

print("Status:", r.status_code)
print(r.text)