import React, { useState } from 'react';
import '../Styles/style.Login.css';

function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = ({ target }) => {
        if (target.name === 'phone')setPhone(target.value);
        if (target.name === 'password')setPassword(target.value);
    };

    return (
        <div className="login-container">
            <h2>Welcome!</h2>
            <input type="number" name="phone" value={phone} placeholder="phone" onChange={handleChange} />
            <input type="password" name="password" value={password} placeholder="password" onChange={handleChange} />
            <button type="button">Log In</button>
        </div>
    );
}

export default Login;
