function getprods(){
    return JSON.parse(localStorage.getItem('prod'));
}

function drawprods(){
    let products = getprods();
    let busket = document.getElementById('busket');
    let textk = document.getElementById('textk');
    busket.innerHTML = ``;
    textk.innerHTML = `<p>Ваш кошик (${products.length})</p>`;
    let index = 0;
    let y = '';
    if(products == null){
        busket.innerHTML = `<div class="emptybusket">До кошику нічого не додано <i class="fa-regular fa-face-frown-open"></i></div>`;
    }else{ 
    products.forEach(arr => {
        if(arr.check == false){
            y = ''
        }else{
            y = 'checked'
        }
        busket.innerHTML += `<div class="tovar" id="tovar">
        <div class="kartunka"><img src="${arr.img}" alt="agaaaa"></div>
        <div class="names"><div class="nameofbook"><p>${arr.name}</p></div>
        <div class="nameofauthor"><p>${arr.author}</p></div></div>
        <div class="alldivprice"><div class="pricediv"><p>${arr.price}₴</p></div>
        <div class="tovprice"><p>Total: ${arr.price*arr.count}₴</p></div>
        </div>
        <div class="twodiv">

        <div class="amount">
            <div class="amountreg" id="minusamount" onclick="amountminus('${index}')"><p class="minusam">-</p></div>
            <div class="amountp"><p>${arr.count}</p></div>
            <div class="amountreg" id="plusamount" onclick="amountplus('${index}')"><p class="plusam">+</p></div>
        </div>

        <label class="custom-checkbox" tab-index="0" aria-label="Checkbox Label" >
            <input type="checkbox" id="checkbox${arr.id}" name="checkbox" onclick="savelocalcheck('${arr.id}')" ${y}>
            <span class="checkmark"></span>
        </label>
        

        </div>
    </div>`;
        index++;
    });
   }
}
drawprods();



function ifchecked(){
    let prod =  JSON.parse(localStorage.getItem('checkedarr'));
    let x = [];

             if(prod === null){
                console.log("kkk");
                 return x

             }else{
                 return prod; 
             }
}
if(ifchecked() == []){
    let zero = 0;
    localStorage.setItem("totalprice", JSON.stringify(zero));
}
let sum;
function savelocalcheck(idd){
   let prods = getprods();
   let prodscheck = ifchecked();
   let checkbox = document.getElementById(`checkbox${idd}`);
console.log(prodscheck);
   let idx = prodscheck.findIndex(car =>  
        
    car.id === idd
);
console.log(idx);
let cartidx;
   if(idx === -1){
    let cartidx = prods.findIndex(car => 
        car.id === idd
        )
        prods[cartidx].check = true;
        localStorage.setItem('prod', JSON.stringify(prods))
        prodscheck.push(prods[cartidx]);
       
        drawprods()
         
        
        
}else{
    let cartidx = prods.findIndex(car => 
        car.id === idd
        )
    prods[cartidx].check = false;
    localStorage.setItem('prod', JSON.stringify(prods))
    prodscheck.splice(idx, 1);
    localStorage.setItem('checkedarr', JSON.stringify(prodscheck))
    drawprods()
}
    
sum = 0;
    
if(localStorage.getItem('checkedarr') != null){ 
prodscheck.forEach(prod =>{
    sum += Number(prod.price*prod.count);
        })
        localStorage.setItem("totalprice", JSON.stringify(sum));
        let suma = localStorage.getItem('totalprice');
        if(suma != null){ 
        document.getElementById('numberofbooks').innerHTML  = 
        `<h2 class="text" >Всього: ${suma} </h2>`;
        }else{
            document.getElementById('numberofbooks').innerHTML  = 
    `<h2 class="text" >Всього: 0 </h2>`;
        }
}
localStorage.setItem('checkedarr', JSON.stringify(prodscheck));


   /*if(checkbox == true){
     prodscheck.push(prods[idd]);
     localStorage.setItem('checkedarr', JSON.stringify(prodscheck));
   }else{
    prodscheck.push(prods[idd]);
   }
  console.log(prodscheck);*/
    if(prodscheck == []){
    document.getElementById("ordertovs").disabled  = true;
}else {
    document.getElementById("ordertovs").disabled  = false;
}
}
let suma = localStorage.getItem('totalprice');
        if(suma != null){
        document.getElementById('numberofbooks').innerHTML  = 
        `<h2 class="text" >Всього: ${suma} </h2>`;
        document.getElementById('totalprice').innerHTML = `${suma} ₴`;
}else{
    document.getElementById('numberofbooks').innerHTML  = 
    `<h2 class="text" >Всього: 0 </h2>`;
}

function amountplus(tovar_id){
    
let prods = getprods();


    prods[tovar_id].count++;
    let justprice = prods[tovar_id].count*prods[tovar_id].price;
    localStorage.setItem('prod', JSON.stringify(prods));
    localStorage.setItem("totalprice", JSON.stringify(justprice));
    drawprods();
}

function amountminus(tovar_id){
    
let prods = getprods();

if(prods[tovar_id].count > 1){
    prods[tovar_id].count--;
}
    localStorage.setItem('prod', JSON.stringify(prods));
    drawprods();

}

function order(){
    let buynow = document.getElementById('modal');
    buynow.style.display = "flex";

    let checkedtovs = JSON.parse(localStorage.getItem('checkedarr'));
    console.log(checkedtovs)
    let alltovstobuy = document.getElementById("alltovstobuy");

    checkedtovs.forEach(tov =>{
        alltovstobuy.innerHTML += `
        <div class="tovtobuy">
        <div class="tovtobuyleft">
                <img src="${tov.img}" class="imgoftov"></img>
                <div class="nameoftov">${tov.name}</div>
                </div>
                <div class="priceoftov">${tov.price}&nbsp;₴</div>
            </div>
        `
    });

    let totsumm = localStorage.getItem('totalprice');

document.getElementById('totalprice').innerHTML = `${totsumm}&nbsp;₴`
}
let totsum = Number(localStorage.getItem('totalprice'));

function novaposhta(){
    let totprice=totsum
    totprice += totsum*10/100;
    document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`
    console.log(totsum);
    localStorage.setItem("sumawithdel", totprice);
}
function ukrposhta(){
    let totprice=totsum
    totprice += totsum*5/100;
    document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
    localStorage.setItem("sumawithdel", totprice);
}
function kurer(){
    let totprice=totsum
    totprice +=  totsum*15/100;
    document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
    localStorage.setItem("sumawithdel", totprice);
}
function sam(){
    let totprice=totsum
    document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
    localStorage.setItem("sumawithdel", totprice);
}

function cancel(){
        let buynow = document.getElementById('modal');
        buynow.style.display = "none";
    localStorage.removeItem('sumawithdel');
      location.reload();
}

function saveorder(){
    totprice = localStorage.getItem("sumawithdel");
    let user_id = localStorage.getItem("user_id");
    let checkedarr = JSON.parse(localStorage.getItem('checkedarr'));
    db.collection('users').doc(user_id).get().then(res =>{
        let user_info = res.data();
    checkedarr.forEach(eachbook =>{
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
            status: `Обробка`
        }
console.log(perbook)

db.collection("All_orders").add(perbook).then(function(){
    console.log('Додано')
})
    })
    
});

displayMessage('message-madeorder', 'Вітаємо, очікуйте замовлення!', '', 2000);
    setTimeout(function () {
        cancel();
      }, 3000);

}
function return_allproducts(){
    localStorage.removeItem('buynow');
}

function signOut() {
    console.log('Clicked the signOut link'); // Add this line to check if the event handler is being triggered
    firebase.auth().signOut().then(() => {
        console.log('Sign-out successful.');
    }).catch((error) => {
        console.error('Sign-out error:', error);
    });
    setTimeout(function () {
        window.location.href = "../z1.html";
    }, 1000);
    localStorage.removeItem('user_id');
}
