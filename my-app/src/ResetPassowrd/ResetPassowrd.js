import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ResetPassowrd.css"
import Logo from "../Media/Logo.jpg"
import { FaListUl } from "react-icons/fa";
import axios from "axios";
import Swal from 'sweetalert2'

function ResetPassword () {
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [authpassword, setauthPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [togglelist, settogglelist] = useState(false)

    let sweatAleartwronge = () => {
        Swal.fire({
            text: 'Passwords do not match! Please try again.',
            icon: "error"
        });
    }
    let sweatAleartincorrect = () => {
        Swal.fire({
            text: 'Incorrect password! Please try again.',
            icon: "error"
        });
    }
    let sweatAleartRight = () => {
        Swal.fire({
            text: 'Password reset successfully!',
            icon: "success"
        });
    }
    let sweatAleartempaty = () => {
        Swal.fire({
            text: 'Password fields cannot be empty',
            icon: "error"
        });
    }

    let togglelistFun = () => {
        togglelist ? settogglelist(false) : settogglelist(true)
    }
    window.onload = () => {
        settogglelist(false)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Send a POST request to update the password section content
        axios.post('https://api.data-nile.com/password', { password: newPassword })
            .then(() => {
                // If the update was successful, redirect to the about page
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Error updating password section content:', error);
            });
    };

    const handleResetPassword = (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
    
        // Check if the new password and confirmation are not empty
        if (newPassword.trim() !== '' && confirmPassword.trim() !== '') {
            // Check if the new password matches the confirmation
            if (newPassword === confirmPassword) {
                // Send a POST request to update the password section content
                axios.post('https://api.data-nile.com/password', { password: newPassword })
                    .then(() => {
                        // If the update was successful, redirect to the about page
                        // Add your redirection logic here
                    })
                    .catch(error => {
                        console.error('Error updating password section content:', error);
                    });
                sweatAleartRight();
            } else {
                sweatAleartwronge();
            }
        } else {
            // Handle case where one or both fields are empty
            console.error('Password fields cannot be empty');
            sweatAleartempaty();
        }
    };
    

    const handleLogout = () => {
        window.location.href = '/'; 
    };

    let [passContent, setpassContent] = useState('')

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
        if (authpassword === passContent) {
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
                    value={authpassword}
                    onChange={(e) => setauthPassword(e.target.value)}
                    />
                <button className='entr' style={{width: "113px",height: "40px", padding: "4px 8px", margin: "6px", position: "absolute", left:"46%", top: "290px"}}  onClick={handlePasswordSubmit}>Submit</button>
            </div>
        );
    }
    return (
        <>
        <div className='TOG' onClick={togglelistFun}>
            <FaListUl />
        </div>
            <div className='Logo'>
                <img src={Logo} alt=";" />
            </div>
            <div className={togglelist? "AsideSection " : "AsideSection displaynoneMoble"}>
                <ul>
                    <Link to={"/Dachboeard"} onClick={() => settogglelist(false)}><li><span>Edit Page</span></li></Link>
                    <Link to={"/Invits"}  onClick={() => settogglelist(false)}><li><span>Invits</span></li></Link>
                    <Link to={"/ResetPassword"}  onClick={() => settogglelist(false)} ><li><span>Reset Password</span></li></Link>
                    <li onClick={handleLogout}><span>Logout</span></li>
                </ul>
            </div>
            <div className='Contaner'>
                {/* <Link to={"/Dachboeard"}><button style={{position: "absolute", top: "60px", left: "10px"}}>return to Edit</button></Link> */}
                <div className="password-reset-form">
                <h2>Reset Password</h2>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{display: "block", margin: "20px", marginLeft: "60px"}}
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{display: "block", margin: "20px",  marginLeft: "60px"}}
                />
                <button className="resetpassmob" onClick={handleResetPassword} style={{position: "absolute", left: "25%"}}>Reset Password</button>
                </div>
            </div></>
    )
}

export default ResetPassword