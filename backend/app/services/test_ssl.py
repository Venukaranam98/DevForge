import urllib.request

url = "https://generativelanguage.googleapis.com/v1beta/models"

try:
    with urllib.request.urlopen(url) as r:
        print(r.status)
        print(r.read()[:100])
except Exception as e:
    print(e)