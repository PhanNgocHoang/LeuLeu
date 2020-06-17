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
                let login_form = document.querySelector('#form-login')
                login_form.onsubmit = (event)=>{
                    event.preventDefault()
                    let loginInfo = {
                        email: login_form.email.value.trim(),
                        password: login_form.password.value.trim()
                    }
                    let validateResult =[
                    utils.validateData(loginInfo.email, '#email-error', 'Missing email'),
                    utils.validateData(loginInfo.password, '#password-error','Missing password')
                    ]
                    if(utils.checkValidData(validateResult))
                    {
                        controllers.login(loginInfo)
                    }
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
                    event.preventDefault()
                    registerInfo={
                        nickname: register_form.nickname.value.trim(),
                        email: register_form.email.value.trim().toLowerCase(),
                        dayofbirth: register_form.dayofbirth.value,
                        password: register_form.password.value.trim(),
                        confirm_password: register_form.confirmPassword.value.trim()
                    }
                    let validateResult = [
                        utils.validateData(registerInfo.nickname, '#nickname-error', 'Missing nickname'),
                        utils.validateData(registerInfo.email, '#email-error', 'Missing email'),
                        utils.validateData(registerInfo.dayofbirth, '#birth-error', 'Missing day of birth'),
                        utils.validateData(registerInfo.password && registerInfo.password.length>6, '#password-error', 'The password required and has at least 6 characters password'),
                        utils.validateData(registerInfo.confirm_password && registerInfo.confirm_password == registerInfo.password && registerInfo.password>6,'#confirm-password-error', 'The confirm password must similar password')
                    ]
                    console.log(validateResult)
                    if(utils.checkValidData(validateResult)){
                        controllers.register(registerInfo)
                    }
                }
                break
            }
        }
    }
}
