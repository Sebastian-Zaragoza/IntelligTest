import os
from openai import OpenAI
from dotenv import load_dotenv
from prompt_template import SYSTEM_PROMPT

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def parse_questions_answers(response_text: str):
    qas = []
    paragraphs = response_text.split("\n")
    for para in paragraphs:
        text = para.strip()
        if not text:
            continue
        question, answer = text.split("/", 1)  # solo una vez
        qas.append({
            "question": question.strip(),
            "answer": answer.strip()
        })
    return qas


def generate_test(user_input: str):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_input}
        ],
        max_tokens=500,
        temperature=0.0
    )
    return parse_questions_answers(response.choices[0].message.content)
