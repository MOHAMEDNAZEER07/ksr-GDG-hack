import io
import os
from flask import Flask,request,jsonify
from flask_cors import CORS
import numpy as np
from io import BytesIO
import base64
from PIL import Image
# for model
from torchvision import transforms # type: ignore
import torchvision.transforms # type: ignore
import timm # type: ignore
import torch # type: ignore
import torch.nn as nn # type: ignore
from typing import List, Tuple
#mongodb
from pymongo import MongoClient # type: ignore
#rag
from PyPDF2 import PdfReader #type: ignore
#rag image
import fitz  # type: ignore # PyMuPDF


app=Flask(__name__)
CORS(app,origins=['*'],methods=['POST','GET'],headers=['Content-Type'])

#device(GPU)
device = 'cuda' if torch.cuda.is_available() else 'cpu'


#mongodb
mongourl = "mongodb+srv://nmdharineesh2004:mongodb123@cluster0.1ebq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
try:
    client = MongoClient(mongourl)
    db = client.get_database('herbal_app')
    herb_collection = db['herbs']
    test_doc = herb_collection.find_one()
    if test_doc:
        print("Successfully connected to MongoDB.")
    else:
        print("Connected to MongoDB, but the collection is empty.")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    

#routing,api
@app.route('/')
def home():
    return 'Welcome to the backend server of herbal identifier'

# from transformers import AutoTokenizer, AutoModelForCausalLM # type: ignore

# path = "./model"  # Specify the local path here
# try:
#     crop_tokenizer = AutoTokenizer.from_pretrained(path)
#     crop_model = AutoModelForCausalLM.from_pretrained(path)
#     crop_model.to(device)  # Move model to the appropriate device (CPU or CUDA)
#     print("Model and tokenizer loaded successfully from local path.")
# except Exception as e:
#     print(f"Error loading model or tokenizer: {e}")

# @app.route('/crops', methods=['POST'])
# def crops():
#     data = request.get_json()
#     print("Received data:", data)  

#     if not data or 'message' not in data:
#         return jsonify({"error": "Invalid input"}), 400

#     query = data.get('message', '')
#     print("Received query:", query)  

#     if not query:
#         return jsonify({"error": "Empty query"}), 400

#     # Tokenize input query
#     inputs = crop_tokenizer(query, return_tensors="pt", max_length=128, truncation=True)
#     print("Tokenized inputs:", inputs) 
    
#     with torch.no_grad():
#         # Generate output with specified parameters
#         outputs = crop_model.generate(inputs["input_ids"], max_new_tokens=100, num_return_sequences=1)
#         print("Raw outputs:", outputs)  
    
#     # Decode the output
#     answer = crop_tokenizer.decode(outputs[0], skip_special_tokens=True)
#     print("Decoded answer:", answer)  
    
#     return jsonify({"response": answer}), 200


from gradio_client import Client # type: ignore
# Initialize Gradio client with your Gradio endpoint
client = Client("https://22b85c0820bed6ec18.gradio.live/")


@app.route('/crops', methods=['POST'])
def crops():
    data = request.get_json()
    print("Received data:", data)

    if not data or 'message' not in data:
        return jsonify({"error": "Invalid input"}), 400

    query = data.get('message', '')
    print("Received query:", query)

    if not query:
        return jsonify({"error": "Empty query"}), 400

    try:
        # Use Gradio API to get the prediction
        result = client.predict(input_text=query, api_name="/predict")
        print("Gradio API response:", result)
        
        return jsonify({"response": result}), 200

    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({"error": "An error occurred during prediction"}), 500
    
if __name__ == '__main__':
    app.run(debug=True ,host='0.0.0.0')