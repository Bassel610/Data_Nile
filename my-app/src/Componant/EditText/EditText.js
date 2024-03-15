import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditServices from "./EditServices"
import EditAbout from "./EditAbout"
import EditContact from "./EditContact"
import {Link } from 'react-router-dom';
import Logo from "../../Media/Logo.jpg"
import { FaListUl } from "react-icons/fa";
import Swal from 'sweetalert2'

import "./EditText.css"

const EditText = () => {
    const [password, setPassword] = useState('');
    const [togglelist, settogglelist] = useState(false)
    let [passContent, setpassContent] = useState('')

    let sweatAleartincorrect = () => {
        Swal.fire({
            text: 'Incorrect password! Please try again.',
            icon: "error"
        });
    }

    let togglelistFun = () => {
        togglelist ? settogglelist(false) : settogglelist(true)
    }


    useEffect(() => {
        const fetchPassContent = async () => {
            try {
                const response = await axios.get('https://api.data-nile.com/password');
                setpassContent(response.data.password);
            } catch (error) {
                console.error('Error fetching password section content:', error);
            }
        };
        fetchPassContent();
    }, []);


    const [isAuthorized, setIsAuthorized] = useState(false);
    const handlePasswordSubmit = () => {
        // Check if the entered password is correct
        if (password === passContent) {
            setIsAuthorized(true); // Set the authorized state to true
        } else {
            sweatAleartincorrect();
        }
    };


    
    if (!isAuthorized) {
        return (
            <div className="password-form">
                <h2>Password Required</h2>
                <input  
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <button className='entr' style={{width: "113px",height: "40px", padding: "4px 8px", margin: "6px", position: "absolute", left:"46%", top: "290px"}}  onClick={handlePasswordSubmit}>Submit</button>
            </div>
        );
    }
    const handleLogout = () => {
        window.location.href = '/'; // Set the authorized state to false to close the component
    };

    return (
        <div>
            <div className='TOG' onClick={togglelistFun}>
            <FaListUl />
            </div>
            <div className="CONTANER">
                    <div className='Logo'>
                        <img src={Logo} alt=";" />
                    </div>
                <div className={togglelist? "AsideSection " : "AsideSection displaynoneMoble"}>
                    <ul>
                        <Link to={"/Dachboeard"}><li><span>Edit Page</span></li></Link>
                        <Link to={"/Invits"}><li><span>Invits</span></li></Link>
                        <Link to={"/ResetPassword"}><li><span>Reset Password</span></li></Link>
                        <li onClick={handleLogout}><span>Logout</span></li>
                    </ul>
                </div>
                <div className='CenterSection'>
                    <EditAbout />
                    <EditServices />
                    {/* <EditContact /> */}
                </div>
            </div>
        </div>
    );
};

export default EditText;
