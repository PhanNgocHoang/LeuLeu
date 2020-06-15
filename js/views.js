const view = {
    showScreens: async(screenName) => {
        let screen= document.querySelector('#app')
        switch (screenName) {
            case 'login':{
                screen.innerHTML =  componentIndex.login
                let signInButton = document.querySelector('a')
                signInButton.onclick = () => {
                    view.showScreens('register')
                }
                let login_form = document.querySelector('#login-form')
                login_form.onsubmit = (event) => {
                    event.preventDefault()
                    let loginInfo = {
                        email: login_form.email.value().trim(),
                        password: login_form.password.value().trim()
                    }
                    controllers.login()
                }
                break
            }
            case 'register':{
                screen.innerHTML = componentIndex.register
                let loginButton = document.querySelector('a')
                loginButton.onclick = ()=>{
                    view.showScreens('login')
                }
                let register_form = document.querySelector('#register-form')
                register_form.onsubmit = (event)=>{
                    event.PreventDefault()
                    registerInfo={
                        nickname: register_form.nickname.value().trim(),
                        email: register_form.email.value().trim().toLowerCase(),
                        dayofbirth: register_form.dayofbirth.value(),
                        password: register_form.password.value().trim(),
                        confirm_password: register_form.confirm-password.value()
                    }
                    controllers.register(registerInfo)
                }
                break
            }
        }
    }
}
