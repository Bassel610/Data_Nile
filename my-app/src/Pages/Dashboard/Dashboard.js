import { useEffect, useState } from "react"; 
import EditText from "../../Componant/Dashboard/EditHomePage/index";
import Invites from "../../Componant/Dashboard/Invites/Invites";
import ResetPassword from "../../Componant/Dashboard/ResetPassword/ResetPassword";
import axios from "axios";
import ImageUploader from "../../Componant/Dashboard/Image/mange_Image";
import MangeLayout from "../../Componant/Dashboard/layout/MangeLayout";

import './Dashboard.css'


function Dashboard({colorPalette,
  selectedColors,
  onColorChange,}) {
    const [password, setPassword] = useState('');
    const [activeSection, setActiveSection] = useState("EditHomePage"); // Default section
    let isAuthorized = localStorage.getItem("isAuthorized");
    const [getLogos, setGetLogos] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const response = await axios.get("http://localhost:5000/images");
            setGetLogos(response.data?.[0].Logos?.filter((ele) => ele.isActive === true)?.[0] || []);
          } catch (error) {
            console.error("Error fetching images:", error);
          }
        };
        fetchImages();
    }, []);

    const verifyPasswordContent = async () => {
        try {
            const response = await axios.post("http://localhost:5000/verify-password", { password });
            if (response.data.status === true) {
                localStorage.setItem("isAuthorized", true);
                window.location.reload();
            }
        } catch (error) {
            console.error("❌ Password verification failed:", error.response?.data || error.message);
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem("isAuthorized");
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
                    onClick={verifyPasswordContent}
                >
                    Submit
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <div className="AsideSection">
                <div className='Logo'>
                    <img src={getLogos?.url} alt="Logo" />
                </div>
                <ul>
                    <li onClick={() => setActiveSection("EditHomePage")}><span>Manage Home Page</span></li>
                    <li onClick={() => setActiveSection("MangeImages")}><span>Manage Images</span></li>
                    <li onClick={() => setActiveSection("MangeLayout")}><span>Manage Layout</span></li>
                    <li onClick={() => setActiveSection("Invites")}><span>Invites</span></li>
                    <li onClick={() => setActiveSection("ResetPassword")}><span>Reset Password</span></li>
                    <li onClick={handleLogout}><span>Logout</span></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="CenterSection" style={{ alignItems: activeSection === "Invites" ? 'start' : 'center' }}>
                {activeSection === "EditHomePage" && <EditText />}
                {activeSection === "Invites" && <Invites />}
                {activeSection === "ResetPassword" && <ResetPassword />}
                {activeSection === "MangeImages" && <ImageUploader />}
                {activeSection === "MangeLayout" && (
                    <MangeLayout 
                        colorPalette={colorPalette} 
                        selectedColors={selectedColors} 
                        onColorChange={onColorChange} 
                    />
                )}
            </div>
        </div>
    );
}

export default Dashboard;
