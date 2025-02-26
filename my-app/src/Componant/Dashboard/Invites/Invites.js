import { useEffect, useState } from "react";
import axios from "axios";
import "./Invites.css"
import Swal from 'sweetalert2'

function Invites () {
    const [databaseData, setDatabaseData] = useState([]);

    let sweatAlert = () => {
        Swal.fire({
            text: 'Delete is done',
            icon: "success"
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/database');
            setDatabaseData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/database/${id}`);
            fetchData();
            sweatAlert();
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    };

    return (
            <div className="InviteBox">
                <h2 style={{textDecoration :'underline'}}>Invites Request</h2>
                <div className="InviteContainerWrapper">
                    {databaseData.map((dataItem, index) => (
                        <div key={index} className="InviteContainer">
                            <p>Name: {dataItem.firstName} {dataItem.lastName}</p>
                            <p>Mobile: {dataItem.mobile}</p>
                            <p>Business Email: {dataItem.businessEmail}</p>
                            <p>Company Name: {dataItem.companyName}</p>
                            <p>Job: {dataItem.jobTitle}</p>
                            <p>Country: {dataItem.country}</p>
                            <p>Solution: {dataItem.solution}</p>
                            <button style={{ width: "60%" }} onClick={() => handleDelete(dataItem.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default Invites;
