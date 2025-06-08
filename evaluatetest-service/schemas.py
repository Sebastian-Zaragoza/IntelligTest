from pydantic import BaseModel
from typing import List

class QuestionItem(BaseModel):
    question: str
    answer: str
    user_answer: str

class GPTEvaluateRequest(BaseModel):
    strict_mode: str
    questions: List[QuestionItem]