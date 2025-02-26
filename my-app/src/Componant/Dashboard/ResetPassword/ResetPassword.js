import {  useState } from "react";
import "./ResetPassword.css";
import axios from "axios";
import Swal from "sweetalert2";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const showAlert = (text, icon) => {
        Swal.fire({ text, icon });
    };

    const handleResetPassword = (event) => {
        event.preventDefault();
        if (!newPassword.trim() || !confirmPassword.trim()) {
            showAlert("Password fields cannot be empty", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            showAlert("Passwords do not match! Please try again.", "error");
            return;
        }

        axios
            .post("http://localhost:5000/password", { password: newPassword })
            .then(() => showAlert("Password reset successfully!", "success"))
            .catch((error) => console.error("Error updating password:", error));
    };
    return (
        <>
                <div className="password-reset-form">
                    <h2 style={{textDecoration :'underline'}}>Reset Password</h2>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        style={{marginTop : '12px'}}
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button style={{marginTop : '12px'}} onClick={handleResetPassword}>
                        Reset Password
                    </button>
                </div>
        </>
    );
}

export default ResetPassword;
