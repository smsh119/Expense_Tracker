import { jwtDecode } from 'jwt-decode';
import http from './httpService';

const login = async (phone, password) => {
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
