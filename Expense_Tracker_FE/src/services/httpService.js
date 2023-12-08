const baseUrl = import.meta.env.VITE_BE_URL;

function setAuthToken(token) {
    localStorage.setItem('token', token);
}
function removeAuthToken() {
    localStorage.removeItem('token');
}

async function get(path) {
    try {
        const authToken = localStorage.getItem('token');
        const res = await fetch(baseUrl + path, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken || ''}`,
            },
        });
        const data = await res.json();
        return {
            status: res.status,
            body: data,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function post(path, data) {
    try {
        const authToken = localStorage.getItem('token');
        const res = await fetch(baseUrl + path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken || ''}`,
            },
        });
        const resData = await res.json();

        return {
            status: res.status,
            body: resData,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function remove(path) {
    try {
        const authToken = localStorage.getItem('token');
        const res = await fetch(baseUrl + path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken || ''}`,
            },
        });
        const resData = await res.json();

        return {
            status: res.status,
            body: resData,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const http = {
    get,
    post,
    remove,
    setAuthToken,
    removeAuthToken,

};
export default http;
