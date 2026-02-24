import React, { useState } from 'react';
import auth from '../services/authService';
import '../Styles/style.Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = ({ target }) => {
        if (error) setError('');
        if (target.name === 'name') setName(target.value);
        if (target.name === 'phone') setPhone(target.value);
        if (target.name === 'password') setPassword(target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await auth.signup(name, phone, password);
        if (err) setError(err);
        else window.location = '/login';
    };

    return (
        <form className="signup-container" onSubmit={handleSubmit}>
            <h2>Welcome!</h2>
            <input type="text" name="name" value={name} placeholder="Name" onChange={handleChange} />
            <input type="number" name="phone" value={phone} placeholder="phone" onChange={handleChange} />
            <input type="password" name="password" value={password} placeholder="password" onChange={handleChange} />
            {error && <div className="error-div">{error}</div>}
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;
