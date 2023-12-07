import React, { useState } from 'react';
import http from '../services/httpService';
import '../Styles/style.Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = ({ target }) => {
        if (error) setError('');
        if (target.name === 'name')setName(target.value);
        if (target.name === 'phone')setPhone(target.value);
        if (target.name === 'password')setPassword(target.value);
    };

    const handleSubmit = async () => {
        try {
            const res = await http.post('/user/signup', {
                name,
                phone,
                password,
            });
            if (res.status === 200) {
                window.location = '/login';
            } else {
                setError(res.body.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="signup-container">
            <h2>Welcome!</h2>
            <input type="text" name="name" value={name} placeholder="Name" onChange={handleChange} />
            <input type="number" name="phone" value={phone} placeholder="phone" onChange={handleChange} />
            <input type="password" name="password" value={password} placeholder="password" onChange={handleChange} />
            {error && <div className="error-div">{error}</div>}
            <button type="button" onClick={handleSubmit}>Sign Up</button>
        </div>
    );
}

export default Signup;
