const openLoginRegister = () => {
    const verify = isLoggedIn();
    if (verify) {
        prepareDashboard();
        return;
    }
    prepareLoginRegister();
}

document.addEventListener('DOMContentLoaded', () => {
    openLoginRegister();
});