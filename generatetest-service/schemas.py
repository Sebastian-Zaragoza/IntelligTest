from pydantic import BaseModel

class GPTRequest(BaseModel):
    message: str
