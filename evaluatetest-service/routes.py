from fastapi import APIRouter
from schemas import GPTEvaluateRequest
from openai_client import evaluate_test
from typing import List

router = APIRouter()

@router.post("/evaluate")
def evaluate_gpt(data: GPTEvaluateRequest):
    try:
        result = evaluate_test(data)
        return {"response": result}
    except Exception as e:
        return {"error": str(e)}
