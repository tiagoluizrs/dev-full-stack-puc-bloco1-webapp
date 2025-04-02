const loadApplication = () => {
    const verify = isLoggedIn();
    if (verify) {
        prepareDashboardPage();
        window.location.href = '#dashboard';
        return;
    }
    const currentHash = window.location.hash;
    if (currentHash === '#login') {
        prepareLoginPage();
    } else if (currentHash === '#register') {
        prepareRegisterPage();
    } else {
        window.location.href = '#login';
        prepareLoginPage();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadApplication();
});