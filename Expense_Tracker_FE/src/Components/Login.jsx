import React, { useState } from 'react';
import auth from '../services/authService';
import '../Styles/style.Login.css';

function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = ({ target }) => {
        if (target.name === 'phone')setPhone(target.value);
        if (target.name === 'password')setPassword(target.value);
    };

    const handleSubmit = async () => {
        const err = await auth.login(phone, password);
        if (err) setError(err);
        else window.location = '/tracker';
    };

    return (
        <div className="login-container">
            <h2>Welcome!</h2>
            <input type="number" name="phone" value={phone} placeholder="phone" onChange={handleChange} />
            <input type="password" name="password" value={password} placeholder="password" onChange={handleChange} />
            {error && <div className="error-div">{error}</div>}
            <button type="button" onClick={handleSubmit}>Log In</button>
        </div>
    );
}

export default Login;
