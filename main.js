class Book{
    constructor(author, yp, title, pages, isRe){
        this.author = author;
        this.yp = yp;
        this.title = title;
        this.pages = pages;
        this.isRe = isRe;
    }
}

const library=[];
const addBtn = document.querySelector('.add-btn');
const modal = document.querySelector('.modal_book');
const addBookBtn = document.querySelector('.addBook-btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const year = document.querySelector('#year');
const pages = document.querySelector('#pages');
const count = document.querySelector('.count');
const container = document.querySelector(".books_container");
const isRead = document.querySelector("#isRead");
function addBook(Book) {
    library.push(Book)
}


// Examples of books added by hand.

const book1 = new Book("Gabriel Garcia Marquez", 1967, "Cien años de soledad", 471);
const book2 = new Book("Frank Kafka", 1915, "La Metamorfosis", 128);
addBook(book1);
addBook(book2);


let c =0;
function renderOnScreen(library){
    container.innerHTML = "";   
    library.forEach((book,index) => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.dataset.id = index;
        card.innerHTML=`
            <h2>${book.title}</h2>
            <h4>${book.author}</h4>
            <div>Year of release: ${book.yp}</div>
            <div>Pages: <strong>${book.pages}</strong></div>
            <div class="btn-container"> 
                <button class="del-btn btn-cfg">Delete</button>
                <button class="read-btn btn-cfg">Read</button>
            </div>
        `;
    //Delete and read functionalities.
    const readBtn = card.querySelector('.read-btn');
    const delBtn = card.querySelector('.del-btn');

    if(isRead.checked){
        card.classList.add("read");
        verifyRead(card);
    }else{
        readBtn.textContent = "Read";
    }

    function verifyRead(card){
        if(card.classList.contains("read")){
            c++;
            count.innerHTML = c;
            readBtn.textContent = "Completed";
        }else{
            if(c>0){
                c--;
            }
            count.innerHTML = c;
            readBtn.textContent = "Read";  
        }
    }

    readBtn.addEventListener('click', ()=>{
        console.log(card);
        if(card.classList.contains("read")){
            card.classList.remove("read");   
            verifyRead(card);              
        }else{
            card.classList.add("read");
            verifyRead(card);            
        }
    });


    delBtn.addEventListener('click', ()=>{
        console.log(card);
        library.splice(card, 1);
        renderOnScreen(library)
    });


    container.appendChild(card);
    });


}

addBtn.addEventListener('click', ()=>{
    if(modal.classList.contains("active")){
        modal.classList.remove("active");
    }else{
        modal.classList.add("active");
    }
});

// Get values from the inputs.

function getBookInfo(){
    const book = new Book(author.value,year.value,title.value,pages.value, isRead.value);
    console.log(book);
    author.value=year.value=title.value=pages.value = "";
    return book;
}

// Add book button functionalitie.

addBookBtn.addEventListener('click', ()=>{
    addBook(getBookInfo());
    modal.classList.remove("active"); // Temporal.
    renderOnScreen(library)
});


// Render elements.
renderOnScreen(library);
