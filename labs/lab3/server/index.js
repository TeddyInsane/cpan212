const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const _ = require("lodash");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Route to upload multiple images
app.post("/upload-multiple", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      url: `http://localhost:${PORT}/uploads/${file.filename}`
    }));

    res.json({
      message: `Successfully uploaded ${req.files.length} image(s)`,
      files: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Route to get multiple random images (up to 3)
app.get("/random-images", (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, "uploads");

    if (!fs.existsSync(uploadsDir)) {
      return res.json([]);
    }

    const files = fs.readdirSync(uploadsDir).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    if (files.length === 0) {
      return res.json([]);
    }

    // Use lodash sampleSize to get up to 3 random images
    const randomFiles = _.sampleSize(files, Math.min(3, files.length));
    const imageUrls = randomFiles.map(file => `http://localhost:${PORT}/uploads/${file}`);

    res.json(imageUrls);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch random images", error: error.message });
  }
});

// Route to upload dog image from URL
app.post("/upload-dog-image", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    // Download the image from the URL
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream'
    });

    // Generate unique filename for the dog image
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `dog-${uniqueSuffix}.jpg`;
    const filepath = path.join(__dirname, "uploads", filename);

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save the image to the uploads directory
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    writer.on('finish', () => {
      res.json({
        message: "Dog image uploaded successfully",
        filename: filename,
        url: `http://localhost:${PORT}/uploads/${filename}`
      });
    });

    writer.on('error', (error) => {
      res.status(500).json({ message: "Failed to save dog image", error: error.message });
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to upload dog image", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
