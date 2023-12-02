const Logout = () => {
    localStorage.removeItem('phone');
    window.location = '/';
};

export default Logout;
