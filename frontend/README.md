# Emotion Recognition Frontend

A beautiful Next.js application for detecting facial emotions using AI.

## Features

- 🎨 Modern, responsive UI with TailwindCSS
- 📸 Drag & drop image upload
- 😊 Emotion detection with emojis (Angry, Happy, Sad, Surprise, Fear, Disgust, Neutral)
- 📊 Confidence level displayed as animated progress bar
- ⚡ Real-time predictions using FastAPI backend

## Prerequisites

- Node.js 18+ and npm
- Running FastAPI backend (see api folder)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Make sure your FastAPI backend is running on `http://localhost:8000`
2. Upload an image by clicking the upload area or dragging and dropping
3. View the detected emotion with emoji and confidence level

## API Configuration

The app connects to the FastAPI backend at `http://localhost:8000/predict`. If your API runs on a different port or URL, update line 52 in `app/page.tsx`:

```typescript
const response = await fetch('http://localhost:8000/predict', {
```

## Build for Production

```bash
npm run build
npm start
```

## Technology Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- Lucide Icons
