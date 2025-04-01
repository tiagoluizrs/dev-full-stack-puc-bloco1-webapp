const hideElementInScreen = (query) => {
    const element = document.querySelector(query);
    element.style.display = 'none';
}

const showElementInScreen = (query) => {
    const element = document.querySelector(query);
    element.style.removeProperty('display');
}