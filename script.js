
let search_btn = document.getElementById("search-btn");

search_btn.addEventListener("click" , search);
let search_bar = document.querySelector("#search");
let container = document.getElementById("books")
let BookStore = new Array();
let flag= false;
let arr = new Array();
 async function search(){
    try {
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=percy+jackson");
        const data =  await response.json();
        console.log(data);
         let items = data.items;
         
        //  console.log(items);
       
        
         let result_status = document.getElementById("result");
          items.forEach(item => {
            if(search_bar.value===item.volumeInfo.title||search_bar.value===item.volumeInfo.authors[0]){
            
                console.log( item.volumeInfo.title,item.volumeInfo.authors[0] ,item.volumeInfo.averageRating ,  item.volumeInfo.publisher , item.volumeInfo.pageCount)
               flag =true;
                result_status.innerText = `Books result for ${item.volumeInfo.authors[0]}...`
                 container.style.display = "flex"; 
                BookStore.push(item);
            }
            else {
                    if(BookStore.length<=0){
                    result_status.innerHTML = "No result Found"
                    container.style.display = "none";
                    }
                    // flag = false;
                    
            }
           
         });
        
    } catch (e) {
       console.log(e); 
    }
    console.log(BookStore);
    if(flag==true){
        if(JSON.parse(localStorage.getItem("books"))!=null){
           arr = [...JSON.parse(localStorage.getItem("books"))];
        }
        arr.unshift(search_bar.value);
   
        localStorage.setItem("books" ,JSON.stringify(arr))


    }
   

    displayBooks();
    
}

let get_history = document.getElementById("history");
get_history.addEventListener("click" , browseHistory)
function browseHistory(){
    window.location.href = "history.html"
}

function displayBooks(){
    console.log("hello")
    console.log(BookStore);
    BookStore.forEach(item => {
          console.log(item);
          console.log("idhr h")
        container.innerHTML += `
        <div class="card">
            <img class="image-top" src=${item.volumeInfo.imageLinks.thumbnail} alt="${item.volumeInfo.title}">
            <div class="card-body">
                <h5 class="card-title">${item.volumeInfo.title}</h5>
                <p class="card-authorName">Author's Name: ${item.volumeInfo.authors[0]}</p>
                <p class="card-text">${item.volumeInfo.publisher}</p>
                <p class="card-rating">Ratings: ${ item.volumeInfo.averageRating} &#9733;</p>
            <div>
        </div>`
    });
}