import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const DialogCom = ({
  setRefetch,
  setGetLogos,
  GetLogos,
  openGallery,
  setOpenGallery,
  getSlider,
  getStoredPhotos,
  getGalleryPhoto,
  setGetSlider,
  setGetStoredPhotos,
  setGetGalleryPhoto,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [indicator, setIndicator] = useState(false);

  const toggleImageStatus = async (category, imageUrl) => {
    setLoading(true);
    try {
      const response = await axios.patch("http://localhost:5000/toggle-photo-status", {
        category,
        url: imageUrl,
      });
  
      if (!response.data.success) {
        throw new Error("Failed to toggle status");
      }
  
      const updatedImages = response.data.updatedImages; // Get the latest data from backend
  
      console.log("Updated Images:", updatedImages); // Debugging
  
      // Function to update state
      const updateState = (setter, singleActive) => {
        if (singleActive) {
          // Ensure only one image is active
          setter(updatedImages.map(img => ({
            ...img,
            isActive: img.url === imageUrl, // Only the clicked image becomes active
          })));
        } else {
          setter(updatedImages); // Multiple active allowed
        }
      };
  
      if (category === "GalleryPhoto") updateState(setGetGalleryPhoto, true);
      else if (category === "Logos") updateState(setGetLogos, true);
      else if (category === "slider") updateState(setGetSlider, false);
      else if (category === "StoredPhotos") updateState(setGetStoredPhotos, false);
    } catch (error) {
      console.error("Failed to toggle image status:", error);
    } finally {
      setLoading(false);
    }
  };  

  const handleDeleteImage = (category, imageUrl) => {
    setConfirmDelete({ category, imageUrl, type: "single" });
  };

  const handleDeleteAll = (category) => {
    setConfirmDelete({ category, type: "all" });
  };

  const confirmDeleteAction = async () => {
    setIndicator(true);
    if (!confirmDelete) return;
    const { category, imageUrl, type } = confirmDelete;

    setLoading(true);
    try {
      if (type === "single") {
        await axios.delete("http://localhost:5000/delete-photo", {
          data: { category, url: imageUrl },
        });
        updateUIAfterDelete(category, imageUrl);
      setRefetch((prev) => !prev);
      } else if (type === "all") {
        await axios.delete("http://localhost:5000/delete-category", {
          data: { category },
        });
        updateUIAfterDelete(category, null);
      }
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIndicator(false);
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const updateUIAfterDelete = (category, imageUrl) => {
    const updateState = (setter) => {
      setter((prev) => (imageUrl ? prev.filter((img) => img.url !== imageUrl) : []));
    };

    if (category === "slider") updateState(setGetSlider);
    if (category === "StoredPhotos") updateState(setGetStoredPhotos);
    if (category === "GalleryPhoto") updateState(setGetGalleryPhoto);
    if (category === "Logos") updateState(setGetLogos);
  };

  return (
    <>
    <style>
  {`
    @keyframes vibrate {
      0% {
        transform: rotate(-1deg) translateX(-1px);
      }
      100% {
        transform: rotate(1deg) translateX(1px);
      }
    }
  `}
</style>
      {indicator && (
        <div className="indicator">
          <div className="OverLayer"></div>
          <span className="loader"></span>
        </div>
      )}

      <Dialog open={openGallery} onClose={() => setOpenGallery(false)} fullWidth maxWidth="md">
        <DialogTitle
          sx={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Photo Gallery
          <IconButton sx={{ width: "100px" }} onClick={() => setEditMode(!editMode)} color={editMode ? "error" : "primary"}>
            <EditIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {[
            { title: "Slider Images", images: getSlider, category: "slider" },
            { title: "Stored Photos", images: getStoredPhotos, category: "StoredPhotos" },
            { title: "Gallery Photo", images: getGalleryPhoto, category: "GalleryPhoto" },
            { title: "Logos Photo", images: GetLogos, category: "Logos" },
          ].map(({ title, images, category }) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, display: "flex", justifyContent: "space-between" }}
              >
                {title}
                {images.length > 0 && (
                  <Button
                    sx={{ width: "100px" }}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteAll(category)}
                  >
                    Delete All
                  </Button>
                )}
              </Typography>
              <Grid container spacing={2}>
                {images.length > 0 ? (
                  images.map((img, index) => (
                    <Grid item xs={4} key={index} sx={{ position: "relative" }}>
                      {editMode && (
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            zIndex: 2,
                            
                          }}
                          onClick={() => handleDeleteImage(category, img.url)}
                        >
                          <DeleteIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      )}

                      {img.isActive && (
                        <CheckCircleIcon
                          sx={{
                            position: "absolute",
                            top: 5,
                            left: 5,
                            color: "green",
                            fontSize: 24,
                            zIndex: 3,
                            
                          }}
                        />
                      )}

                      <img
                       onClick={() => toggleImageStatus(category, img.url)}
                        src={img.url}
                        alt={title}
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          boxShadow: editMode ? "0 0 10px red" : "none",
                          border: img.isActive ? "4px solid green" : "none",
                          cursor: "pointer",
                          animation: editMode ? "vibrate 0.2s infinite alternate ease-in-out" : "none",
                        }}
                      />
                    </Grid>
                  ))
                ) : (
                  <Typography m={2}>There Is No Photos In {title}</Typography>
                )}
              </Grid>
            </Box>
          ))}
        </DialogContent>
      </Dialog>

      {confirmDelete && (
        <Dialog open onClose={() => setConfirmDelete(null)}>
          <DialogTitle sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
            <WarningIcon color="error" sx={{ mr: 1 }} />
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete{" "}
              {confirmDelete.type === "all" ? `all images in "${confirmDelete.category}"` : `this image from "${confirmDelete.category}"`}?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={() => setConfirmDelete(null)} variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button onClick={confirmDeleteAction} variant="contained" color="error" disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DialogCom;
