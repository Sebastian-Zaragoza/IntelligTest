from fastapi import FastAPI, UploadFile, File
import shutil
from vision_api import extract_text_from_image
import os

app = FastAPI()
@app.post("/extract")
async def extract_notes(file: UploadFile = File(...)):
    upload_path = f"uploads/{file.filename}"
    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    extracted_lines = extract_text_from_image(upload_path)
    os.remove(upload_path)
    return {"notes":extracted_lines}