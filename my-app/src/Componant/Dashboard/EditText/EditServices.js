// EditServicesForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const EditServicesForm = () => {
    const [newServicesContent, setNewServicesContent] = useState('');

    let sweatAlert = () => {
        Swal.fire({
            text: 'Edit services Section Is Done',
            icon: "success"
        });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/services', { services: newServicesContent });
            setNewServicesContent('');
            sweatAlert()
        } catch (error) {
            console.error('Error updating services content:', error);
        }
    };

    return (
        <div className='Edit'>
            <div className='Con'>
            <h2>Edit Services</h2>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    value={newServicesContent}
                    onChange={(event) => setNewServicesContent(event.target.value)}
                    placeholder="Enter new services content"
                />
                <button type="submit">Save</button>
            </form>
            </div>
        </div>
    );
};

export default EditServicesForm;
