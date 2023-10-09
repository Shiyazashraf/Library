const addBook = document.getElementById ("add-book");
const dialog = document.querySelector("dialog");
const closedialog = document.querySelector("#close");
const form = document.querySelector(".form-container");
const content = document.querySelector(".content");


let gridColumnStart = 1;
let gridRowStart = 1;


class book {
    constructor(
        title = 'unknown',
        author = 'unknown',
        pages = 0,
        isRead = false,
        rating = 0

    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.rating = rating;

    }
}

const library = [];

function addBookToLibrary(title,author,pages,isRead,rating) {
    const newbook = new book(title,author,pages,isRead,rating);

    library.push(newbook);
    addBookCard(newbook);

    form.reset();
    dialog.close();
}

addBook.addEventListener('click', ()=> {
    dialog.showModal();
});

closedialog.addEventListener('click', ()=> {
    dialog.close();
});


function reorganizeGrid() {
    const remainingBookCards = document.querySelectorAll(".book-card");
    let col = 1;
    let row = 1;

    remainingBookCards.forEach((card) => {
        card.style.gridColumn = `${col}/${col + 1}`;
        card.style.gridRow = `${row}/${row + 1}`;

        col +=1;
        if(col > 4) {
            col = 4;
            row += 1; 
        }
    })

    gridColumnStart = col;
    gridRowStart = row;

    addBook.style.gridColumn = `${gridColumnStart}/${gridColumnStart + 1}`;
    addBook.style.gridRow = `${gridRowStart}/${gridRowStart + 1}`;
}

// add new book card 

function addBookCard(book) {
    const bookcard = document.createElement("div");
    bookcard.classList.add('book-card');
    const booktitle = document.createElement("h3");
    booktitle.classList.add("book-title");
    booktitle.innerText = book.title;

    bookcard.addEventListener('click',() => {
        showBookInfo(book);
    })

    const deletebookbtn = document.createElement('button');
    deletebookbtn.classList.add('delete-button');
    deletebookbtn.innerHTML ='<i class = "bx bxs-trash-alt"></i>' ;


    const bookCompleted = document.createElement('input');
    bookCompleted.type = 'checkbox';
    bookCompleted.id = 'read';
    bookCompleted.name = 'read';
    bookCompleted.checked = book.isRead;
   
    bookCompleted.addEventListener('change', (e) => {
        book.isRead = e.target.checked;
        showBookInfo(book);
    })

    const bookCompletedLabel = document.createElement('label');
    bookCompletedLabel.htmlFor = 'read';
    bookCompletedLabel.innerText = 'Read';

    const bookCardBtnContainer = document.createElement('div');
    bookCardBtnContainer.classList.add('bookcard-btn-container');
    bookCardBtnContainer.appendChild(deletebookbtn);
    bookCardBtnContainer.appendChild(bookCompletedLabel);
    bookCompletedLabel.appendChild(bookCompleted);
    



    bookcard.style.gridColumn = `${gridColumnStart}/${gridColumnStart+1}`;
    bookcard.style.gridRow = `${gridRowStart}/${gridRowStart+1}`;

    bookcard.appendChild(booktitle);
    bookcard.appendChild(bookCardBtnContainer);
    


    content.appendChild(bookcard);

    gridColumnStart +=1;
    if(gridColumnStart>4) {
        gridColumnStart = 1;
        gridRowStart += 1;
    }

    addBook.style.gridColumn = `${gridColumnStart}/${gridColumnStart+1}`;
    addBook.style.gridRow = `${gridRowStart}/${gridRowStart+1}`;


    deletebookbtn.addEventListener('click',() => {
        content.removeChild(bookcard);
        removeBook(book);
        reorganizeGrid();
    })
    console.log(library);
}

//remove book from libray 

function removeBook(book) {
    const index = library.indexOf(book);
    if(index !== -1) {
        library.splice(index,1);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const completed = document.getElementById("completed").checked;
    const rating = document.getElementById("rating").value;
    addBookToLibrary(title,author,pages,completed,rating);
    form.reset();
    dialog.close();
});

function showBookInfo(book) {
    const titleInfo = document.getElementById('titleinfo');
    const authorInfo = document.getElementById('authorinfo');
    const pageInfo = document.getElementById('pageinfo');
    const readInfo = document.getElementById('readinfo');
    const ratingInfo = document.getElementById('ratinginfo');

    titleInfo.textContent = `Title: ${book.title}`;
    authorInfo.textContent = `Author: ${book.author}`;
    pageInfo.textContent = `Pages: ${book.pages}`;
    readInfo.textContent = `Completed: ${book.isRead ? 'Yes' : 'No'}`;
    ratingInfo.textContent = `Rating: ${book.rating}/5`;
}


library.forEach((book) => {
    addBookCard(book);
})





