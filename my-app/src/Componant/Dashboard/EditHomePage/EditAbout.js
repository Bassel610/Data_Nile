import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

const EditAbout = () => {
  const [aboutContent, setAboutContent] = useState({ title: "", description: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post("http://localhost:5000/about", aboutContent, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ About section updated:", response.data.message);
      alert("About section updated successfully!");
    } catch (error) {
      console.error("❌ Error updating about section:", error);
      alert("Error updating about section.");
    }
  };

  return (
    <div className="Edit">
      <div className="Con">
        <h2>Edit About</h2>
        <form onSubmit={handleFormSubmit}>
        <TextField
        sx={{margin :'10px'}}
            variant="outlined"
            value={aboutContent.title}
            onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
            placeholder="Enter new about title"
          />
          <textarea
            value={aboutContent.description}
            onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
            placeholder="Enter new about description"
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditAbout;
