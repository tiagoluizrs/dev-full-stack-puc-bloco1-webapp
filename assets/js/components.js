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
                        <a class="nav-link" href="#" onclick="loadData(1, 1)">Filmes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="loadData(1, 2)">Series</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="loadData(1, null)">Todos</a>
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

const paginationComponentHtml = `
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#" onclick="previousPage()">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#" onclick="nextPage()">Next</a></li>
      </ul>
    </nav>
`

const movieSerieCommonFields = `
    <div class="form-group">
        <label for="email">Título</label>
        <input type="email" class="form-control" id="title">
    </div>
    <div class="form-group">
        <label for="email">Data de Lançamento</label>
        <input type="date" class="form-control" id="release_date">
    </div>
    <div class="form-group">
        <label for="email">Classificação</label>
        <input type="text" class="form-control" id="classification">
    </div>
    <div class="form-group">
        <label for="email">Sinopse</label>
        <textarea class="form-control" id="synopsis" rows="3"></textarea>
    </div>
    <div class="form-group">
        <label for="email">Diretor</label>
        <input type="text" class="form-control" id="director">
    </div>
    <div class="form-group">
        <label for="email">Gênero</label>
        <input type="text" class="form-control" id="genre">
    </div>
    <div class="form-group">
        <label for="email">Imagem</label>
        <input type="file" class="form-control" id="image">
    </div>
`

const movieFormHtml = `
    ${movieSerieCommonFields}
    <div class="form-group">
        <label for="email">Duração</label>
        <input type="text" class="form-control" id="duration">
    </div>
    <input type="hidden" name="type" value="1" id="type">
`

const serieFormHtml = `
    ${movieSerieCommonFields}
    <div class="form-group">
        <label for="email">Número de episódios</label>
        <input type="number" class="form-control" id="chapters">
    </div>
    <div class="form-group">
        <label for="email">Número de temporadas</label>
        <input type="number" class="form-control" id="seasons">
    </div>
    <input type="hidden" name="type" value="2" id="type">
`

const modalAddMovieSerie = `
    <div class="modal fade" id="modalAddSerie" tabindex="-1" aria-labelledby=modalAddSerieLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAddSerieLabel">Novo Filme/Série</h5>
            <button type="button" class="btn-close" id="btn-modal-add-close" data-mdb-ripple-init data-mdb-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-check form-check-inline">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="movie_serie" id="filme" onchange="changeFormType(1)" checked/>
                  <label class="form-check-label" for="filme">Filme</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="movie_serie" id="serie" onchange="changeFormType(2)"/>
                  <label class="form-check-label" for="serie">Série</label>
                </div>
            </div>
            <form id="movie__form" class="form__movie_serie--show">
                ${movieFormHtml}
            </form>
            <form id="serie__form" class="form__movie_serie--hide"></form>
            <span class="form-group" id="message-area"></span>
          </div>  
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-mdb-ripple-init data-mdb-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-mdb-ripple-init onClick="saveMovieSerie()">Salvar</button>
          </div>
        </div>
      </div>
    </div>
`

const modalDetail = `
    <div class="modal fade modal-lg" id="modalDetail" tabindex="-1" aria-labelledby=modalDetailLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalDetailLabel"></h5>
            <button type="button" class="btn-close" id="btn-modal-add-close" data-mdb-ripple-init data-mdb-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
               <div class="col-12 col-md-6">
                  <img src="" id="modalDetailImage" class="img-fluid">
                </div>
               <div class="col-12 col-md-6">
                    <div class="row">
                        <div class="col-12">
                            <h5>Diretor</h5>
                            <p id="modalDetailDirector"></p>
                        </div>
                        <div class="col-12">
                            <h5>Data de Lançamento:</h5>
                            <p id="modalDetailReleaseDate"></p>
                        </div>
                        <div class="col-12">
                            <h5>Gênero</h5>
                            <p id="modalDetailGenre"></p>
                        </div>
                        <div class="col-12">
                            <h5>Classificação</h5>
                            <p id="modalDetailClassification"></p>  
                        </div>
                        <span id="detail-movie">
                            <div class="col-12">
                                <h5>Duração</h5>
                                <p id="modalDetailDuration"></p>
                            </div>
                        </span>
                        <span id="detail-serie">
                            <div class="col-12">
                                <h5>Temporadas</h5>
                                <p id="modalDetailSeasons"></p>
                            </div>
                            <div class="col-12">
                                <h5>Episodios</h5>
                                <p id="modalDetailChapters"></p>
                            </div>
                        </span>
                        
                    </div>
                </div>
                <div class="col-12">
                    <h5>Sinopse</h5>
                    <p id="modalDetailSynopsis"></p>
                    <span class="box__detail">
                        <span class="box__rating">
                            <i class="fas fa-star"></i>
                            <span class="card__rating" id="modalDetailRating"></span>
                        </span>
                    </span>
                </div>
            </div>
          </div>  
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-mdb-ripple-init data-mdb-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-mdb-ripple-init>Salvar</button>
          </div>
        </div>
      </div>
    </div>
`

const cardTemplateHtml = `
    <div class="card">
        <span class="card-img-top card__image" style="background-image: url({IMAGE})"></span>
        <div class="card-body">
            <h5 class="card-title">{TITLE}</h5>
            <span class="box__detail">
                <a href="#" class="btn btn-primary" onclick="openModalRating({MOVIE_SERIE_ID_RATING})">Avaliar</a>
                <a href="#" class="btn btn-primary" onclick="openModalDetail({MOVIE_SERIE_ID})">Detalhes</a>
            </span>
            <span class="box__rating">
                <i class="fas fa-star"></i>
                <span class="card__rating">{RATING}</span>
            </span>
        </div>
    </div>
`;

const modalRating = `
    <div class="modal fade" id="modalRating" tabindex="-1" aria-labelledby=modalRatingLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalRatingLabel">Avaliar</h5>
            <button type="button" class="btn-close" id="btn-modal-add-close" data-mdb-ripple-init data-mdb-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="form__rating">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="rating-value"/>
                  <label class="form-check-label" for="serie">1</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="rating-value"/>
                  <label class="form-check-label" for="serie">2</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="rating-value"/>
                  <label class="form-check-label" for="serie">3</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="rating-value"/>
                  <label class="form-check-label" for="serie">4</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="rating-value" checked/>
                  <label class="form-check-label" for="serie">5</label>
                </div>
            </form>
            <br>
            <span class="form-group mt-4" id="message-area-rating"></span>
          </div>  
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btn-modal-add-close-rating" data-mdb-ripple-init data-mdb-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-mdb-ripple-init onClick="rateMovieSerie()">Avaliar</button>
          </div>
        </div>
      </div>
    </div>
`

const contentComponentHtml = `
    <div class="container mt-5">
        <div class="row" id="movie-serie-area-content"></div> 
        <div class="row box__pagination">
            ${paginationComponentHtml}
        </div>
    </div>
                        
    <button type="button" class="btn btn-primary btn-lg btn-floating btn__add" data-mdb-ripple-init onClick="openAddSerieMovieModal()">
      <i class="fas fa-add"></i>
    </button>
`

const homeComponentHtml = `
    ${menuComponentHtml}
    ${contentComponentHtml}
    ${modalAddMovieSerie}
    ${modalDetail}
    ${modalRating}
`

const loginComponentHtml = `
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4 p-4 col__box--white">
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
            <div class="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4 col__box--white">
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

