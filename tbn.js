
document.addEventListener('DOMContentLoaded', async function(){
    const article_id = new URL(window.location.href).searchParams.get("id");
    let prod = await axios.get('templates/prod.html');
    
    
    const data = {
        test: 'hi',
        currentPath: window.location.hash,
        books: [],
        books_copy: [],
        new_books: [],
        avalibleKeywords: [],
    resultsBox: '',
    inputBox : '',
    inputValue: ``,
    pricee: ``
    }
    
    const ProductComponent = {
        props: ['book'],
        template: prod.data
    }

    
    
    /*
    inputBox.onkeyup =
    */
    
    console.log(this.inputBox);
  
   
    

    const app = {
        data(){
            return data
        },
        methods: {
            signOut() {
                console.log('Clicked the signOut link'); // Add this line to check if the event handler is being triggered
                firebase.auth().signOut().then(() => {
                    console.log('Sign-out successful.');
                }).catch((error) => {
                    console.error('Sign-out error:', error);
                });
                setTimeout(function () {
                    window.location.href = `z1.html`;
                }, 1000);
                localStorage.removeItem('user_id');
            },
            getProducts(){
                db.collection('Allbooks').get().then(res => {
                    this.books = [];
                    res.forEach(doc => {
                        let book = doc.data();
                        book.id = doc.id;
                        book.count = 1;
                        this.books.push(book);
                    this.avalibleKeywords.push(book); 
                    })
                     console.log(this.avalibleKeywords);
                this.books_copy = this.books;
                
                })
               
            },
            tovar_filter(category){
                this.return_allproducts()
                this.books = this.books.filter(book =>{
                    return book.category === category;
                })
                
            },
            return_allproducts(){
                this.books = this.books_copy;
                console.log(this.books);
                document.getElementById(`minprice`).value = ``;
                document.getElementById(`maxprice`).value = ``;
                localStorage.removeItem('buynow');
            },
            filter(){
                this.new_books = this.books.slice();
             if(minprice.value.length > 0){
                this.new_books = this.new_books.filter(function (book){
                    return book.price >= minprice.value;
                })

            }
            if(maxprice.value.length > 0){
                this.new_books = this.new_books.filter(function (book){
                    return book.price <= maxprice.value
                })
                this.books = this.new_books;
            }
            this.books = this.new_books;
            
            },
            frommintomax() {
                this.return_allproducts();
                this.books.sort((a, b) => a.price - b.price);
                
               
            
            
            },
            frommaxtomin() {
                this.return_allproducts();
                this.books.sort((a, b) => b.price - a.price);
                
                
                console.log('successful')
            },
             a1(){
            let result = [];
            let input = this.inputValue;
            
            if(input.length != 0){console.log(input)
                this.resultsBox.style.display = 'flex';
                result  = this.avalibleKeywords.filter((keyword)=>{
                    return keyword.name.toLowerCase().includes(input.toLowerCase());
    
                });
                console.log(result);
                
            }
             this.display(result);
        
            if(!result.length){
                this.resultsBox.style.display = 'none';
                
            }
        },display(result){
            const content = result.map((list)=>{
                console.log(list)
                return `<li onclick=selectInput('${list.id}')>` + list.name + "</li>";
            })
        
            this.resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
            console.log(this.resultsBox);
        },selectInput(x){
            console.log(x);
            this.inputBox = list.innerHTML;
            console.log(this.inputBox);
            this.resultsBox.innerHTML = '';
            
        }, 
        checking(id){
            userid = localStorage.getItem("user_id");
            if(userid == null){
                displayMessage1('message-notrister', 'Ой, ви ще не зареєструвались', 'Реєстрація', 4000);
            }else{
                this.saveLocal(id);
            }
        },
        saveLocal(idd){
            let loc_tovars = this.getLocal();
            let tovar = loc_tovars.findIndex(car => 
               // console.log( `'${car.id}'`);
                car.id === idd);
             
            if(tovar === -1){
                let idx = this.books.findIndex(car =>  
                    
                    car.id === idd
                );
                this.books[idx].check = false;
                loc_tovars.push(this.books[idx])
            }else{

                loc_tovars[tovar].count++
            }
           
            console.log(tovar)
        
            displayMessage('message-busket', 'Товар успішно додано до кошику', 'Перевірити', 4000);
        
           
            localStorage.setItem('prod', JSON.stringify(loc_tovars))
           
        },
        getLocal(){
            let prod =  JSON.parse(localStorage.getItem('prod'));
             if(prod === null){
                 return []
             }else{
                 return prod; 
             }
             
         },
        relocationID(id){
            window.location.href = `book/book.html?id=${id}`;
            let loc_tovars = this.getLocaltobuy();
            let tovar = loc_tovars.findIndex(car => 
               // console.log( `'${car.id}'`);
                car.id === id);
             
          
                let idx = this.books.findIndex(car =>  
                    
                    car.id === id
                );
                loc_tovars.push(this.books[idx])
                console.log(loc_tovars)
            console.log(tovar)
        
            
        
           
            localStorage.setItem('buynow', JSON.stringify(loc_tovars));
         },
         saveorder(){
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
                    status: `Обробка`
                }
        console.log(perbook)
        
        db.collection("All_orders").add(perbook).then(function(){
            console.log('Додано')
        })
            })
        });
        
        displayMessage('message-madeorder', 'Вітаємо, очікуйте замовлення!', '', 4000);
        
        },
         order(){
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
        },
       
        saveLocaltobuy(idd){
            let loc_tovars = this.getLocaltobuy();
            let tovar = loc_tovars.findIndex(car => 
               // console.log( `'${car.id}'`);
                car.id === idd);
             
          
                let idx = this.books.findIndex(car =>  
                    
                    car.id === idd
                );
                loc_tovars.push(this.books[idx])
                console.log(loc_tovars)
            console.log(tovar)
        
            
        
           
            localStorage.setItem('buynow', JSON.stringify(loc_tovars));
            this.order();
           
        },
        getLocaltobuy(){
            let prod =  JSON.parse(localStorage.getItem('buynow'));
             if(prod === null){
                 return []
             }else{
                 return prod; 
             }
             
         },
        cancel(){
            let buynoww = document.getElementById('modal');
            buynoww.style.display = "none";
            localStorage.removeItem('buynow');
            window.location.reload();
        },
        
        novaposhta(){
            let totprice = Number(JSON.parse(localStorage.getItem("priceoftov")));
            console.log(totprice);
            totprice += totprice*10/100;
            document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
            console.log(totprice);
            localStorage.setItem("sumawithdel", totprice);
        },
        ukrposhta(){
            let totprice = Number(JSON.parse(localStorage.getItem("priceoftov")));
            totprice += totprice*5/100;
            document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
            localStorage.setItem("sumawithdel", totprice);
        },
        kurer(){
            let totprice = Number(JSON.parse(localStorage.getItem("priceoftov")));
            totprice +=  totprice*15/100;
            document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
            localStorage.setItem("sumawithdel", totprice);
        },
        sam(){
            let totprice = Number(JSON.parse(localStorage.getItem("priceoftov")));
            document.getElementById('totalprice').innerHTML = `${totprice}&nbsp;₴`;
            localStorage.setItem("sumawithdel", totprice);
        },
        choosewheretogo(){
            userid = localStorage.getItem("user_id");
            if(userid == null){
                setTimeout(function () {
                    window.location.href = `z1.html`;
                  }, 1000);
            }else{
                setTimeout(function () {
                    window.location.href = `profile.html`;
                  }, 1000);
            }
        },
        checkingtobuy(id){
            userid = localStorage.getItem("user_id");
            if(userid == null){
                displayMessage1('message-notrister', 'Ой, ви ще не зареєструвались', 'Реєстрація', 4000);
            }else{
                this.saveLocaltobuy(id);
            }
        }
    },
        components:{
            ProductComponent
        },
        computed: {
            
        },
        mounted(){
            this.resultsBox = document.querySelector(".result-box"),
            this.inputBox =  document.getElementById("inputbox").value,
            this.getProducts()
            this.pricee = document.getElementById('totalprice');
        
            
        }

    }
    Vue.createApp(app).mount('#app');
})

function selectInput(id){

    console.log(id)
    window.location.href = `book/book.html?id=${id}` 
}