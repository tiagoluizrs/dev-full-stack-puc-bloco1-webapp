const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
}