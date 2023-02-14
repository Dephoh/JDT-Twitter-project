const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading')
const API_URL = 'http://locahost:8000/tweet'
loadingElement.style.display = 'none';

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const tweet = {
        name,
        content
    };
    console.log(tweet);
    form.style.display = 'none';
    loadingElement.style.display ='';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(tweet),
        headers: {
            'content-type': 'application/json'
        }
    });
})