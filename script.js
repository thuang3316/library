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
    const book = Book(id, title, author, numberOfPages, read);
    myLibrary.push(book);
}