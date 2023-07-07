# Note: you need to be using OpenAI Python v0.27.0 for the code below to work
import openai
import os
import sys

openai.api_key = os.getenv("OPENAI_API_KEY")

audio_file_path = sys.argv[0]
audio_file= open(audio_file_path, "rb")
transcript = openai.Audio.transcribe("whisper-1", audio_file)

response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{
            "role": "user",
            "content": transcript.text
        }]
)

print(response)
