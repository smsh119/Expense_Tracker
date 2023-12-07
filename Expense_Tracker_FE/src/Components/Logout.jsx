import http from '../services/httpService';

const Logout = () => {
    localStorage.removeItem('phone');
    localStorage.removeItem('id');
    http.removeAuthToken();
    window.location = '/';
};

export default Logout;
