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

// Add book to page
const tableBody = document.querySelector('tbody');

function addBookToPage(book) {
    const tableRow = document.createElement('tr');

    Object.keys(book).forEach(key => {
        if (key !== 'id') {
            const tableItem = document.createElement('td');

            if (key === 'read') {
                const readButton = document.createElement('button');
                if (book[key] === 'Yes') {
                    readButton.classList.add('readButton', 'read');
                    readButton.textContent = 'read';
                } else {
                    readButton.classList.add('readButton', 'unread');
                    readButton.textContent = 'not read';
                }
                readButton.addEventListener('click', () => {
                    if (readButton.classList.contains('read')) {
                        readButton.classList.replace('read', 'unread');
                        readButton.textContent = 'not read';
                    } else {
                        readButton.classList.replace('unread', 'read');
                        readButton.textContent = 'read';
                    }
                }) 
                tableItem.appendChild(readButton);
            } else {
                tableItem.textContent = book[key];
            }

            tableRow.appendChild(tableItem);
        }
    });

    // Remove button
    const buttonItem = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.classList.add('removeButton');
    removeButton.dataset.id = book.id;

    removeButton.addEventListener('click', () => {
        tableRow.remove();

        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1) myLibrary.splice(index, 1);
    })

    buttonItem.appendChild(removeButton);
    tableRow.appendChild(buttonItem);

    tableBody.appendChild(tableRow);
}

// addBookButton customization
const dialog = document.getElementById('add-book-dialog');

const showDialog = (show) => show ? dialog.showModal() : dialog.close();

// submit button customization
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const title = form.title.value;
    const author = form.author.value;
    const pages = parseInt(form.pages.value); 
    const read = form.read.checked ? 'Yes' : 'No'; 

    addBookToLibrary(title, author, pages, read);

    addBookToPage(myLibrary[myLibrary.length - 1]);

    form.reset();
});
