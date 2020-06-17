window.onload = init;
function init() {
    firebase.auth().onAuthStateChanged((user)=>{
        if (user && user.emailVerified)
        {
            view.showScreens('register')
        }
        else {
            view.showScreens('login')
        }
    })
}