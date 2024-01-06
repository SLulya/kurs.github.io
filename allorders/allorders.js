function showModal(id){
    document.getElementById(id).classList.add('show')
    }
    function hideModal(id){
    document.getElementById(id).classList.remove('show')
    }
    let vsi_masive = [];
    let nomer = 0;

function drawtov(){
    let tbody = document.getElementById('tbody')
        tbody.innerHTML = '';
        let idx = 1;
   
    db.collection("All_orders").get().then(res => {
        res.forEach(doc =>{
            let tovar = doc.data();
            tovar.id = doc.id;
            vsi_masive.push(tovar);
            let color = '';
            if(tovar.status === 'Виконується'){
              color =  'blue';
            }else if(tovar.status === 'Обробка'){
                color = 'yellow';
            }
            else if(tovar.status === 'Доставлено'){
                color = 'green';
            }else if(tovar.status === 'Надіслано'){
                color = 'brown';
            }else if(tovar.status === 'Скасовано'){
                color = 'red';
            }
            tbody.innerHTML += 
        `<tr class="trr">
            <td>${idx}</td>
			<td>${tovar.nameofuser}</td>
            <td>${tovar.name} - ${tovar.author}</td>
            <td>${tovar.price}</td>
            <td><div class="circlediv ${color}" id="circlediv"><i class="fa-solid fa-box"></i></div> ${tovar.status}</td>
            <td class="text-center"><button class="btn btn-warning btn-sm" onclick="edit(${nomer})">Редагувати</button></td>
            <td class="text-center"><button class="btn btn-danger btn-sm" onclick="delUser('${tovar.id}')">x</button></td>
		</tr>`;
        
        nomer++;
        idx++
    
        })
    })
}
drawtov()
/*let perbook = {
            name: eachbook.name,
            price: eachbook.price,
            anotation: eachbook.anotation,
            author: eachbook.author,
            category: eachbook.category,
            count: eachbook.count,
            idofbook: eachbook.id,
            img: eachbook.img,
            idofuser: user_id,
            nameofuser: user_info.name
        } 
function addtov(){
    let user = {
        name: document.getElementById('name').value,
        author: document.getElementById('author').value,
        img: document.getElementById('img').value,
        anotation: document.getElementById('anot').value,
        nameofuser: document.getElementById('reviews').value,
        price:document.getElementById('price').value
    }
    
    console.log(user)
    db.collection("Allbooks").add(user).then(function(){
        console.log('Додано')
        hideModal('newTaskModal')
        location.reload()
    })
}*/

function SaveEdittov(id){
    let perbook = {
        name: document.getElementById('edit_name').value,
        author: document.getElementById('edit_author').value,
        price: document.getElementById('edit_price').value,
        nameofuser: document.getElementById('edit_nameofuser').value,
        status: document.getElementById('edit_status').value
    }
    console.log(perbook)
    db.collection("All_orders").doc(id).set(perbook).then(function(){
        console.log('Оновлено');
        hideModal('editTaskModal');
        drawtov()
    })
}

function edit(index){
    document.getElementById('edit_name').value = vsi_masive[index].name;
     document.getElementById('edit_author').value= vsi_masive[index].author;
     document.getElementById('edit_status').value= vsi_masive[index].status;
     document.getElementById('edit_price').value= vsi_masive[index].price;
     document.getElementById('edit_nameofuser').value= vsi_masive[index].nameofuser;
     showModal('editTaskModal')
     document.getElementById('saveEd').setAttribute('onclick', `SaveEdittov("${vsi_masive[index].id}")`)
 }
 

 function changetored(){
    document.getElementById('circlediv').classList.add("red");
 }

 function changetogreen(){
    document.getElementById('circlediv').classList.add("green");
 }

 function changetoblue(){
    document.getElementById('circlediv').classList.add("blue");
 }

 function changetobrown(){
    document.getElementById('circlediv').classList.add("brown");
 }

 