const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const booksContainer = document.getElementById('books-container');
const resultFound = document.getElementById('result-found');
const errorMsg = document.getElementById('error-msg');


searchBtn.addEventListener('click', () => {
    searchText = searchInput.value;

    // empty input field msg 
    if(searchText === ''){
        errorMsg.innerText = 'Search Field Empty';
        return;
    }
    // clear innerHTML after search
    booksContainer.innerHTML = '';

    const url = `http://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => showSearchResult(data))
    .finally(() => {
        searchInput.value = '';
    })
})

const showSearchResult = data => {
    resultFound.innerText = `Showing Result of 100 from ${data.numFound}`;
    
    const books = data.docs;
    books.forEach(book => {
        // console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img height = "300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <p class="card-text">Authors: ${book.author_name}</p>
                    <p class="card-text">First Published: ${book.first_publish_year}</p>
                </div>
            </div>
        `;
        booksContainer.appendChild(div);
        errorMsg.innerText = '';
    })
}
