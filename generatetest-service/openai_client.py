import os
from openai import OpenAI
from dotenv import load_dotenv
from prompt_template import SYSTEM_PROMPT

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def parse_questions_answers(response_text: str):
    items = response_text.strip().split("/")
    questions_answers = []
    for i in range(0, len(items), 2):
        question = items[i].strip()
        answer = items[i+1].strip()
        questions_answers.append({
            "question": question,
            "answer": answer
        })
    return questions_answers

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
