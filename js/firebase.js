function anonymousLogin() {
  auth.signInAnonymously()
  var user = auth.currentUser;
  if (user.displayName) {
    alert("Welcome back " + user.displayName)
  } else {
    var name = prompt("Please enter your name", "Rita Tingewick");
    user.updateProfile({
      displayName: name
    })
    db.collection("users").doc(name).set({
      uid: user.uid
    })
  }
}
