import React, { useState } from 'react';
import auth from '../services/authService';
import '../Styles/style.Login.css';

function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = ({ target }) => {
        if (target.name === 'phone') setPhone(target.value);
        if (target.name === 'password') setPassword(target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await auth.login(phone, password);
        if (err) setError(err);
        else window.location = '/tracker';
    };

    return (
        <form className="login-container" onSubmit={handleSubmit}>
            <h2>Welcome!</h2>
            <input type="number" name="phone" value={phone} placeholder="phone" onChange={handleChange} />
            <input type="password" name="password" value={password} placeholder="password" onChange={handleChange} />
            {error && <div className="error-div">{error}</div>}
            <button type="submit">Log In</button>
        </form>
    );
}

export default Login;
