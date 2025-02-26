import "./ContactUs.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ContactUs({toggleForm, setToggleForm}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [country, setCountry] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [solution, setSolution] = useState("");

    const showSuccessAlert = () => {
        Swal.fire({
            text: "Thank you for contacting us!",
            icon: "success",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/database", {
                firstName,
                lastName,
                jobTitle,
                companyName,
                country,
                solution,
                businessEmail,
                mobile,
            });
            console.log(response.data);

            // Reset form fields after successful submission
            setFirstName("");
            setLastName("");
            setJobTitle("");
            setCompanyName("");
            setBusinessEmail("");
            setSolution("");
            setMobile("");
            setCountry("");
            showSuccessAlert();
            setToggleForm(false);
        } catch (error) {
            console.error("Error adding profile:", error);
        }
    };

    return (
        <>
            <div className="ContactUs">
                <h2>Contact Us</h2>
                <h4>Please click below to contact us</h4>
                <button style={{ background: "#333", width: "20%" }} onClick={() => setToggleForm(!toggleForm)}>
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
                    <label>
                        <span>First Name:</span>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label>
                        <span>Last Name:</span>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </label>
                    <label>
                        <span>Job Title:</span>
                        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    </label>
                    <label>
                        <span>Company Name:</span>
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </label>
                    <label>
                        <span>Country:</span>
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </label>
                    <label>
                        <span>Mobile:</span>
                        <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </label>
                    <label>
                        <span>Business Email:</span>
                        <input type="email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} />
                    </label>
                    <label>
                        <span>Solution:</span>
                        <select value={solution} onChange={(e) => setSolution(e.target.value)}>
                            <option>Research & Analytics</option>
                            <option>Panel Services</option>
                            <option>Community Management</option>
                        </select>
                    </label>
                    <div className="BTN">
                        <button type="submit">Send The Invite</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ContactUs;
