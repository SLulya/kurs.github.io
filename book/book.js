let book_id = new URL(window.location.href).searchParams.get("id");
console.log(book_id);
let books = [];
function getBook(book_id) {
    db.collection('Allbooks').doc(book_id).get().then(res => {
        let book = {
            id: res.id,
            count: 1,
            ...res.data()
        }

        console.log(book)
        drawBook(book);
        books.push(book);
   })
}
getBook(book_id)

function drawBook(book){
    let bookinfo = document.getElementById('bodyy');
    bookinfo.innerHTML = `
    <img src="${book.img}" alt='ghhfhh'>
        <div class="blockone">
            <div class="nameofbook"><h1>${book.name}</h1></div>
            <div class="authorofbook"><h4>${book.author}</h4></div>
            <div class="anottext"><h3>Анотація книги:</h3></div>
            <div class="anotation"><p>&nbsp;&nbsp;&nbsp;&nbsp;  ${book.anotation}</p></div>
        </div>
        </div>
        <div class="blocktwo">
            <div class="priceofbook"><h3>${book.price}&nbsp;<span style="font-family:cursive;">₴</span></h3></div>
            <div class="addto">
                <div class="addtobuket" onclick="checking('${book.id}')"><i class="fa-solid fa-cart-shopping" style="color: #f1f4f8;"></i></div>
                <div class="buythebook" onclick="checkingtobuy()"><i class="fa-solid fa-credit-card" style="color: #f1f4f8;"></i></div>
            </div>
        </div>
    `
}

function return_allproducts(){
    localStorage.removeItem('buynow');
}

function checking(id){
    userid = localStorage.getItem("user_id");
    if(userid == null){
        displayMessage1('message-notrister', 'Ой, ви ще не зареєструвались', 'Реєстрація', 4000);
    }else{
        this.saveLocal(id);
    }
}

function checkingtobuy(){
    userid = localStorage.getItem("user_id");
    if(userid == null){
        displayMessage1('message-notrister', 'Ой, ви ще не зареєструвались', 'Реєстрація', 4000);
    }else{
        this.order();
    }
}

function saveorder(){
    totprice = localStorage.getItem("sumawithdel");
    let user_id = localStorage.getItem("user_id");
    let buynow = JSON.parse(localStorage.getItem('buynow'));
    db.collection('users').doc(user_id).get().then(res =>{
        let user_info = res.data();
        buynow.forEach(eachbook =>{
        let perbook = {
            name: eachbook.name,
            price: totprice,
            anotation: eachbook.anotation,
            author: eachbook.author,
            category: eachbook.category,
            count: eachbook.count,
            idofbook: eachbook.id,
            img: eachbook.img,
            idofuser: user_id,
            nameofuser: user_info.name,
            status: `Обробка`,
        }
console.log(perbook)

db.collection("All_orders").add(perbook).then(function(){
    console.log('Додано')
})
    })
});

displayMessage('message-madeorder', 'Вітаємо, очікуйте замовлення!', '', 4000);
}

function saveLocal(idd){
    let loc_tovars = getLocal();
    let tovar = loc_tovars.findIndex(car => 
       // console.log( `'${car.id}'`);
        car.id === idd);
     
    if(tovar === -1){
        let idx = books.findIndex(car =>  
            
            car.id === idd
        );
        books[idx].check = false;
        loc_tovars.push(books[idx])
    }else{

        loc_tovars[tovar].count++
    }
   
    console.log(tovar)

    displayMessage('message-busket', 'Товар успішно додано до кошику', 'Перевірити', 4000);

   
    localStorage.setItem('prod', JSON.stringify(loc_tovars))
   
}
function getLocal(){
    let prod =  JSON.parse(localStorage.getItem('prod'));
     if(prod === null){
         return []
     }else{
         return prod; 
     }
     
 }

 function order(){
    let buynow = document.getElementById('modal');
    buynow.style.display = "flex";

    let booktobuy = JSON.parse(localStorage.getItem('buynow'));
    console.log(booktobuy)
    let alltovstobuy = document.getElementById("alltovstobuy");
    let totalprice = document.getElementById('totalprice');
    booktobuy.forEach(tov =>{
        alltovstobuy.innerHTML += `
        <div class="tovtobuy">
        <div class="tovtobuyleft">
                <img src="${tov.img}" class="imgoftov"></img>
                <div class="nameoftov">${tov.name}</div>
                </div>
                <div class="priceoftov">${tov.price}&nbsp;₴</div>
            </div>
        `;
        totalprice.innerHTML = `${tov.price}&nbsp;₴`;
        let priceoftovar = tov.price;
        console.log(priceoftovar);
        localStorage.setItem('priceoftov', JSON.stringify(priceoftovar));
    });
}

function cancel(){
    let buynoww = document.getElementById('modal');
    buynoww.style.display = "none";
    localStorage.removeItem('buynow');
    window.location.reload();
}

function novaposhta(){
    let totprice = Number(JSON.parse(localStorage.getItem("priceoftov")));
    console.log(totprice);
    totprice += totprice*10/100;
    document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
    console.log(totprice);
    localStorage.setItem("sumawithdel", totprice);
}
function  ukrposhta(){
    let totprice = Number(JSON.parse(localStorage.getItem("priceoftov")));
    totprice += totprice*5/100;
    document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
    localStorage.setItem("sumawithdel", totprice);
}

function kurer(){
    let totprice = Number(JSON.parse(localStorage.getItem("priceoftov")));
    totprice +=  totprice*15/100;
    document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
    localStorage.setItem("sumawithdel", totprice);
}

function sam(){
    let totprice = Number(JSON.parse(localStorage.getItem("priceoftov")));
    document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
    localStorage.setItem("sumawithdel", totprice);
}

function getLocaltobuy(){
    let prod =  JSON.parse(localStorage.getItem('buynow'));
     if(prod === null){
         return []
     }else{
         return prod; 
     }
     
 }