const view = {
    showScreens: async(screenName) => {
        let screen= document.querySelector('#app')
        switch (screenName) {
            case 'login':{
                screen.innerHTML =  componentIndex.login
                let signInButton = document.querySelector('#dangky')
                signInButton.onclick = () => {
                    view.showScreens('register')
                }
            }
            case 'register':{
                screen.innerHTML = componentIndex.register
                let loginButton = document.querySelector('#dangnhap')
                loginButton.onclick = ()=>{
                    view.showScreens('login')
                }
            }
        }
    }
}