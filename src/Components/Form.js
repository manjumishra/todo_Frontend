import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css'; // Import CSS file

function Form() {
    const [userData, setUserData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8000/api/get_users')
            .then((res) => {
                console.log("response Data", res.data);
                setUserData(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/add", { name, email });
            console.log("Data added:", response.data);
            setName('');
            setEmail('');
            fetchData();
        } catch (error) {
            console.error("Error adding data:", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.get(`//localhost:8000/api/delete/${id}`);
            console.log("Data deleted:", id);
            fetchData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }

    const handleEdit = async (id) => {
        try {
            await axios.post(`http://localhost:8000/delete/${id}`);
            console.log("Data deleted:", id);
            fetchData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control" placeholder='Enter your name' />
                </div>
                <div className="form-group">
                    <input type="email" name="email" value={email} onChange={handleInputChange} className="form-control" placeholder='Enter your email' />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
            <div>
                <h2>Users</h2>
                <ul className="user-list">
                    {userData.map(user => (
                        <li key={user.id} className="user-item">
                            <span>{user.name}</span> - <span>{user.email}</span>
                            <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete</button>
                            <button onClick={() => handleEdit(user.id)} className="btn btn-secondary">Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Form;
