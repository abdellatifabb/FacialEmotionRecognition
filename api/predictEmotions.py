import io
import numpy as np
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from tensorflow import keras

IMG_SIZE = 224 
class_names = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]

# --------- Load model once at startup ----------
model = keras.models.load_model("mobilenetv2_emotion.keras")

app = FastAPI(title="Emotion Recognition API")

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def predict_emotion_from_bytes(image_bytes: bytes):
    # Load image from bytes
    img = keras.utils.load_img(
        io.BytesIO(image_bytes),
        target_size=(IMG_SIZE, IMG_SIZE)
    )
    img_array = keras.utils.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) 

    preds = model.predict(img_array)
    pred_idx = int(np.argmax(preds[0]))
    confidence = float(preds[0][pred_idx])

    return class_names[pred_idx], confidence


# --------- API endpoint ----------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Send an image file and get back predicted emotion + confidence.
    """
    # Read file content
    image_bytes = await file.read()

    try:
        label, conf = predict_emotion_from_bytes(image_bytes)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"error": f"Could not process image: {str(e)}"},
        )

    return {"label": label, "confidence": conf}
