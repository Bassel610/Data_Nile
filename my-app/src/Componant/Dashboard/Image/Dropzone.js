import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Paper, Box } from "@mui/material";

const Dropzone = ({ category, onDrop }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDrop = useCallback(
    (acceptedFiles) => {
      // Filter out videos (MIME type starts with 'video/')
      const validFiles = acceptedFiles.filter((file) => !file.type.startsWith("video/"));
      const invalidFiles = acceptedFiles.filter((file) => file.type.startsWith("video/"));

      if (invalidFiles.length > 0) {
        setErrorMessage("Videos are not allowed to storage limit. Please upload images only.");
      } else {
        setErrorMessage("");
      }

      if (validFiles.length > 0) {
        onDrop(category, validFiles);
        setUploadedFiles(validFiles.map((file) => file.name)); // Store valid file names
      }
    },
    [category, onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*", // Only allow images
    multiple: true,
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 2,
        textAlign: "center",
        border: "2px dashed #aaa",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#f0f0f0" : "white",
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="subtitle1" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
        {category.replace("photo", " Photo")}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Drag & drop images here, or click to select files
      </Typography>

      {/* Show uploaded files */}
      {uploadedFiles.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2" color="primary">
            Files uploaded:
          </Typography>
          {uploadedFiles.map((file, index) => (
            <Typography key={index} variant="body2">
              {file}
            </Typography>
          ))}
        </Box>
      )}

      {/* Show error message for videos */}
      {errorMessage && (
        <Typography variant="body2" color="error" mt={2}>
          {errorMessage}
        </Typography>
      )}
    </Paper>
  );
};

export default Dropzone;
