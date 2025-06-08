import os
import io
from google.cloud import vision
from google.oauth2 import service_account
from dotenv import load_dotenv

load_dotenv()
credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
credentials = service_account.Credentials.from_service_account_file(credentials_path)
client = vision.ImageAnnotatorClient(credentials=credentials)

def extract_text_from_image(image_path: str)->str:
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations
    if not texts:
        return " "
    clean_text = texts[0].description.strip().replace("\n", " ")
    if clean_text.endswith(" 0"):
        clean_text = clean_text[:-2].strip()
    return clean_text

