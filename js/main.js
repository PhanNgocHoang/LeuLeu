window.onload = init;
function init() {
    firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified) {
            view.showScreens("HIHIHIHI")
        }
        view.showScreens('login')
    })
}