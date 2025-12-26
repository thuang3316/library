const myLibrary = [];

function Book(id, title, author, numberOfPages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

function addBookToLibrary(title, author, numberOfPages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, numberOfPages, read);
    myLibrary.push(book);
}

const tableBody = document.querySelector('tbody');

function addBookToPage(myLibrary) {
    myLibrary.forEach(book => {
        let tableRow = document.createElement('tr');

        Object.keys(book).forEach(key => {
            if (key != 'id') {
                let tableItem = document.createElement('td');
                if (key === 'read') {
                    const readButton = document.createElement('button');
                    if (book[key] === 'Yes') {
                        readButton.classList.add('readButton', 'read');
                        readButton.textContent = 'read';
                    } else {
                        readButton.classList.add('readButton', 'unread');
                        readButton.textContent = 'not read';
                    }
                    tableItem.appendChild(readButton);
                } else {
                    tableItem.textContent = book[key];
                }
                tableRow.appendChild(tableItem);
            }       
        })
        const buttonItem = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'remove';
        removeButton.classList.add('removeButton');
        removeButton.dataset.id = book.id;

        buttonItem.appendChild(removeButton);
        tableRow.appendChild(buttonItem);

        tableBody.appendChild(tableRow);
    });
}

addBookToLibrary('1984', 'George Orwell', 328, 'Yes');
addBookToPage(myLibrary);