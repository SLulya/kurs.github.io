let admin_password = 4559865;

function real_vhid_email_pass(event){
    let email_vhid = document.getElementById(`email_vhid`)
    let pass_vhid = document.getElementById('pass_vhid')
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email_vhid.value, pass_vhid.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      localStorage.setItem('user_id',user.uid);
      if(pass_vhid == admin_password){
        setTimeout(function () {
          window.location.href = `admin_page.html?id=${user.uid}`;
        }, 5000);
      }else{ 
      setTimeout(function () {
        window.location.href = `tbn.html?id=${user.uid}`;
      }, 5000);}
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  

function googleVhid() {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      console.log(result);
      console.log(user);
      db.collection('users').doc(user.uid).get().then(res =>{
        console.log(res)
        if(res._delegate._document == null){
          createUser(user.uid, user.displayName, '', user.email);
        } else {
        
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