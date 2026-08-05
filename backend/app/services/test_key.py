from google import genai

API_KEY = "PASTE_THE_EXACT_KEY_YOU_COPIED"

client = genai.Client(api_key=API_KEY)

print("Connected!")

for model in client.models.list():
    print(model.name)