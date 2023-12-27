const openForm = document.getElementById("book-form");
const closeForm = document.getElementsByTagName("span")[0];
closeForm.addEventListener("click", () => {
  openForm.style.display = "none"
  openForm.reset();
});

const addBookBtn = document.getElementById('add-book-btn');
addBookBtn.addEventListener('click', () => openForm.style.display = "block");

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', addBookToLibrary);

class Book {
  constructor(title="NA", author="NA", read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

let userLibrary = [];

function addBookToLibrary() {
  openForm.style.display = "none";

  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const read = document.getElementById("read");

  const newBook = new Book(title, author, read);
  userLibrary.push(newBook);

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("read").checked = false;

  setData()
  render();
  openForm.reset();
}

function render() {
  const display = document.querySelector(".library-container");
  const books = document.querySelectorAll(".book");
  books.forEach((book => display.removeChild(book)));

  for (let i = 0; i < userLibrary.length; i++) {
    createBook(userLibrary[i]);
  }
}

function removeBookFromLibrary(index) {
  userLibrary.splice(index, 1);
  setData();
  render();
}

function createBook(book) {
  const library = document.querySelector(".library-container")
  const bookDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookDiv.classList.add("book");
  bookDiv.setAttribute("id", userLibrary.indexOf("book"));

  titleDiv.textContent = book.title;
  titleDiv.classList.add("title");
  bookDiv.appendChild(titleDiv);

  authorDiv.textContent = book.author;
  authorDiv.classList.add("author");
  bookDiv.appendChild(authorDiv);

  readBtn.classList.add("readBtn")    
  bookDiv.appendChild(readBtn);
  if (book.read===false) {
    readBtn.textContent = 'Not Read';
    readBtn.style.backgroundColor = '#e04f63';
  } else {
    readBtn.textContent = 'Read';
    readBtn.style.backgroundColor = '#63da63'
  }

  readBtn.addEventListener("click", () => {
    book.read = !book.read;
    setData();
    render();
  })

  removeBtn.textContent = 'Remove'; 
  removeBtn.setAttribute('id', 'removeBtn');
  bookDiv.appendChild(removeBtn);
  removeBtn.addEventListener('click', () => removeBookFromLibrary(userLibrary.indexOf(book)));

  library.appendChild(bookDiv);
}

function setData() {
  localStorage.setItem(`userLibrary`, JSON.stringify(userLibrary));
}

function restore() {
  if (!localStorage.userLibrary) {
      render();
  } else {
      let objects = localStorage.getItem('userLibrary') // gets information from local storage to use in below loop to create DOM/display
      objects = JSON.parse(objects);
      userLibrary = objects;
      render();
  }
}

restore();