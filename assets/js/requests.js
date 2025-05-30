const url = 'http://127.0.0.1:5000/api/';

const getHeaders = (endpoint) => {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (endpoint !== 'login' && endpoint !== 'register') {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    return headers;
}

const get = async (endpoint) => {
    const headers = getHeaders(endpoint);
    const response = await fetch(url + endpoint, {
        method: 'GET',
        headers: headers
    });
    return {
        status: response.status,
        data: await response.json()
    };
}

const post = async (endpoint, data) => {
    const headers = getHeaders(endpoint);

    const response = await fetch(url + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    return {
        status: response.status,
        data: await response.json()
    };
}