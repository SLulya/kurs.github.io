let admin_password = 4559865;

function googleVhid() {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      console.log(result);
      console.log(user);
      db.collection('users').doc(user.uid).get().then(res =>{
        if(res._delegate._document == null){
          createUser(user.uid, user.displayName, '', user.email);
        } else {
        console.log('exists')
      }
      })
      
      localStorage.setItem('user_id',user.uid);
      setTimeout(function () {
        window.location.href = `tbn.html?id=${user.uid}`;
      }, 3000);
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error);
    });
}

function emailVhid() {
  var emailInput = document.getElementById("email");
  var passInput = document.getElementById("pass");
  var nameInput = document.getElementById("namee");

  event.preventDefault();

  firebase.auth().createUserWithEmailAndPassword(emailInput.value, passInput.value)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(userCredential);
      console.log(user);
      createUser(user.uid, nameInput.value, passInput.value, emailInput.value);
      localStorage.setItem('user_id',user.uid);
      if(passInput.value == `${admin_password}`){
        setTimeout(function () {
          window.location.href = `admin_page/page.html?id=${user.uid}`;
        }, 5000);
      } else{ 
      setTimeout(function () {
        window.location.href = `tbn.html?id=${user.uid}`;
      }, 5000);
    }
    })
    .catch((error) => {
      console.error("Email/Password Sign-Up Error:", error);
    });
}

function createUser(id, nam, pass, email) {
  let user = {
    name: nam,
    lastname: '',
    password: pass,
    email: email
  };
  db.collection('users').doc(id).set(user)
    .then(res => {
      console.log(res);
    })
    .catch((error) => {
      console.error("Firestore Error:", error);
    });
}
