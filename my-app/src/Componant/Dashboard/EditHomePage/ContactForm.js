import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  Paper,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import axios from "axios";

const ContactForm = () => {
  const [fields, setFields] = useState([]);

  // Fetch existing form data from API
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/contact-form");
        setFields(
          response.data.length > 0
            ? response.data
            : [{ id: "1", type: "input", value: [""], label: "Name" }]
        );
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    fetchFormData();
  }, []);

  // Handle changes in form fields
  const handleChange = (index, key, newValue) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];

      if (key === "value") {
        updatedFields[index][key] = Array.isArray(newValue) ? newValue : [newValue];
      } else {
        updatedFields[index][key] = newValue;
      }

      return updatedFields;
    });
  };

  // Add a new field
  const addField = () => {
    setFields([...fields, { id: `${fields.length + 1}`, type: "input", value: [""], label: "" }]);
  };

  // Remove a field
  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/contact-form", { fields }); // Send as an object
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <Paper sx={{ p: 3, mx: "auto", maxHeight: "500px", overflowY: "auto" }} className="Edit">
      <Typography variant="h6" gutterBottom>
        Contact Form
      </Typography>

      {fields.map((field, index) => (
        <Box key={field.id} display="flex" flexDirection="column" gap={2} mb={2}>
          {/* Field Type Selection */}
          <Select
            value={field.type}
            onChange={(e) => handleChange(index, "type", e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="input">Input</MenuItem>
            <MenuItem value="textarea">Textarea</MenuItem>
            <MenuItem value="select">Dropdown</MenuItem>
            <MenuItem value="DragDrop">Drag And Drop</MenuItem>
          </Select>

          {/* Field Label */}
          <TextField
            fullWidth
            label="Label"
            variant="outlined"
            value={field.label}
            onChange={(e) => handleChange(index, "label", e.target.value)}
          />

          {/* Field Value */}
          {field.type === "select" ? (
            <Stack spacing={2}>
              {field.value.map((val, valIndex) => (
                <Stack key={valIndex} direction="row" spacing={1} alignItems="center">
                  <TextField
                    label="Dropdown Value"
                    fullWidth
                    variant="outlined"
                    value={val}
                    onChange={(e) => {
                      const updatedValues = [...field.value];
                      updatedValues[valIndex] = e.target.value;
                      handleChange(index, "value", updatedValues);
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "100px" }}
                    color="error"
                    onClick={() => {
                      const updatedValues = field.value.filter((_, i) => i !== valIndex);
                      handleChange(index, "value", updatedValues);
                    }}
                    disabled={field.value.length === 1}
                  >
                    Remove
                  </Button>
                </Stack>
              ))}
              <Button
                variant="contained"
                onClick={() => handleChange(index, "value", [...field.value, ""])}
              >
                Add Values Field
              </Button>
            </Stack>
          ) : (
            <TextField
              label="Value"
              variant="outlined"
              value={field.value?.join(", ")}
              onChange={(e) => handleChange(index, "value", e.target.value.split(","))}
            />
          )}

          <IconButton sx={{ width: "50px", margin: "auto" }} onClick={() => removeField(index)} color="error">
            <RemoveCircleOutline />
          </IconButton>
        </Box>
      ))}

      <Stack width="100%" justifyContent="center" alignItems="center" spacing={2}>
        <Button sx={{color: 'var(--main-color)', borderColor :'var(--border-color)'}} onClick={addField} startIcon={<AddCircleOutline />} variant="outlined">
          Add Field
        </Button>

        <Button onClick={handleSubmit} variant="contained" sx={{ background: "var(--primary-bg)" }}>
          Submit
        </Button>
      </Stack>
    </Paper>
  );
};

export default ContactForm;
