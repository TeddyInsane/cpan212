import { useState } from "react";

const SERVER_URL = "http://localhost:8000";

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [dogImageUrl, setDogImageUrl] = useState("");
  const [dogUploadStatus, setDogUploadStatus] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  // Handle multiple file selection
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Upload multiple selected files
  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files first");
      return;
    }
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("images", file);
    }
    try {
      const res = await fetch(`${SERVER_URL}/upload-multiple`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setUploadStatus(data.message || "Upload completed");
    } catch (err) {
      setUploadStatus("Upload failed");
    }
  };

  // Fetch multiple random images from server
  const getRandomImages = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/random-images`);
      const data = await res.json();
      setRandomImages(data);
    } catch (err) {
      alert("Failed to fetch random images");
    }
  };

  // Fetch random dog image from external API
  const getRandomDogImage = async () => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      setDogImageUrl(data.message);
      setDogUploadStatus("");
    } catch (err) {
      alert("Failed to fetch dog image");
    }
  };

  // Upload dog image URL to server
  const uploadDogImage = async () => {
    if (!dogImageUrl) {
      alert("No dog image to upload");
      return;
    }
    try {
      const res = await fetch(`${SERVER_URL}/upload-dog-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: dogImageUrl }),
      });
      const data = await res.json();
      setDogUploadStatus(data.message || "Dog image uploaded");
      // Optionally refresh random images after upload
      getRandomImages();
    } catch (err) {
      setDogUploadStatus("Failed to upload dog image");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🖼️ Image Upload & Gallery</h1>
        <p className="app-subtitle">Upload, manage, and display beautiful images with ease</p>
      </header>

      <div className="app-content">
        {/* Upload multiple images */}
        <section className="section">
          <h3 className="section-title">📤 Upload Multiple Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            placeholder="Choose multiple images..."
          />
          <button onClick={uploadFiles} className="btn btn-primary">
            <span>📁</span> Upload Selected Images
          </button>
          {uploadStatus && (
            <div className={`status-message ${uploadStatus.includes('failed') || uploadStatus.includes('error') ? 'status-error' : 'status-success'}`}>
              {uploadStatus}
            </div>
          )}
        </section>

        {/* Get random images from server */}
        <section className="section">
          <h3 className="section-title">🎲 Random Images Gallery</h3>
          <button onClick={getRandomImages} className="btn btn-success">
            <span>🔄</span> Fetch Random Images
          </button>
          {randomImages.length > 0 && (
            <div className="image-gallery">
              {randomImages.map((url, idx) => (
                <div key={idx} className="image-card">
                  <img
                    src={url}
                    alt={`Random upload ${idx + 1}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {randomImages.length === 0 && (
            <div className="status-message status-info" style={{ marginTop: '1rem' }}>
              No images available. Upload some images first!
            </div>
          )}
        </section>

        {/* Get random dog image */}
        <section className="section">
          <h3 className="section-title">🐕 Random Dog Image</h3>
          <button onClick={getRandomDogImage} className="btn btn-info">
            <span>🎯</span> Fetch Random Dog Image
          </button>
          {dogImageUrl && (
            <div className="dog-image-container">
              <img
                src={dogImageUrl}
                alt="Random Dog"
                className="dog-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <br />
              <button onClick={uploadDogImage} className="btn btn-warning">
                <span>⬆️</span> Upload Dog Image to Server
              </button>
              {dogUploadStatus && (
                <div className={`status-message ${dogUploadStatus.includes('failed') || dogUploadStatus.includes('error') ? 'status-error' : 'status-success'}`}>
                  {dogUploadStatus}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
