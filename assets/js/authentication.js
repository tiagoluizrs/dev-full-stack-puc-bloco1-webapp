const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        const expirationDate = new Date(decodedPayload.exp * 1000);
        if (expirationDate > new Date()) {
            return true;
        } else {
            localStorage.removeItem('token');
            return false;
        }
    }
    return ;
}

const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;

}

const loginEvent = async () => {
    const messageAreaComponent = document.getElementById('message-area');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await post('login', { email, password })
        if(response.status === 200) {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.href = '#dashboard';
                prepareDashboardPage();
            } else {
                messageAreaComponent.innerHTML = '<div class="alert alert-danger" role="alert">E-mail ou senha inválidos</div>';
            }
        } else if (response.status === 401) {
            messageAreaComponent.innerHTML = '<div class="alert alert-danger" role="alert">E-mail ou senha inválidos</div>';
        }
    } catch (error) {
        messageAreaComponent.innerHTML = '<div class="alert alert-danger" role="alert">${error}</div>';
    }
}

const logoutEvent = () => {
    localStorage.removeItem('token');
    window.location.href = '#login';
    prepareLoginPage();
}

const registerEvent = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageAreaComponent = document.getElementById('message-area');

    const response = await post('register', { email, password })

    if(response.status === 201) {
        messageAreaComponent.innerHTML = '<div class="alert alert-success" role="alert">Cadastro realizado com sucesso</div>';
        setTimeout(() => {
            window.location.href = '#login';
            prepareLoginPage();
        }, 2000);
    } else {
        messageAreaComponent.innerHTML = '<div class="alert alert-danger" role="alert">E-mail já cadastrado</div>';
    }
}