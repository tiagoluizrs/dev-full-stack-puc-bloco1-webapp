const menuComponentHtml = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary" id="menu">
        <div class="container-fluid">
            <button
                    data-mdb-collapse-init
                    class="navbar-toggler"
                    type="button"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
            >
                <i class="fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <a class="navbar-brand mt-2 mt-lg-0" href="#">
                    <img
                            src="./assets/images/logo.png"
                            height="32"
                            alt="Site Logo"
                            loading="lazy"
                    />
                </a>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Movies</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Series</a>
                    </li>
                </ul>
            </div>
            <div class="d-flex align-items-center">
                <div class="d-flex">
                    <button class="btn btn-primary" onclick="logoutEvent()">Sair</button>
                </div>
            </div>
        </div>
    </nav>
`
const contentComponentHtml = ``

const homeComponentHtml = `
    ${menuComponentHtml}
    ${contentComponentHtml}
`

const loginComponentHtml = `
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 col-md-4 offset-md-4 p-4 col__box--white">
                <form>
                    <h3>Entrar</h3>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">Insira um e-mail</div>
                    </div>
                    <div class="form-group">
                        <label for="email">Senha</label>
                        <input type="password" class="form-control" id="password" aria-describedby="passwordHelp">
                        <div id="passwordHelp" class="form-text">Insira uma senha</div>
                    </div>
                    <span class="col__auth-link">
                        <a href="#register">Criar conta</a>
                    </span>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" id="login-btn" onclick="loginEvent()">Entrar</button>
                    </div>
                    <span class="form-group" id="message-area"></span>
                </form>
            </div>
        </div>
    </div>
`

const registerComponentHtml = `
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 col-md-4 offset-md-4 p-4 col__box--white">
                <form>
                    <h3>Registrar</h3>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">Insira um e-mail</div>
                    </div>
                    <div class="form-group">
                        <label for="email">Senha</label>
                        <input type="password" class="form-control" id="password" aria-describedby="passwordHelp">
                        <div id="passwordHelp" class="form-text">Insira uma senha</div>
                    </div>
                    <span class="col__auth-link">
                        <a href="#login">Entrar</a>
                    </span>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" onclick="registerEvent()">Cadastrar</button>
                    </div>
                    <span class="form-group" id="message-area"></span>
                </form>
            </div>
        </div>
    </div>
`;