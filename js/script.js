const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const booksContainer = document.getElementById('books-container');
const resultFound = document.getElementById('result-found');
const errorMsg = document.getElementById('error-msg');

// Search Button Click Handler
searchBtn.addEventListener('click', () => {
    searchText = searchInput.value;

    // empty input field error message 
    if(searchText === ''){
        errorMsg.innerText = 'Search Field Empty';
        return;
    }
    // clearing innerHTML after search
    booksContainer.innerHTML = '';
    // clearing search result
    resultFound.innerText = '';
    // clearing error message
    errorMsg.innerText = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => showSearchResult(data))
    .finally(() => {
        searchInput.value = '';
    })
})

const showSearchResult = data => {
    const books = data.docs.slice(0, 40);

    resultFound.innerText = `Showing Result of ${books.length} out of ${data.numFound} matching items`;
    if(data.numFound === 0){
        errorMsg.innerText = 'This Book Not Available'
    }
    else{
        errorMsg.innerText = '';
    }
    
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img height="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Title: <span class="text-primary">${book.title}</span></h5>
                    <p class="card-text">Author: <span class="text-danger">${book.author_name ? book.author_name:'Unknown'}</span></p>
                    <p class="card-text">Publisher: <span class="text-secondary">${book.publisher ? book.publisher:'Unknown'}</span></p>
                    <p class="card-text">First Published: <span class="text-success">${book.first_publish_year ? book.first_publish_year:'Unknown'}</span></p>
                </div>
            </div>
        `;
        booksContainer.appendChild(div);
        errorMsg.innerText = '';
    })
}