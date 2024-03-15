import React, { useState } from 'react';
import axios from 'axios';

const EditContact = () => {
    const [newContact, setNewContact] = useState({
        facebook: '',
        instagram: '',
        whatsapp: '',
        youtube: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Send a POST request to update the contact section content
        axios.post('https://api.data-nile.com/contact', { contact: newContact })
            .then(() => {
                // If the update was successful, redirect to the contact page
                console.log('Contact section content updated successfully');
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Error updating contact section content:', error);
            });
    };

    return (
        <div className='Edit'>
            <div className='Con'>
                <h2>Edit Contact Section</h2>
                <form onSubmit={handleFormSubmit}>
                    <div style={{marginBottom: "20px"}}>
                        <label style={{marginRight: "6px"}}>Facebook:</label>
                        <input
                            type="text"
                            name="facebook"
                            value={newContact.facebook}
                            onChange={handleInputChange}
                            placeholder="Enter Facebook URL"
                        />
                    </div>
                    <div style={{marginBottom: "20px"}}>
                        <label style={{marginRight: "6px"}}>Instagram:</label>
                        <input
                            type="text"
                            name="instagram"
                            value={newContact.instagram}
                            onChange={handleInputChange}
                            placeholder="Enter Instagram URL"
                        />
                    </div>
                    <div style={{marginBottom: "20px"}}>
                        <label style={{marginRight: "6px"}}>WhatsApp:</label>
                        <input
                            type="text"
                            name="whatsapp"
                            value={newContact.whatsapp}
                            onChange={handleInputChange}
                            placeholder="Enter WhatsApp number"
                        />
                    </div>
                    <div style={{marginBottom: "20px"}}>
                        <label style={{marginRight: "6px"}}>YouTube:</label>
                        <input
                            type="text"
                            name="youtube"
                            value={newContact.youtube}
                            onChange={handleInputChange}
                            placeholder="Enter YouTube URL"
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditContact;
