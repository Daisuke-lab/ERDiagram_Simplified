import openai
import os
import sys
from dotenv import load_dotenv
load_dotenv()
print(os.environ.get("OPENAI_API_KEY"))
openai.api_key = os.environ.get("OPENAI_API_KEY")

def generate_chatgpt_response(prompt):
    """
    Sends a prompt to the ChatGPT API and returns the response.
    """
    try:
        answer = openai.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {"role": "system", "content": prompt},
            ],
        )
        for i, answer in enumerate(answer.choices):
            print(f"MESSAGE {i}:", answer.message.content)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        generate_chatgpt_response(user_input)