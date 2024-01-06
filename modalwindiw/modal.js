function saveLocaltobuy(idd){
    let books = [];
    db.collection('Allbooks').get().then(res => {
        res.forEach(doc => {
            let book = doc.data();
            book.id = doc.id;
            book.count = 1;
            books.push(book);
        });
        console.log(books)
    });
    let loc_tovars = getLocal();
    let tovar = loc_tovars.findIndex(car => 
       // console.log( `'${car.id}'`);
        car.id === idd);
     
  
        let idx = books.findIndex(car =>  
            
            car.id === idd
        );
        loc_tovars.push(books[idx])
   
    console.log(tovar)

    

   
    localStorage.setItem('buynow', JSON.stringify(loc_tovars))
   
}
function getLocal(){
    let prod =  JSON.parse(localStorage.getItem('buynow'));
     if(prod === null){
         return []
     }else{
         return prod; 
     }
     
 }
 