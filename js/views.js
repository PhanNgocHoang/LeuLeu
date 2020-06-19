const view = {
    showScreens: async (screenName) => {
        let screen = document.querySelector('#app')
        switch (screenName) {
            case 'login': {
                screen.innerHTML = componentIndex.login
                let signInButton = document.querySelector('a')
                signInButton.onclick = () => {
                    view.showScreens('register')
                }
                let login_form = document.querySelector('#form-login')
                login_form.onsubmit = (event) => {
                    event.preventDefault()
                    let loginInfo = {
                        email: login_form.email.value.trim(),
                        password: login_form.password.value.trim()
                    }
                    let validateResult = [
                        utils.validateData(loginInfo.email, '#email-error', 'Missing email'),
                        utils.validateData(loginInfo.password, '#password-error', 'Missing password')
                    ]
                    if (utils.checkValidData(validateResult)) {
                        controllers.login(loginInfo)
                    }
                }
                break
            }
            case 'register': {
                screen.innerHTML = componentIndex.register
                let loginButton = document.querySelector('a')
                loginButton.onclick = () => {
                    view.showScreens('login')
                }
                let register_form = document.querySelector('#register-form')
                register_form.onsubmit = (event) => {
                    event.preventDefault()
                    registerInfo = {
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
                        utils.validateData(registerInfo.password && registerInfo.password.length > 6, '#password-error', 'The password required and has at least 6 characters password'),
                        utils.validateData(registerInfo.confirm_password && registerInfo.confirm_password == registerInfo.password && registerInfo.password > 6, '#confirm-password-error', 'The confirm password must similar password')
                    ]
                    if (utils.checkValidData(validateResult)) {
                        controllers.register(registerInfo)
                    }
                }
                break
            }
            case 'home': {
                screen.innerHTML = componentHome.nav + componentHome.bodyCenter + componentHome.listFriends
                let nickname = firebase.auth().currentUser.displayName
                let email = firebase.auth().currentUser.email
                utils.setText('.currentLink', nickname)
                await controllers.loadListFriends(email)
                await controllers.loadPost(email)
                view.showListPosts(models.listPost)
                let buttonCreatePost = document.querySelector('.createPostBtn')
                buttonCreatePost.onclick = (event) => {
                    event.preventDefault()
                    screen.innerHTML += componentHome.createPost
                    let createPost = document.querySelector('#form-createPost')
                    createPost.onsubmit = (event) => {
                        event.preventDefault()
                        if (!createPost.fileUpload.files[0]) {
                            let postInfo = {
                                content: createPost.content.value.trim(),
                                backgroud: createPost.backgroudColor.value,
                                textColor: createPost.TextColor.value 
                            }
                            let validateResult = [
                                utils.validateData(postInfo.content, '#content-error', 'Missing content')
                            ]
                            console.log(utils.checkValidData(validateResult))
                            if(utils.checkValidData(validateResult)){
                                controllers.createPost(postInfo)
                            }
                        }
                        // else {
                        //     let postInfo = {
                        //         content: createPost.content.value.trim(),
                        //         file: createPost.fileUpload.files
                        //     }
                        //     let validateResult = [
                        //         utils.validateData(postInfo.file[0].size <= 26214400, '#file-error', 'The File Size is too large'),
                        //         utils.validateData(postInfo.content, '#content-error', 'Missing content')
                        //     ]
                        // }
                    }
                }
                // let btnLogOut = document.querySelector('#signOut')
                // btnLogOut.onclick = (event) => {
                //     event.preventDefault()
                //     firebase.auth().signOut()
                // }
                let allComments = document.querySelector('.allComment')
                let commentBtn = document.querySelector('.commentBtn')
                commentBtn.onclick = (event) => {
                    event.preventDefault()
                    allComments.style.display = 'list-item'
                }

    
            }
        }
    },
    showListPosts(listPosts) {
        let currentUser = firebase.auth().currentUser.email
        let OwnerInfo = document.querySelector('.header-userPost')
        let contentPost = document.querySelector('.body-userPost')
        let tagNumberLike = document.querySelector('.number-like')
        let tagNumberComment = document.querySelector('.number-comment')
        let likeBtn = document.querySelector('.likeBtn')
        for (let posts of listPosts) {
            let background = posts.backgroundColor
            let color = posts.textColor
            let createAt =  new Date(posts.createAt).toLocaleString()
            let likeNumber = posts.like.length
            let commentNumber = posts.comment.length
            let htmlUserInfo = `
            <div class="userInfo">
            <img class="userImg"
            src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D"
            alt="">
    </a>
    <div class="userStatus">
        <div class="statusDetail">
            <a href="#">
                <span class="userName">${posts.owner}</span>
            </a>
            <span class="status"> đã cập nhật ảnh đại diện</span>
        </div>
        <div class="timeDetail" style="font-size: 12px;">
            ${createAt}
        </div>
    </div>
            </div>
            <div class="user-setting">
                <button class="btn">
                    <span>...</span>
                </button>
            </div>
            `
            OwnerInfo.innerHTML += htmlUserInfo
            for (let like of posts.like) {
                if(like.likeOwner.includes(currentUser) == true) {
                    likeBtn.style.background = "#66ccff"
                }
                else {
                    likeBtn.style.background = "#ffffff"
                }
            }
            if(posts.image=="") {
                let contentPostHtml =`
                <div class="contentPost">
                       ${posts.content}
                    </div>
                    <div class="content-addPic"></div>
                    </div>`
                contentPost.innerHTML += contentPostHtml
                
            }
            else {
                let contentPostHtml =`
                <div class="contentPost">
                       ${posts.content}
                    </div>
                    <div class="content-updatePic">
                        <img src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D"
                            alt="">
                    </div>
                    <div class="content-addPic"></div>`
                    contentPost.innerHTML += contentPostHtml
            }
            contentPost.style.background = background
            contentPost.style.color = color
            tagNumberLike.innerText = likeNumber
            tagNumberComment.innerText = commentNumber
        }
    },
    showComment(){

    }


}
