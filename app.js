let myLibrary = [];
let libIndex = 0;

function Book(title, author, pages, readOrUnread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrUnread = readOrUnread;
    this.index = libIndex;
    this.getInfo = function() {
        console.log(title + " by " + author + ", " + pages + ", " + (readOrUnread === "Read" ? "read" : "unread"));
        console.log("Library Index: " + this.index);
    }
}

Book.prototype.updateReadStatus = function() {
    if(this.readOrUnread === "Read") {
        this.readOrUnread = "Unread";
    }
    else {
        this.readOrUnread = "Read";
    }
}

function addBookToLibrary() {

    // Grabbing form values for use in constructor
    const title = document.getElementById('book-title');
    const author = document.getElementById('book-author');
    const pages = document.getElementById('book-pages');

    const radioButtons = document.querySelectorAll('input[name="read-status"]');
    let readOrUnread;
    for(const radioButton of radioButtons) {
        if(radioButton.checked) {
            readOrUnread = radioButton;
            break;
        }
        else {
            readOrUnread = "Unread";
        }
    }

    // Creating new book object and appending it to array
    let newBook = new Book(title.value, author.value, pages.value, readOrUnread.value);
    myLibrary.push(newBook);
    console.log(myLibrary[myLibrary.length-1].getInfo());

    resetDisplay();
    toggleModal();
    clearInputs();
}

function deleteBook(event) {

    // Grab index of array through click event and removing from myLibrary, then decrementing global index.
    const ind = parseInt(`${event.currentTarget.id}`.slice(11));
    myLibrary.splice(ind, 1);
    libIndex--;

    // Updating the index in each object of myLibrary
    for (let i = 0; i < myLibrary.length; i++) {
        myLibrary[i].index = i;
    }

    resetDisplay();
}


function toggleReadStatus(event) {
    const button = document.querySelector(`#${event.currentTarget.id}`);
    const ind = parseInt(`${event.currentTarget.id}`.slice(7));
    if(button.classList.contains('read')) {
        button.classList.remove('read');
        button.classList.add('unread');
        button.textContent = "Unread";
        myLibrary[ind].updateReadStatus();
    }
    else {
        button.classList.remove('unread');
        button.classList.add('read');
        button.textContent = "Read";
        myLibrary[ind].updateReadStatus();
    }
}

function displayLibrary(){

    // Append new book card to DOM
    for(let i = 0; i < myLibrary.length; i++){
        createCard(myLibrary[i]);
        libIndex += 1;
    }
}

function resetDisplay() {
    
    const mainContent = document.querySelector('.main-content');
    libIndex = 0;

    while(mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild);
    }

    displayLibrary();

}

function validateForm() {

    // Getting the user input
    const title = document.getElementById('book-title');
    const author = document.getElementById('book-author');
    const pages = document.getElementById('book-pages');
    const titleDiv = document.querySelector('#title-div');
    const authorDiv = document.querySelector('#author-div');
    const pagesDiv = document.querySelector('#pages-div');
    let titleValid, authorValid, pagesValid = false;

    if(title.value === "") {
        titleDiv.lastElementChild.classList.remove('hidden');
        title.setAttribute('required', "");
    }
    else {
        titleDiv.lastElementChild.classList.add('hidden');
        title.removeAttribute('required');
        titleValid = true;
    }

    if(author.value === "") {
        authorDiv.lastElementChild.classList.remove('hidden');
        author.setAttribute('required', "");
    }
    else {
        authorDiv.lastElementChild.classList.add('hidden');
        author.removeAttribute('required');
        authorValid = true;
    }

    if(pages.value === "") {
        pagesDiv.lastElementChild.classList.remove('hidden');
        pages.setAttribute('required', "");
    }
    else {
        pagesDiv.lastElementChild.classList.add('hidden');
        pages.removeAttribute('required');
        pagesValid = true;
    }

    if(titleValid && authorValid && pagesValid) {
        addBookToLibrary();
        return;
    }
    else {
        return;
    }
}

function clearInputs() {
    const title = document.getElementById('book-title');
    const author = document.getElementById('book-author');
    const pages = document.getElementById('book-pages');
    const radio1 = document.getElementById('read-true');
    const radio2 = document.getElementById('read-false');

    title.value = "";
    author.value = "";
    pages.value = ""; 
    radio1.checked = false;
    radio2.checked = false;
}

function toggleModal() {
    const modal = document.querySelector(".modal");
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
    }
    else {
        modal.classList.add('hidden');
    }
}

function createCard(book){

    const card = document.createElement('div');
    const title = document.createElement('div');
    const h2 = document.createElement('h2');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const button = document.createElement('button');
    const delButton = document.createElement('button');
    const flexDiv = document.createElement('div');
    const delButtonIcon = document.createElement('i');

    card.classList.add('card');
    card.setAttribute('id', `index-${book.index}`);
    title.classList.add('book-title');
    title.classList.add('flex-item');
    button.classList.add('readOrUnread');
    button.classList.add('flex-item');
    button.setAttribute('id', `button-${book.index}`);
    span1.classList.add('shrink');
    span2.classList.add('shrink');
    span1.classList.add('flex-item');
    span2.classList.add('flex-item');
    flexDiv.classList.add('flexDiv');
    delButtonIcon.classList.add("material-icons");
    delButtonIcon.textContent = "close";
    delButton.classList.add('readOrUnread');
    delButton.setAttribute('id', `del-button-${book.index}`);

    h2.textContent = book.title;
    span1.textContent = book.author;
    span2.textContent = book.pages + " pages";
    button.textContent = book.readOrUnread;

    if(button.textContent === "Read"){
        button.classList.add("read");
    }
    else {
        button.textContent = "Unread";
        button.classList.add("unread");
    }

    button.addEventListener("click", toggleReadStatus);
    delButton.addEventListener("click", deleteBook);

    title.appendChild(h2);
    card.append(title);
    card.append(span1);
    card.append(span2);
    delButton.append(delButtonIcon);
    flexDiv.append(button);
    flexDiv.append(delButton);
    card.append(flexDiv);

    const mainContent = document.querySelector('.main-content');
    mainContent.append(card);
}


