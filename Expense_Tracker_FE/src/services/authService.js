import { jwtDecode } from 'jwt-decode';
import http from './httpService';

const login = async (phone, password) => {
    if (phone.length !== 11) {
        return 'Please provide valid Phone number (11 Digits)';
    }
    if (password.length < 5 && password.length > 32) {
        return 'Wrong Password';
    }
    try {
        const res = await http.post('/user/login', {
            phone,
            password,
        });
        if (res.status === 200) {
            const { token } = res.body;
            const tokenObj = jwtDecode(token);
            http.setAuthToken(token);
            localStorage.setItem('id', tokenObj._id);
            localStorage.setItem('phone', tokenObj.phone);
            return null;
        }
        console.log(res);
        return res.body.error;
    } catch (err) {
        console.log(err);
        return 'Unexpected error occured!';
    }
};

const signup = async (name, phone, password) => {
    if (name.length === 0 || name.length > 20) {
        return 'Please provide valid Name (Maximum 20 Characters)';
    }
    if (phone.length !== 11) {
        return 'Please provide valid Phone number (11 Digits)';
    }
    if (password.length < 5 || password.length > 32) {
        return 'Please provide a valid password (5 - 32 Characters)';
    }
    try {
        const res = await http.post('/user/signup', {
            name,
            phone,
            password,
        });
        if (res.status === 200) {
            return null;
        }
        return res.body.error;
    } catch (err) {
        console.log(err);
        return 'Unexpected error occured!';
    }
};

const auth = {
    login,
    signup,
};

export default auth;
