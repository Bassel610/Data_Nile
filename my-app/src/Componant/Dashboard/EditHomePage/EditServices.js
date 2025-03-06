import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

const Editservices = () => {
  const [servicesContent, setservicesContent] = useState({ title: "", description: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post("http://localhost:5000/services", servicesContent, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ services section updated:", response.data.message);
      alert("services section updated successfully!");
    } catch (error) {
      console.error("❌ Error updating services section:", error);
      alert("Error updating services section.");
    }
  };

  return (
    <div className="Edit">
      <div className="Con">
        <h2>Edit services</h2>
        <form onSubmit={handleFormSubmit}>
      <TextField              
        sx={{margin :'10px'}}
            value={servicesContent.title}
            onChange={(e) => setservicesContent({ ...servicesContent, title: e.target.value })}
            placeholder="Enter new services title"
          />
          <textarea
            value={servicesContent.description}
            onChange={(e) => setservicesContent({ ...servicesContent, description: e.target.value })}
            placeholder="Enter new services description"
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Editservices;
