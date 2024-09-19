from transformers import T5Tokenizer, T5ForConditionalGeneration
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

class Request(BaseModel):
    user_message: str

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.post("/predict")
def make_prediction(request: Request):
    
    tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
    model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")

    input_text = request.user_message
    input_ids = tokenizer(input_text, return_tensors = "pt").input_ids

    outputs = model.generate(input_ids, 
                             max_length = 250, 
                             temperature = 0.4, 
                             top_k = 50, 
                             top_p = 0.9)
    result = tokenizer.decode(outputs[0])
    result = result.replace("<pad>", "").replace("</s>", "").strip()
    return {"success": True, "prediction": result, "request": input_text}