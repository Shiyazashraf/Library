const addBook = document.getElementById ("add-book");
const dialog = document.querySelector("dialog");
const close = document.querySelector("#close");


addBook.addEventListener('click',() => {
    dialog.showModal();
    
})

close.addEventListener('click',() => {
    dialog.close();
});
