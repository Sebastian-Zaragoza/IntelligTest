import os
from openai import OpenAI
from dotenv import load_dotenv
from prompt_template import SYSTEM_PROMPT

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def parse_feedback(response_text: str):
    items = response_text.strip().split("/")
    score = items[-1]
    feedback = {"score": score}
    for i in range(0, len(items)-1):
        feedback[f"feedback_{i+1}"] = items[i]
    return feedback


def format_for_grading(data):
    output = f"{data.strict_mode}\n"
    for item in data.questions:
        output += f"Question: {item.question}\n"
        output += f"Correct Answer: {item.answer}\n"
        output += f"User Answer: {item.user_answer}\n\n"
    return output

def evaluate_test(data):
    formatted = format_for_grading(data)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": formatted}
        ],
        max_tokens=500,
        temperature=0.0
    )
    return parse_feedback(response.choices[0].message.content)
