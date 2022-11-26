const FHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';
const dataContainer = document.querySelector('#data-container');

const createFhoto = (obj) => {
    const fhotoLine = document.createElement('li');
        fhotoLine.className = 'photo-item';
    const image = document.createElement('img');
        image.className = 'photo-item__image';
        image.src = `${obj.url}`;
        fhotoLine.append(image);
    const title = document.createElement('h3');
        title.className = 'photo-item__title';
        title.textContent = `${obj.title}`;
        fhotoLine.append(title);
    return fhotoLine;
};

function toggleLoader() {
    const loaderHTML = document.querySelector('#loader');
    const isHidden = loaderHTML.hasAttribute('hidden');
    if (isHidden) {
        loaderHTML.removeAttribute('hidden');
    } else {
        loaderHTML.setAttribute('hidden', '');
    }
}

function getFastestLoadedPhoto(ids) {
    toggleLoader();
    const requsts = ids.map((id) => fetch(`${FHOTOS_URL}/${id}`));
    Promise.race(requsts)
        .then((response) => {
            // console.log(response);
            if (!response.ok) {
                console.log('Ошибка запроса');
            }
            return response.json(); 
        })
        .then((photo) => {
            // console.log(photo);
            const photoHTML = createFhoto(photo);
            dataContainer.append(photoHTML);
        })
        .catch(console.log)
        .finally(toggleLoader());
}

getFastestLoadedPhoto([60, 12, 55]);
