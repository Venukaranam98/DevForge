from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import FileResponse

from pydantic import BaseModel

from generator import create_project

import json


app = FastAPI()


# CORS

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


# REQUEST SCHEMA

class ProjectSchema(BaseModel):

    project_name: str

    frontend: str

    backend: str

    database: str

    project_type: str


# HOME ROUTE

@app.get("/")

def home():

    return {

        "success": True,

        "message": "DevForge Backend Running",

        "data": None

    }


# GENERATE PROJECT ROUTE

@app.post("/generate")

def generate_project(project: ProjectSchema):

    zip_path = create_project(

        project.project_name,

        project.frontend,

        project.backend,

        project.database,

        project.project_type

    )

    return FileResponse(

        path=zip_path,

        filename=f"{project.project_name}.zip",

        media_type="application/zip"

    )


@app.get("/history")

def get_history():

    with open("history.json", "r") as file:

        history = json.load(file)

    return {

        "success": True,

        "message": "Project history fetched",

        "data": history

    }