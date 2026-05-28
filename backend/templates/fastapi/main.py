from fastapi import FastAPI

app = FastAPI()


@app.get("/")

def home():

    return {

        "success": True,

        "message": "FastAPI Backend Running",

        "data": None

    }