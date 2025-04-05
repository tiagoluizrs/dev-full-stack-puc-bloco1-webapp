const homeComponent = document.getElementById('home-component');
const loginComponent = document.getElementById('login-component');
const registerComponent = document.getElementById('register-component');

const prepareLoginPage = () => {
    homeComponent.innerHTML = '';
    loginComponent.innerHTML = loginComponentHtml;
    registerComponent.innerHTML = '';
}

const prepareRegisterPage = () => {
    homeComponent.innerHTML = '';
    loginComponent.innerHTML = '';
    registerComponent.innerHTML = registerComponentHtml;
}
const prepareDashboardPage = async () => {
    homeComponent.innerHTML = homeComponentHtml;
    loginComponent.innerHTML = '';
    registerComponent.innerHTML = '';
    await loadData(1);
}

const changeComponentPage = (hashtagInRoute) => {
    switch (hashtagInRoute) {
        case '#login':
            prepareLoginPage();
            break;
        case '#register':
            prepareRegisterPage();
            break;
        case '#dashboard' || '':
            prepareDashboardPage();
            break;
        case '#logout' || '':
            logoutEvent();
            break;
        default:
            break;
    }
}

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'A' && target.getAttribute('href').startsWith('#')) {
        changeComponentPage(target.getAttribute('href'))
    }
});