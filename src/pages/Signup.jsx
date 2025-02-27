import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.scss"; // Use the same CSS file as Login for styling

const Signup = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Signup successful! Please log in.");
                navigate("/login");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Signup</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                    <button type="submit">Signup</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
