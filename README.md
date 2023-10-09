# Library-project

const addBook = document.getElementById("add-book");
const dialog = document.querySelector("dialog");
const form = document.querySelector("dialog form");
const content = document.querySelector(".content");

let gridColumnStart = 1; // Initialize grid column start value
let gridRowStart = 1;    // Initialize grid row start value

addBook.addEventListener("click", () => {
    dialog.showModal();
});

// Function to add a new book card
function addBookCard(title) {
    // Create a new book card element
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerText = title;

    // Set the grid-column and grid-row properties for the book card
    bookCard.style.gridColumn = `${gridColumnStart}/${gridColumnStart + 1}`;
    bookCard.style.gridRow = `${gridRowStart}/${gridRowStart + 1}`;

    // Append the book card to the content grid
    content.appendChild(bookCard);

    // Increment the grid column start value
    gridColumnStart += 1;

    // If four books have been added, move to the next row
    if (gridColumnStart > 4) {
        gridColumnStart = 1;
        gridRowStart += 1;
    }

    // Update the "Add Book" button's grid-column property
    addBook.style.gridColumn = `${gridColumnStart}/${gridColumnStart + 1}`;
    addBook.style.gridRow = `${gridRowStart}/${gridRowStart + 1}`;
}

// Handle the form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const title = document.getElementById("title").value;

    // Add a new book card
    addBookCard(title);

    // Clear form fields
    form.reset();

    // Close the dialog
    dialog.close();
});