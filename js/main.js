window.onload = init;
function init() {
    firebase.auth().onAuthStateChanged((user)=>{
        if (user && user.emailVerified)
        {
            alert("hihohi")
        }
        view.showScreens('login')
    })
}