import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../Media/Logo.jpg"
import "./Invits.css"
import { FaListUl } from "react-icons/fa";
import Swal from 'sweetalert2'

function Invits () {
    const [password, setPassword] = useState('');
    const [databaseData, setDatabaseData] = useState([]);
    const [togglelist, settogglelist] = useState(false)

    let sweatAleartincorrect = () => {
        Swal.fire({
            text: 'Incorrect password! Please try again.',
            icon: "error"
        });
    }
    let sweatAleartinvitedelete = () => {
        Swal.fire({
            text: 'delete Is Done',
            icon: "error"
        });
    }

    let togglelistFun = () => {
        togglelist ? settogglelist(false) : settogglelist(true)
    }
    window.reload = () => {
        settogglelist(false)
    }
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.data-nile.com/database');
            setDatabaseData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Send DELETE request to backend API
            await axios.delete(`https://api.data-nile.com/database/${id}`);
            // Handle successful deletion (e.g., update UI)
            console.log('Resource deleted successfully');
            fetchData();
            sweatAleartinvitedelete()
        } catch (error) {
            // Handle error (e.g., display error message)
            console.error('Error deleting resource:', error);
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

    return (
        <div>
        <div className='TOG' onClick={togglelistFun}>
            <FaListUl />
            </div>
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
            <div className="InvitBox">
                <h2 >ContactUs</h2>
                <div className="InvitContainerWrapper">
                    {databaseData.map((dataItem, index) => (
                        <>
                        <div key={index} className="InvitContainer">
                            <p>Name: {dataItem.firname} {dataItem.lastemail}</p>
                            <p>Mobile: {dataItem.mobile}</p>
                            <p>Businnes Email: {dataItem.businnesemail}</p>
                            <p>company Name: {dataItem.companyname}</p>
                            <p>Jop: {dataItem.joptilte}</p>
                            <p>Country: {dataItem.country}</p>
                            <p>Solution: {dataItem.solution}</p>
                        <button style={{width: "60%"}} onClick={() => handleDelete(dataItem.id)}>Delete</button>
                        </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Invits;
