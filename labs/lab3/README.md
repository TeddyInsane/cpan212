# CPAN 212 - Lab 3: Image Upload & Gallery Application

## 🎯 Project Overview
A modern web application built with Express.js and React that allows users to upload multiple images, display random images from the server, and fetch/upload random dog images from an external API.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

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
