import "./ContactUs.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ContactUs({toggleForm, setToggleForm}) {
    const [contactForm, setContactForm] = useState([]);
    const [formData, setFormData] = useState({});
      // Handle Input Change
  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle Drag and Drop File Upload
  const handleFileDrop = (id, event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]; // Get first dropped file
    if (file) handleChange(id, file);
  };

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                // Use a CORS proxy service to bypass CORS restrictions during development
                const response = await axios.get('http://localhost:5000/contact-form');
                setContactForm(response.data.fields);
            } catch (error) {
                console.error('Error fetching about section content:', error);
            }
        };
        fetchAboutContent();
    }, []);

    const showSuccessAlert = () => {
        Swal.fire({
            text: "Thank you for contacting us!",
            icon: "success",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const payload = {};
            contactForm.forEach((ele) => {
                const formattedKey = ele.label.replace(/\s+/g, "_").toUpperCase(); // Replace spaces with underscores & uppercase
                payload[formattedKey] = formData[ele.id] || ""; // Store user input
            });
    
            const response = await axios.post("http://localhost:5000/invite", payload);
    
            // Reset form
            setFormData({});
            showSuccessAlert();
            setToggleForm(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    

    return (
        <>
            <div className="ContactUs">
                <h2>Contact Us</h2>
                <h4>Please click below to contact us</h4>
                <button style={{ background: "var(--primary-bg)", width: "20%" }} onClick={() => setToggleForm(!toggleForm)}>
                    Contact Us
                </button>
            </div>
            <div className={toggleForm ? "ContactUsForm displayblock" : "ContactUsForm"}>
                <form onSubmit={handleSubmit}>
                    <div className="CloseForm" onClick={() => setToggleForm(false)}>
                        <div></div>
                        <div></div>
                    </div>
                    <h1>Contact Us Form</h1>
                    {contactForm.map((ele) => (
        <label key={ele.id}>
          <span>{ele.label}:</span>

          {ele.type === "input" && (
            <input
              type="text"
              value={formData[ele.id] || ""}
              onChange={(e) => handleChange(ele.id, e.target.value)}
            />
          )}

          {ele.type === "select" && (
            <select value={formData[ele.id]  || ""} onChange={(e) => handleChange(ele.id, e.target.value)}>
              <option value="">Select an option</option>
              {ele.value.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {ele.type === "textarea" && (
            <textarea
              value={formData[ele.id] || ""}
              onChange={(e) => handleChange(ele.id, e.target.value)}
            />
          )}

          {ele.type === "file" && (
            <div
              style={{
                border: "2px dashed gray",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onDrop={(e) => handleFileDrop(ele.id, e)}
              onDragOver={(e) => e.preventDefault()}
            >
              Drag & Drop File Here
            </div>
          )}
        </label>
      ))}
                    <div className="BTN">
                        <button type="submit">Send The Invite</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ContactUs;
