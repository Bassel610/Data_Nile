import { useEffect, useState } from "react";
import axios from "axios";
import "./Invites.css";
import Swal from "sweetalert2";

function Invites() {
    const [databaseData, setDatabaseData] = useState([]);

    const sweatAlert = () => {
        Swal.fire({
            text: "Delete is done",
            icon: "success",
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/invite");
            setDatabaseData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/invite/${id}`);
            fetchData();
            sweatAlert();
        } catch (error) {
            console.error("Error deleting resource:", error);
        }
    };

    return (
        <div className="InviteBox">
            <h2 style={{ textDecoration: "underline" }}>Invites Request</h2>
            <div className="InviteContainerWrapper">
                {databaseData.map((dataItem, index) => (
                    <div key={index} className="InviteContainer">
                        {Object.entries(dataItem).map(([key, value]) => (
                            key !== "id" && ( // Exclude "id" from rendering
                                <p key={key}>
                                    <strong>{key.replace(/_/g, " ")}:</strong> {value}
                                </p>
                            )
                        ))}
                        <button
                            style={{ width: "60%" }}
                            onClick={() => handleDelete(dataItem.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Invites;
