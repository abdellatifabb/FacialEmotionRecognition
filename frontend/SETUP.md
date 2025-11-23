# Quick Setup Guide

## 1. Install Dependencies

```bash
cd frontend
npm install
```

## 2. Start the Backend API

In a separate terminal, from the project root:

```bash
# Make sure you're in the api directory
cd api

# Run the FastAPI server (make sure you have all requirements installed)
uvicorn predictEmotions:app --reload
```

The API will run on `http://localhost:8000`

## 3. Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## 4. Test the App

1. Open your browser to `http://localhost:3000`
2. Upload an image with a face
3. See the emotion prediction with emoji and confidence level!

## Troubleshooting

### CORS Errors
- Make sure the backend is running on port 8000
- The CORS middleware has been configured to allow requests from localhost:3000

### Module Not Found
- Run `npm install` in the frontend directory

### API Connection Failed
- Verify the backend is running: `curl http://localhost:8000/docs`
- Check the console for specific error messages
