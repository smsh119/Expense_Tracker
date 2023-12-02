import React, { useState } from 'react';
import '../Styles/style.Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = ({ target }) => {
        if (target.name === 'name')setName(target.value);
        if (target.name === 'phone')setPhone(target.value);
        if (target.name === 'password')setPassword(target.value);
    };

    const handleSubmit = () => {
        localStorage.setItem('phone', '01');
        window.location = '/tracker';
    };

    return (
        <div className="signup-container">
            <h2>Welcome!</h2>
            <input type="text" name="name" value={name} placeholder="Name" onChange={handleChange} />
            <input type="number" name="phone" value={phone} placeholder="phone" onChange={handleChange} />
            <input type="password" name="password" value={password} placeholder="password" onChange={handleChange} />
            <button type="button" onClick={handleSubmit}>Log In</button>
        </div>
    );
}

export default Signup;
