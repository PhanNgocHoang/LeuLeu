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
                    let view = document.querySelector('.previewBtn')
                    view.onclick = (event) => {
                        event.preventDefault()
                        let showPreview = document.querySelector('.previewArea')
                        let text = document.getElementById('content').value
                        let backgroundColor = document.getElementById('backgroundPost').value
                        let color = document.getElementById('colorText').value
                        let contentPreview = document.querySelector('.contentPreview')
                        contentPreview.innerText = text
                        showPreview.style.background = backgroundColor
                    }
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
                let btnLogOut = document.querySelector('#signOut')
                btnLogOut.onclick = (event) => {
                    event.preventDefault()
                    firebase.auth().signOut()
                }
                let allComment = document.querySelector('.allComment')
                let commentBtn = document.querySelector('.commentBtn')
                commentBtn.onclick = async(event) => {
                    event.preventDefault()
                    allComment.style.display = 'list-item'
                    let x = document.querySelector('.userPost')
                    let postInfo ={
                        id:x.getAttribute('postId'),
                    }
                    await controllers.getComment(postInfo)
                    view.showComment(models.currentPost)
                    utils.disabledButton('.commentBtn')
                }
                let likeBtn = document.querySelector('.likeBtn')
                likeBtn.onclick = (event) =>{
                    event.preventDefault()
                    let likeInfo ={
                        likeOwner: email,
                        createAt: new Date().toISOString()
                    }
                    controllers.updateLikes(likeInfo)
                }

    
            }
        }
    },
    showListPosts(listPosts) {
        let currentUser = firebase.auth().currentUser.email
        let post = document.querySelector('.post')
        for (let posts of listPosts) {
            let background = posts.backgroundColor
            let color = posts.textColor
            let createAt =  new Date(posts.createAt).toLocaleString()
            let likeNumber = posts.like.length
            let commentNumber = posts.comment.length
                if(posts.image=="") {
                    let contentPostHtml =`
                    <div class="userPost" postId="${posts.id}">
                            <div class="header-userPost">
                                <div class="userInfo">
                                    <a href="#">
                                        <img class="userImg"
                                            src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D"
                                            alt="">
                                    </a>
                                    <div class="userStatus">
                                        <div class="statusDetail">
                                            <a href="#">
                                                <span class="userName">${posts.owner}</span>
                                            </a>
                                            <span class="status">${posts.title}</span>
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
                            </div>
                            <div class="body-userPost">
                                <div class="contentPost">
                                   ${posts.content}
                                </div>
                                <div class="content-addPic"></div>
                            </div>
                            <div class="footer-userPost">
                                <div class="reaction-number">
                                    <div class="like-userPost-number">
                                        <a href="#" data-toggle="modal" data-target="#likePostUser">
                                            <i class="fa fa-thumbs-up" style="color: #28a745; font-size: 20px;"></i>
                                            <div class="number-like">${likeNumber}</div>
                                        </a>
                                    </div>
                                    <div class="comment-userPost-number">
                                        <a href="#">
                                            <div class="number-comment">${commentNumber}</div>
                                            <span>bình luận </span>
                                        </a>
                                    </div>
                                </div>
                                <div class="react border border-left-0 border-right-0">
                                    <div class="like-userPost">
                                        <button class="likeBtn">
                                            <i class="fa fa-thumbs-o-up"></i>
                                            <span>Thích</span>
                                        </button>
                                    </div>
                                    <div class="comment-userPost">
                                        <button class="commentBtn">
                                            <i class="material-icons">chat_bubble_outline</i>
                                            <span>Comment</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="allComment">
                                    
                                </div>
                            </div>
                        </div>
                    </div>`
                    post.innerHTML += contentPostHtml
                    
                }
                else {
                    let contentPostHtml =`
                    <div class="userPost">
                            <div class="header-userPost">
                                <div class="userInfo">
                                    <a href="#">
                                        <img class="userImg"
                                            src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D"
                                            alt="">
                                    </a>
                                    <div class="userStatus">
                                        <div class="statusDetail">
                                            <a href="#">
                                                <span class="userName">${posts.owner}</span>
                                            </a>
                                            <span class="status">${posts.title}</span>
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
                            </div>
                            <div class="body-userPost">
                                <div class="contentPost">
                                   ${posts.content}
                                </div>
                                <div class="content-updatePic">
                                    <img src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D"
                                        alt="">
                                </div>
                                <div class="content-addPic"></div>
                            </div>
                            <div class="footer-userPost">
                                <div class="reaction-number">
                                    <div class="like-userPost-number">
                                        <a href="#" data-toggle="modal" data-target="#likePostUser">
                                            <i class="fa fa-thumbs-up" style="color: #28a745; font-size: 20px;"></i>
                                            <div class="number-like">${likeNumber}</div>
                                        </a>
                                    </div>
                                    <div class="comment-userPost-number">
                                        <a href="#">
                                            <div class="number-comment">${commentNumber}</div>
                                            <span>bình luận </span>
                                        </a>
                                    </div>
                                </div>
                                <div class="react border border-left-0 border-right-0">
                                    <div class="like-userPost">
                                        <button class="likeBtn">
                                            <i class="fa fa-thumbs-o-up"></i>
                                            <span>Thích</span>
                                        </button>
                                    </div>
                                    <div class="comment-userPost">
                                        <button class="commentBtn">
                                            <i class="material-icons">chat_bubble_outline</i>
                                            <span>Comment</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="allComment">
                                </div>
                            </div>
                        </div>
                    </div>`
                    post.innerHTML += contentPostHtml
            }
            let contentPost = document.querySelector('.body-userPost')
            contentPost.style.background = background
            contentPost.style.color = color
            let likeBtn = document.querySelector('.likeBtn')
            for (let like of posts.like) {
                if(like.likeOwner.includes(currentUser) == true) {
                    likeBtn.style.background = "#66ccff"
                }
                else {
                    likeBtn.style.background = "#ffffff"
                }
            }
        }
    },
    showComment(commentInfo){
        for (let comment of commentInfo) {
            let allComment = document.querySelector('.allComment')
            let htmlComment = `
            <div class="selfComment border border-left-0 border-top-0 border-right-0">
                                            <div class="currentImgComment">
                                                <img src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D" alt="">
                                            </div>
                                            <div class="inputComment">
                                                <input type="text" name="comment" placeholder="  Hãy nhập bình luận . . .">
                                            </div>
                                        </div>
                                        <div class="otherComment">
                                            <div class="comment-user-1">
                                                <div class="left-comment">
                                                    <div class="userImgComment">
                                                        <img src="https://scontent.fhph1-2.fna.fbcdn.net/v/t1.0-9/100906661_10157758034774234_2781386823492522160_o.jpg?_nc_cat=1&_nc_sid=8024bb&_nc_oc=AQkNkxKvbJex-lLw1YlA8LwTvOwkC3wQB87g7BwRLP3Y3URIdUQSPyu6xJ42cKC3QLE&_nc_ht=scontent.fhph1-2.fna&oh=82e8de58b57e43ee0b6c5a8e87ff6e67&oe=5F05D598" alt="">
                                                    </div>
                                                    <div>
                                                        <div class="content-comment">
                                                            <a href="#" class="name">${comment.commentOwner}</a>
                                                            <span>${comment.commentContent}</span>
                                                        </div>
                                                        <div class="react-comment">
                                                            <div class="timeDetail">${new Date(comment.createAt).toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="right-comment">
                                                    <button class="btn">...</button>
                                                </div>
                                            </div>
                                        </div>`
            allComment.innerHTML += htmlComment
        }
    }


}
