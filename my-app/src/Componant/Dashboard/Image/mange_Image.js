import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import Dropzone from "./Dropzone";
import DialogCom from "./Dialog";

const ImageUpload = () => {
  const [sliderPhoto, setSliderPhoto] = useState([]);
  const [GalleryPhoto, setGalleryPhoto] = useState([]);
  const [storedPhotos, setStoredPhotos] = useState([]);
  const [getStoredPhotos, setGetStoredPhotos] = useState([]);
  const [getGalleryPhoto, setGetGalleryPhoto] = useState([]);
  const [getSlider, setGetSlider] = useState([]);
  const [openGallery, setOpenGallery] = useState(false);
  const [logos, setLogos] = useState([]);
  const [getLogos, setGetLogos] = useState([]);
  const [indicator, setIndicator] = useState(false);
  const [refetch, setRefetch] = useState(0);

  const handleDrop = (category, files) => {
    if (category === "slider") setSliderPhoto((prev) => [...prev, ...files]);
    else if (category === "GalleryPhoto") setGalleryPhoto((prev) => [...prev, ...files]);
    else if (category === "StoredPhotos") setStoredPhotos((prev) => [...prev, ...files]);
    else if (category === "Logos") setLogos((prev) => [...prev, ...files]);
  };

  const handleUpload = async () => {
    setIndicator(true)
    const formData = new FormData();

    sliderPhoto.forEach((file) => formData.append("slider", file));
    GalleryPhoto.forEach((file) => formData.append("GalleryPhoto", file));
    storedPhotos.forEach((file) => formData.append("StoredPhotos", file));
    logos.forEach((file) => formData.append("Logos", file));

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRefetch((prev) => !prev)
      setIndicator(false)
      console.log("Upload success:", response.data);
    } catch (error) {
      setIndicator(false)
      console.error("Error uploading images:", error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");
        setGetStoredPhotos(response.data?.[0].StoredPhotos || []);
        setGetGalleryPhoto(response.data?.[0].GalleryPhoto || []);
        setGetSlider(response.data?.[0].slider || []);
        setGetLogos(response.data?.[0].Logos || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [refetch]);

  return (
    <>
    {indicator && (
      <div className="indicator">
          <div className="OverLayer"></div>
          <span className="loader"></span>
      </div>
  )}
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        Upload Images
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Dropzone category="slider" onDrop={handleDrop} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Dropzone category="GalleryPhoto" onDrop={handleDrop} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Dropzone category="StoredPhotos" onDrop={handleDrop} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Dropzone category="Logos" onDrop={handleDrop} />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button sx={{backgroundColor :'var(--primary-bg)', mr: 2}} variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
        <Button sx={{color: 'var(--primary-bg)', borderBlockColor :'var(--border-color)'}} variant="outlined" color="secondary" onClick={() => setOpenGallery(true)}>
          Open Gallery
        </Button>
      </Box>
    
    <DialogCom 
    setRefetch={setRefetch}
    openGallery={openGallery} 
    setOpenGallery={setOpenGallery} 
    GetLogos={getLogos} 
    setGetLogos={setGetLogos} 
    getSlider={getSlider} 
    setGetSlider={setGetSlider} 
    getStoredPhotos={getStoredPhotos} 
    setGetStoredPhotos={setGetStoredPhotos} 
    getGalleryPhoto={getGalleryPhoto} 
    setGetGalleryPhoto={setGetGalleryPhoto} />
    </Box>
    </>
  );
};

export default ImageUpload;
