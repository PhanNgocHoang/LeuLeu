const controllers = {
    register: async (userInfo) => {
        let nickname = userInfo.nickname
        let email = userInfo.email
        let avatar = userInfo.avatar
        let dayofbirth = userInfo.dayofbirth
        let password = userInfo.password
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            await firebase.auth().currentUser.updateProfile({
                nickname: nickname,
                dayofbirth: dayofbirth,
                avatar: avatar
            })
            await firebase.auth().currentUser.sendEmailVerification()
        } catch (err) {
            console.log(err)
        }
    },
    login: async (loginInfo) => {
        let email = loginInfo.email
        let password = loginInfo.password
        utils.setText('#login-message', '')
        utils.disabledButton('#login-btn')
        try{
            let result = await firebase.auth().signInWithEmailAndPassword(email, password)
            if(result.user && result.user.emailVerified){
                alert('OK login success')
            }
            else{
                throw new Error('Email must verified')
            }
        } catch (Error) {
            utils.setText('#login-message', Error.message)
        }
    }
}