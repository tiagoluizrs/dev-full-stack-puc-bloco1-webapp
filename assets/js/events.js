var type = 1 // 1 = movie, 2 = serie;
var currentPage = 1;
var totalResults = 0;
var currentType = null;
var currentMovieSerieRatingId = null;

const openAddSerieMovieModal = () => {
    const modalAddSerie = document.getElementById('modalAddSerie');
    const modalInstance = new mdb.Modal(modalAddSerie);
    modalInstance.show();
}

const openModalDetail = async (id) => {
    const modalDetail = document.getElementById('modalDetail');
    const modalInstance = new mdb.Modal(modalDetail);
    modalInstance.show();
    const response = await get(`movie-serie/${id}`);

    if(response.status === 200){
        document.getElementById("modalDetailImage").src = response.data.image;
        document.getElementById("modalDetailDuration").innerText = response.data.duration ? response.data.duration + ' minutos' : 'N/A';
        document.getElementById("modalDetailGenre").innerText = response.data.genre;
        document.getElementById("modalDetailLabel").innerText = response.data.title;
        document.getElementById("modalDetailSynopsis").innerText = response.data.synopsis;
        document.getElementById("modalDetailClassification").innerText = response.data.classification;
        document.getElementById("modalDetailDirector").innerText = response.data.director;
        document.getElementById("modalDetailReleaseDate").innerText = response.data.release_date;
        document.getElementById("modalDetailChapters").innerText = response.data.chapters ? response.data.chapters : 'N/A';
        document.getElementById("modalDetailSeasons").innerText = response.data.seasons ? response.data.seasons : 'N/A';
        document.getElementById("modalDetailRating").innerText = response.data.average_rating ? response.data.average_rating : '0';

        const detailMovie = document.getElementById('detail-movie');
        const detailSerie = document.getElementById('detail-serie');
        if(response.data.type === 1){
            detailMovie.classList.remove('d-none');
            detailSerie.classList.add('d-none');
        } else {
            detailSerie.classList.remove('d-none');
            detailMovie.classList.add('d-none');
        }
    }
}

const closeAddSerieMovieModal = () => {
    document.getElementById('btn-modal-add-close').click();

    const messageAreaComponent = document.getElementById('message-area');
    messageAreaComponent.innerHTML = '';
    document.getElementById('movie__form').reset();
    document.getElementById('serie__form').reset();
}

const openModalRating = async (id) => {
    currentMovieSerieRatingId = id;
    const modalRating = document.getElementById('modalRating');
    const modalInstance = new mdb.Modal(modalRating);
    modalInstance.show();
}

const getCheckedRatingValue = (name) => {
    const ratingInputs = document.querySelectorAll(`input[name="${name}"]`);
    let checkedValue = null;
    ratingInputs.forEach((input) => {
        if (input.checked) {
            checkedValue = input.nextElementSibling.textContent;
        }
    });
    return checkedValue;
};

const rateMovieSerie = async () => {
    const rating = getCheckedRatingValue('rating-value');
    const user = getUser();

    const response = await post(`rating/${currentMovieSerieRatingId}`, { rating: rating, user_id: user.id });
    if(response.status === 200){
        const messageAreaComponent = document.getElementById('message-area-rating');
        messageAreaComponent.innerHTML = '<div class="alert alert-success" role="alert">Obrigado por avaliar!!!</div>';
        setTimeout(async () => {
            document.getElementById('btn-modal-add-close-rating').click();
            await loadData(currentPage);
        }, 2000);
    }
}

const previousPage = async () => {
    if (currentPage > 1) {
        await loadData(currentPage - 1, currentType);
    }
}
const nextPage = async () => {
    if(totalResults <= 20) {
        await loadData(currentPage + 1, currentType);
    }
}

const loadData = async (page=1, type=null) => {
    var typeArg = "";
    if(type){
        currentType = type;
        typeArg = `&type=${type}`;
    } else{
        currentType = null;
    }

    const movieSerieAreaContent = document.getElementById("movie-serie-area-content");
    const response = await get(`movie-serie?page=${page}&limit=20${typeArg}`);
    if(response.status === 200){
        var result = response.data.items;
        totalResults = result.length;

        if (result.length === 0){
            return;
        }

        movieSerieAreaContent.innerHTML = "";
        for(let d of result){
            const cardHtml = cardTemplateHtml
                .replace('{IMAGE}', d.image)
                .replace('{TITLE}', d.title)
                .replace('{MOVIE_SERIE_ID}', d.id)
                .replace('{MOVIE_SERIE_ID_RATING}', d.id)
                .replace('{RATING}', d.average_rating ? d.average_rating : '0');

            const cardElement = document.createElement('div');
            cardElement.classList.add('col-12', 'col-md-4', 'col-lg-3');
            cardElement.innerHTML = cardHtml;
            movieSerieAreaContent.append(cardElement);
        }
        currentPage = page;
    }
}

function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onloadend = function() {
            resolve(reader.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

const generateDataForm = async () => {
    const data = {
        title: '',
        synopsis: '',
        classification: '',
        release_date: '',
        type: 1,
        duration: 0,
        chapters: 0,
        seasons: 0,
        director: '',
        genre: '',
        status: true,
        image: null
    }
    const duration = document.getElementById('duration');
    const chapters = document.getElementById('chapters');
    const seasons = document.getElementById('seasons');

    data.title = document.getElementById('title').value;
    data.synopsis = document.getElementById('synopsis').value;
    data.classification = document.getElementById('classification').value;
    data.release_date = document.getElementById('release_date').value;
    data.director = document.getElementById('director').value;
    data.genre = document.getElementById('genre').value;
    data.status = true;
    data.type = document.getElementById('type').value;
    data.duration = duration ? duration.value : 0;
    data.chapters = chapters ? chapters.value : 0;
    data.seasons = seasons ? seasons.value : 0;

    const imageInput = document.getElementById('image').files[0];

    if (imageInput) {
        console.log(imageInput);
        data.image = await convertImageToBase64(imageInput);
    }
    console.log(data)
    return data;
}

const saveMovieSerie = async () => {
    const data = await generateDataForm();
    const messageAreaComponent = document.getElementById('message-area');

    try {
        const response = await post("movie-serie", data);
        if (response.status === 201) {
            console.log(response)
            messageAreaComponent.innerHTML = '<div class="alert alert-success" role="alert">Cadastro realizado com sucesso</div>';
            setTimeout(() => {
                closeAddSerieMovieModal();
                loadData(currentPage);
            }, 2000);
        } else {
            messageAreaComponent.innerHTML = '<div class="alert alert-danger" role="alert">"Erro ao adicionar</div>';
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

const changeFormType = (type) => {
    const movieForm = document.getElementById('movie__form');
    const serieForm = document.getElementById('serie__form');


    if (type === 1) {
        movieForm.innerHTML = movieFormHtml;
        serieForm.innerHTML = "";
        movieForm.classList.remove('form__movie_serie--hide');
        movieForm.classList.add('form__movie_serie--show');
        serieForm.classList.remove('form__movie_serie--show');
        serieForm.classList.add('form__movie_serie--hide');
    } else {
        movieForm.innerHTML = "";
        serieForm.innerHTML = serieFormHtml;
        serieForm.classList.remove('form__movie_serie--hide');
        serieForm.classList.add('form__movie_serie--show');
        movieForm.classList.remove('form__movie_serie--show');
        movieForm.classList.add('form__movie_serie--hide');
    }
}