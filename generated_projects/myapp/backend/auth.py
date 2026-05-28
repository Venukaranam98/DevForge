from fastapi import APIRouter

router = APIRouter()


@router.post("/login")

def login():

    return {

        "success": True,

        "message": "Login API"
    }