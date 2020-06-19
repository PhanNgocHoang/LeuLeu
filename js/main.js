window.onload = init;
function init() {
    firebase.auth().onAuthStateChanged((user)=>{
        if (user && user.emailVerified)
        {
            view.showScreens('home')
        }
        else {
            view.showScreens('login')
        }
    })
}