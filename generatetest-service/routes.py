from fastapi import APIRouter
from schemas import GPTRequest
from openai_client import generate_test

router = APIRouter()
@router.post("/generate")
def ask_gpt(data: GPTRequest):
    try:
        result = generate_test(data.message)
        return {"response": result}
    except Exception as e:
        return {"error": str(e)}