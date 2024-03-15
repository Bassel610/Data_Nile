import { useEffect, useState } from "react";
import "./OurServices.css"
import axios from "axios";
// import EditAbout from "../EditText/EditText";

function Services() {
    const [servicesContent, setServicesContent] = useState('');

    useEffect(() => {
        const fetchServicesContent = async () => {
            try {
                const response = await axios.get('https://api.data-nile.com/services');
                setServicesContent(response.data.services); // Accessing the 'services' property
            } catch (error) {
                console.error('Error fetching Services section content:', error);
            }
        };
        fetchServicesContent();
    }, []);

    const handleUpdate = (newContent) => {
        setServicesContent(newContent);
    };

    return (
        <>
            <div className="OurServices">
                <div>
                    <h2>Our Services</h2>
                    <div className="BigText">
                    <p>{servicesContent}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services;
