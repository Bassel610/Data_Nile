// EditAboutForm.js

import React, { useState } from 'react';
import axios from 'axios';
import EditServices from "./EditServices"
import Swal from 'sweetalert2'

const EditAbout = () => {
    const [newAboutContent, setNewAboutContent] = useState('');

    let sweatAlearteditabout = () => {
        Swal.fire({
            text: 'Edit About Section Is Done',
            icon: "scsuccess"
        });
    }

    const handleInputChange = (event) => {
        setNewAboutContent(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Send a POST request to update the about section content
        axios.post('https://api.data-nile.com/about', { about: newAboutContent })
            .then(() => {
                // If the update was successful, redirect to the about page
                // window.location.href = '/';
                sweatAlearteditabout()
            })
            .catch(error => {
                console.error('Error updating about section content:', error);
            });
    };


    return (
        <div className='Edit'>
            <div className='Con' >
            <h2>Edit About </h2>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    value={newAboutContent}
                    onChange={handleInputChange}
                    placeholder="Enter new about section content"
                />
                <button type="submit">Save</button>
            </form>
            </div>
        </div>
    );
};

export default EditAbout;
