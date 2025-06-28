# CPAN 212 - Lab 3: Image Upload & Gallery Application

## 🎯 Project Overview
A modern web application built with Express.js and React that allows users to upload multiple images, display random images from the server, and fetch/upload random dog images from an external API.

## ✨ Features Implemented

### ✅ Express.js Server Features
- **Multiple Image Upload**: Route to handle uploading multiple images using Multer
- **Random Images API**: Endpoint that returns up to 3 random images using Lodash sampleSize
- **Dog Image Upload**: Route to download and save dog images from external API
- **Static File Serving**: Serves uploaded images from the uploads directory
- **CORS Support**: Enables cross-origin requests from React client

### ✅ React Client Features
- **Multiple File Upload Form**: Interface to select and upload multiple images
- **Random Images Gallery**: Displays random images fetched from server in a beautiful grid
- **Dog Image Fetcher**: Gets random dog images from https://dog.ceo/api/breeds/image/random
- **Dog Image Upload**: Uploads fetched dog images to the Express server
- **Modern Responsive Design**: Beautiful gradient background with card-based layout
- **Status Messages**: User feedback for all operations

### ✅ Styling & UX
- **Custom CSS Design**: Replaced default Vite styling with modern gradient design
- **Responsive Layout**: Works on desktop and mobile devices
- **Interactive Elements**: Hover effects, smooth transitions, and visual feedback
- **Icon Integration**: Emoji icons for better visual appeal
- **Error Handling**: Graceful error handling with user-friendly messages

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd labs/lab3
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Express Server**
   ```bash
   cd server
   node index.js
   ```
   Server will run on http://localhost:8000

2. **Start the React Client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Client will run on http://localhost:5173 or http://localhost:5174

## 📁 Project Structure

```
lab3/
├── server/
│   ├── index.js          # Express server with all routes
│   ├── package.json      # Server dependencies
│   └── uploads/          # Directory for uploaded images
├── client/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── index.css     # Custom modern styling
│   │   └── main.jsx      # React entry point
│   ├── package.json      # Client dependencies
│   └── index.html        # HTML template
└── README.md            # This file
```

## 🛠 Technologies Used

### Backend
- **Express.js**: Web framework for Node.js
- **Multer**: Middleware for handling multipart/form-data (file uploads)
- **Lodash**: Utility library (used sampleSize for random image selection)
- **Axios**: HTTP client for downloading dog images
- **CORS**: Cross-Origin Resource Sharing middleware

### Frontend
- **React**: UI library with hooks (useState)
- **Vite**: Build tool and development server
- **Custom CSS**: Modern gradient design with responsive layout

## 📋 API Endpoints

### Server Endpoints
- `GET /test` - Test endpoint to verify server is running
- `POST /upload-multiple` - Upload multiple images (accepts form-data with 'images' field)
- `GET /random-images` - Get up to 3 random images from uploads directory
- `POST /upload-dog-image` - Upload dog image from URL (accepts JSON with 'imageUrl' field)
- `GET /uploads/:filename` - Serve static uploaded images

### External API Used
- `GET https://dog.ceo/api/breeds/image/random` - Fetch random dog image

## 🎨 Design Features

- **Gradient Background**: Beautiful purple-blue gradient
- **Card-based Layout**: Each section in its own styled card
- **Responsive Grid**: Image gallery adapts to screen size
- **Hover Effects**: Interactive elements with smooth transitions
- **Status Feedback**: Color-coded success/error messages
- **Modern Typography**: Inter font family for clean appearance

## 📸 Screenshots

The application includes:
1. **Multiple Image Upload Section**: File input with upload button
2. **Random Images Gallery**: Grid display of server images
3. **Dog Image Section**: Fetch and upload random dog images

## 🏆 Lab Requirements Completed

✅ Express.js application with organized, modular structure  
✅ React client with modern styling (removed default index.css as suggested)  
✅ Route to handle uploading multiple images to server  
✅ React component to handle uploading multiple images  
✅ Route to get multiple random images using Lodash sampleSize (limited to 3)  
✅ Display multiple random images in React  
✅ Button to get random dog image from dog.ceo API  
✅ Upload random dog image to Express server  
✅ Attractive styling and responsive design  

## 📝 Notes

- The uploads directory is created automatically when first image is uploaded
- Images are stored with unique timestamps to prevent naming conflicts
- File size limit is set to 5MB per image
- Only image files are accepted (jpg, jpeg, png, gif, webp)
- CORS is enabled for cross-origin requests between client and server
