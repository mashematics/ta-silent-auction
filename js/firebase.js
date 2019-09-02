function anonymousLogin() {
  auth.signInAnonymously()
  .then(function() {
    var user = auth.currentUser;
    if (user.displayName) {
      document.getElementById("login-button").innerHTML = "Hi " + user.displayName;
    } else {
      var name = prompt("Please enter your name", "Rita Tingewick");
      user.updateProfile({
        displayName: name
      })
      document.getElementById("login-button").innerHTML = "Hi " + name;
      db.collection("users").doc(name).set({
        uid: user.uid
      })
    }
  })
}
