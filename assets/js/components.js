const loginModal = new bootstrap.Modal('#loginModal', {
    keyboard: false
})

const prepareLoginRegister = () => {
    loginModal.show();
    hideElementInScreen('#menu');
}

const prepareDashboard = () => {
    showElementInScreen('#menu');
    loginModal.hide();
}

const showHideComponents = () => {
    const hashtagInRoute = window.location.hash;

    switch (hashtagInRoute) {
        case '#login' || '#register':
            prepareLoginRegister();
            break;

        case '#dashboard' || '':
            prepareDashboard();
            break;

        default:
            break;
    }
}