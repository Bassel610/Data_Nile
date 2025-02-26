import { useEffect, useState } from "react";
import EditText from "../../Componant/Dashboard/EditText/EditHomePage";
import Invites from "../../Componant/Dashboard/Invites/Invites";
import ResetPassword from "../../Componant/Dashboard/ResetPassword/ResetPassword";
import axios from "axios";
import Swal from "sweetalert2";
import Logo from "../../Media/Logo.jpg";

import './Dashboard.css'
function Dashboard() {
    const [password, setPassword] = useState('');
    const [passContent, setpassContent] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [activeSection, setActiveSection] = useState("EditHomePage"); // Default section

    useEffect(() => {
        const fetchPassContent = async () => {
            try {
                const response = await axios.get('http://localhost:5000/password');
                setpassContent(response.data.password);
            } catch (error) {
                console.error('Error fetching password section content:', error);
            }
        };
        fetchPassContent();
    }, []);

    const handlePasswordSubmit = () => {
        if (password === passContent) {
            setIsAuthorized(true);
        } else {
            Swal.fire({
                text: 'Incorrect password! Please try again.',
                icon: "error"
            });
        }
    };

    const handleLogout = () => {
        window.location.href = '/';
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
                <button 
                    style={{ width: "113px", height: "40px", padding: "4px 8px", margin: "6px" }}  
                    onClick={handlePasswordSubmit}
                >
                    Submit
                </button>
            </div>
        );
    }
    return (
        <div style={{display: 'flex'}}>
            {/* Sidebar */}
            <div className="AsideSection">
                <div className='Logo'>
                    <img src={Logo} alt="Logo" />
                </div>
                <ul>
                    <li onClick={() => setActiveSection("EditHomePage")}><span>Edit Home Page</span></li>
                    <li onClick={() => setActiveSection("Invites")}><span>Invites</span></li>
                    <li onClick={() => setActiveSection("ResetPassword")}><span>Reset Password</span></li>
                    <li onClick={handleLogout}><span>Logout</span></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="CenterSection" style={{alignItems : activeSection === "Invites" ? 'start' : 'center'}}>
                {activeSection === "EditHomePage" && <EditText />}
                {activeSection === "Invites" && <Invites />}
                {activeSection === "ResetPassword" && <ResetPassword />}
            </div>
        </div>
    );
}

export default Dashboard;
