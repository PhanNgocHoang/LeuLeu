const view = {
    showScreens: async (screenName) => {
        let screen = document.querySelector('#app')
        switch (screenName) {
            case 'login': {
                screen.innerHTML = componentIndex.login
                let signInButton = document.querySelector('a')
                let body = document.getElementsByTagName('body')
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
                        confirm_password: register_form.confirmPassword.value.trim(),
                        gender: register_form.gender.value.toLowerCase(),
                    }
                    let validateResult = [
                        utils.validateData(registerInfo.nickname, '#nickname-error', 'Missing nickname'),
                        utils.validateData(registerInfo.email, '#email-error', 'Missing email'),
                        utils.validateData(registerInfo.dayofbirth, '#birth-error', 'Missing day of birth'),
                        utils.validateData(registerInfo.password && registerInfo.password.length > 6, '#password-error', 'The password required and has at least 6 characters password'),
                        utils.validateData(registerInfo.confirm_password && registerInfo.confirm_password == registerInfo.password && registerInfo.password > 6, '#confirm-password-error', 'The confirm password must similar password'),
                        utils.validateData(registerInfo.gender == 'male' || registerInfo.gender == 'female', '#gender-error', 'Please choose male or female')
                    ]
                    if (utils.checkValidData(validateResult)) {
                        controllers.register(registerInfo)
                    }
                }
                break
            }
            case 'home': {
                screen.innerHTML = componentHome.nav + componentHome.bodyCenter + componentHome.listFriends
                var nickname = firebase.auth().currentUser.displayName
                var email = firebase.auth().currentUser.email
                var avatar = firebase.auth().currentUser.photoURL
                var avatarUser = document.querySelector('.currentImg')
                document.querySelector('.avatar').src = avatar
                var avatarUserDetail = document.querySelector('.resImage')
                avatarUserDetail.src = avatar
                avatarUser.src = avatar
                utils.setText('.currentLink', nickname)
                utils.setText('.currentName', nickname)
                await controllers.loadListFriends(email)
                await controllers.loadPost(email)
                await controllers.listFriendsInfo()
                await controllers.getUserProfile()
                let buttonCreatePost = document.querySelector('.createPostBtn')
                buttonCreatePost.onclick = (event) => {
                    event.preventDefault()
                    screen.innerHTML += componentHome.createPost
                    let view = document.querySelector('.previewBtn')
                    view.onclick = (event) => {
                        event.preventDefault()
                        let text = document.getElementById('content').value
                        let contentPreview = document.querySelector('.contentPreview')
                        let fileUpload = document.querySelector('#file').files
                        contentPreview.innerText = text
                    }
                    let createPost = document.querySelector('#form-createPost')
                    createPost.onsubmit = (event) => {
                        event.preventDefault()
                        if (!createPost.fileUpload.files[0]) {
                            let postInfo = {
                                content: createPost.content.value.trim(),
                            }
                            let validateResult = [
                                utils.validateData(postInfo.content, '#content-error', 'Missing content'),
                            ]
                            if (utils.checkValidData(validateResult)) {
                                // utils.disabledButton('.upload')
                                // controllers.createPost(postInfo)
                            }
                        }
                        else {
                            let postInfo = {
                                content: createPost.content.value.trim(),
                                file: createPost.file.files,
                            }
                            console.log(postInfo)
                            let validateResult = [
                                utils.validateData(postInfo.file[0].size <= 26214400, '#file-error', 'The File Size is too large'),
                                utils.validateData(postInfo.content, '#content-error', 'Missing content'),
                            ]
                            if (utils.checkValidData(validateResult)) {
                                controllers.createPost(postInfo)
                            }

                        }
                    }
                }
                let formSearcher = document.querySelector('#search')
                formSearcher.onsubmit = async (event) => {
                    event.preventDefault()
                    screen.innerHTML = componentHome.nav + componentHome.searchPage
                    let searchValue = {
                        searchKey: formSearcher.searchBar.value.trim()
                    }
                    let validateResult = [
                        utils.validateSearch(searchValue.searchKey, 'Please enter value for search (nick name)')
                    ]
                    if (utils.checkValidData(validateResult)) {
                        await controllers.searchFriend(searchValue)
                        await view.showSearchResults(models.searchResults, searchValue.searchKey)
                        let home = document.querySelector('.btnHome')
                        home.onclick = () => {
                            view.showScreens('home')
                        }
                        let btnLogOut = document.querySelector('#signOut')
                        btnLogOut.onclick = (event) => {
                            event.preventDefault()
                            firebase.auth().signOut()
                        }
                        let btnAddFriends = document.querySelectorAll('.addFriendResult')
                        for (let btnAdd of btnAddFriends) {
                            let addFriend = btnAdd.querySelector('#addFriend')
                            addFriend.onclick = (event) => {
                                event.preventDefault()
                                let friendInfo = addFriend.getAttribute('userEmail')
                                let statusFriend = models.listFriends.includes(friendInfo)
                                if (statusFriend == friend) {
                                    utils.disabledButton('#addFriend')
                                    notification.remove()
                                    alert('Can not add friend')
                                }
                                else {
                                    view.showNotification()
                                    controllers.addFriends(friendInfo)
                                }
                            }
                        }
                    }
                }
                view.showListFriend(models.friendInfo)
                let listFriend = document.querySelectorAll('.your-friend')
                for (let friend of listFriend) {
                    let aFriend = friend.querySelector('#profile')
                    aFriend.onclick = (event) => {
                        event.preventDefault()
                        console.log(friend.querySelector('.friendInfoBtn').getAttribute('friendEmail'))
                    }
                }

                view.showListPosts(models.listPost, models.friendInfo)
                let userPosts = document.querySelectorAll('.userPost')
                for (const userPost of userPosts) {
                    let likeBtn = userPost.querySelector('.likeBtn')
                    likeBtn.onclick = (event) => {
                        event.preventDefault()
                        let postId = userPost.getAttribute('postId')
                        let post = models.listPost.find(post => post.id == postId)
                        if (post.like.includes(email) == false) {
                            controllers.updateLikes(email, postId)
                            let likeNumber = userPost.querySelector('.number-like')
                            likeNumber.innerText = parseInt(likeNumber.innerText) + 1
                        }
                        else {
                            let c = confirm('Bạn đã like bài này. Bạn có muốn dislike không?')
                            if (c == true) {
                                controllers.dislike(email, postId)
                                let likeNumber = userPost.querySelector('.number-like')
                                likeNumber.innerText = parseInt(likeNumber.innerText) - 1
                            }
                        }
                    }
                    let commentBtn = userPost.querySelector('.commentBtn')
                    commentBtn.onclick = async (event) => {
                        event.preventDefault()
                        let postInfo = {
                            id: userPost.getAttribute('postId'),
                        }
                        controllers.getComment(postInfo.id)
                        let post = models.listPost.find(post => post.id == postInfo.id)
                        controllers.setupPostChange(models.currentPost)
                        await view.showComment(post, models.userInfo, post.id)
                        let formCmt = userPost.querySelector('#commentForm')
                        formCmt.onsubmit = (event) => {
                            event.preventDefault()
                            let cmtInfo = {
                                content: formCmt.comment.value.trim()
                            }
                            let validateResult = [
                                utils.validateData(cmtInfo.content, '#content-error', 'Missing comment content')
                            ]
                            if (utils.checkValidData(validateResult)) {
                                controllers.addComment(cmtInfo.content, email, postInfo.id)
                                userPost.querySelector('#commentContent').value = ''
                            }
                        }
                    }
                }
                let btnYourProfile = document.querySelector('.your-profile')
                btnYourProfile.onclick = async (event) => {
                    event.preventDefault()
                    let yourPost = []
                    for (let post of models.listPost) {
                        if (post.owner == email) {
                            yourPost.push(post)
                        }
                    }
                    let post = document.querySelector('.userPost')
                    post.innerHTML = ''
                    view.showProfile()
                    view.showListPosts(yourPost, models.friendInfo)
                    let home = document.querySelector('.btnHome')
                    home.onclick = () => {
                        view.showScreens('home')
                    }
                    let btnLogOut = document.querySelector('#signOut')
                    btnLogOut.onclick = (event) => {
                        event.preventDefault()
                        firebase.auth().signOut()
                    }
                }
                let home = document.querySelector('.btnHome')
                home.onclick = () => {
                    view.showScreens('home')
                }
                let btnLogOut = document.querySelector('#signOut')
                btnLogOut.onclick = (event) => {
                    event.preventDefault()
                    firebase.auth().signOut()
                }
                let btnFriendRequest = document.querySelector('#friendRequest')
                btnFriendRequest.onclick = (event) => {
                    event.preventDefault()
                    document.querySelector('.body-center').innerHTML = ''
                    document.querySelector('.body-left').innerHTML = ''
                    screen.innerHTML += componentHome.friendRequest
                    view.showFriendRequest(models.userInfo, models.listFriendsDisAgr)
                    let agreeBtn = document.querySelectorAll('.single-request')
                    for (let agree of agreeBtn) {
                        let aBtnAgree = agree.querySelector('#agree')
                        aBtnAgree.onclick = (event) => {
                            event.preventDefault()
                            let friendEmail = agree.querySelector('.emailRequest').innerText
                            controllers.agreeFriendRequest(friendEmail, email)
                        }
                        let btnDis = agree.querySelector('#dGree')
                        btnDis.onclick = (event) => {
                            event.preventDefault()
                            let friendEmail = agree.querySelector('.emailRequest').innerText
                            controllers.DisagreeFriendRequest(friendEmail, email)
                        }
                    }
                    let home = document.querySelector('.btnHome')
                    home.onclick = () => {
                        view.showScreens('home')
                    }
                    let btnLogOut = document.querySelector('#signOut')
                        btnLogOut.onclick = (event) => {
                            event.preventDefault()
                            firebase.auth().signOut()
                        }
                }

            }
        }
    },
    showListPosts(listPosts, FriendInfo) {
        let Posts = document.querySelector('.post')
        for (let post of listPosts) {
            if (post.owner == firebase.auth().currentUser.email) {
                if (post.image == "") {
                    let contentPostHtml = `
                    <div class="userPost" postId="${post.id}">
                            <div class="header-userPost">
                                <div class="userInfo">
                                    <a href="#">
                                        <img class="userImg"
                                            src="${firebase.auth().currentUser.photoURL}"
                                            alt="">
                                    </a>
                                    <div class="userStatus">
                                        <div class="statusDetail">
                                            <a href="#">
                                                <span class="userName">${firebase.auth().currentUser.displayName}</span>
                                            </a>
                                            <span class="status">${post.title}</span>
                                        </div>
                                        <div class="timeDetail" style="font-size: 12px;">
                                            ${new Date(post.createAt).toLocaleString()}
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
                                   ${post.content}
                                </div>
                                <div class="content-addPic"></div>
                            </div>
                            <div class="footer-userPost">
                                <div class="reaction-number">
                                    <div class="like-userPost-number">
                                        <a href="#" data-toggle="modal" data-target="#likePostUser" class="likeNumber">
                                            <i class="fa fa-thumbs-up" style="color: #28a745; font-size: 20px;"></i>
                                            <div class="number-like">${post.like.length}</div>
                                        </a>
                                    </div>
                                    <div class="comment-userPost-number">
                                        <a href="#">
                                            <div class="number-comment">${post.comment.length}</div>
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
                    Posts.innerHTML += contentPostHtml

                }
                else {
                    let contentPostHtml = `
                    <div class="userPost" postId="${post.id}">
                            <div class="header-userPost">
                                <div class="userInfo">
                                    <a href="#">
                                        <img class="userImg"
                                            src="${firebase.auth().currentUser.photoURL}"
                                            alt="">
                                    </a>
                                    <div class="userStatus">
                                        <div class="statusDetail">
                                            <a href="#">
                                                <span class="userName">${firebase.auth().currentUser.displayName}</span>
                                            </a>
                                            <span class="status">${post.title}</span>
                                        </div>
                                        <div class="timeDetail" style="font-size: 12px;">
                                            ${new Date(post.createAt).toLocaleString()}
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
                                   ${post.content}
                                </div>
                                <div class="content-updatePic">
                                    <img src="${post.image}"
                                        alt="">
                                </div>
                                <div class="content-addPic"></div>
                            </div>
                            <div class="footer-userPost">
                                <div class="reaction-number">
                                    <div class="like-userPost-number">
                                        <a href="#" data-toggle="modal" data-target="#likePostUser">
                                            <i class="fa fa-thumbs-up" style="color: #28a745; font-size: 20px;"></i>
                                            <div class="number-like">${post.like.length}</div>
                                        </a>
                                    </div>
                                    <div class="comment-userPost-number">
                                        <a href="#">
                                            <div class="number-comment">${post.comment.length}</div>
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
                    Posts.innerHTML += contentPostHtml
                }
            }
            else {
                let ownerInfo = FriendInfo.find(userEmail => userEmail.userEmail == post.owner)
                if (post.image == "") {
                    let contentPostHtml = `
                    <div class="userPost" postId="${post.id}">
                            <div class="header-userPost">
                                <div class="userInfo">
                                    <a href="#">
                                        <img class="userImg"
                                            src="${ownerInfo.userAvatar}"
                                            alt="">
                                    </a>
                                    <div class="userStatus">
                                        <div class="statusDetail">
                                            <a href="#">
                                                <span class="userName">${ownerInfo.nickName}</span>
                                            </a>
                                            <span class="status">${post.title}</span>
                                        </div>
                                        <div class="timeDetail" style="font-size: 12px;">
                                            ${new Date(post.createAt).toLocaleString()}
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
                                   ${post.content}
                                </div>
                                <div class="content-addPic"></div>
                            </div>
                            <div class="footer-userPost">
                                <div class="reaction-number">
                                    <div class="like-userPost-number">
                                        <a href="#" data-toggle="modal" data-target="#likePostUser">
                                            <i class="fa fa-thumbs-up" style="color: #28a745; font-size: 20px;"></i>
                                            <div class="number-like">${post.like.length}</div>
                                        </a>
                                    </div>
                                    <div class="comment-userPost-number">
                                        <a href="#">
                                            <div class="number-comment">${post.comment.length}</div>
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
                    Posts.innerHTML += contentPostHtml

                }
                else {
                    let contentPostHtml = `
                    <div class="userPost" postId="${post.id}">
                            <div class="header-userPost">
                                <div class="userInfo">
                                    <a href="#">
                                        <img class="userImg"
                                            src="${firebase.auth().currentUser.photoURL}"
                                            alt="">
                                    </a>
                                    <div class="userStatus">
                                        <div class="statusDetail">
                                            <a href="#">
                                                <span class="userName">${firebase.auth().currentUser.displayName}</span>
                                            </a>
                                            <span class="status">${post.title}</span>
                                        </div>
                                        <div class="timeDetail" style="font-size: 12px;">
                                            ${new Date(post.createAt).toLocaleString()}
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
                                   ${post.content}
                                </div>
                                <div class="content-updatePic">
                                    <img src="${post.image}"
                                        alt="">
                                </div>
                                <div class="content-addPic"></div>
                            </div>
                            <div class="footer-userPost">
                                <div class="reaction-number">
                                    <div class="like-userPost-number">
                                        <a href="#" data-toggle="modal" data-target="#likePostUser">
                                            <i class="fa fa-thumbs-up" style="color: #28a745; font-size: 20px;"></i>
                                            <div class="number-like">${post.like.length}</div>
                                        </a>
                                    </div>
                                    <div class="comment-userPost-number">
                                        <a href="#">
                                            <div class="number-comment">${post.comment.length}</div>
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
                    Posts.innerHTML += contentPostHtml
                }
            }
        }
    },
    showComment(post, userInfo, postId) {
        let userPost = document.querySelector('.userPost[postId=' + postId + ']')
        let allComment = userPost.querySelector('.allComment')
        let html = `
        <div class="selfComment border border-left-0 border-top-0 border-right-0">
            <div class="currentImgComment">
                <img src="${firebase.auth().currentUser.photoURL}" alt="">
            </div>
            <div class="inputComment">
            <form id="commentForm">
                <input type="text" name="comment" placeholder="  Hãy nhập bình luận . . ." required id="commentContent">
                <div class="message-error" id="content-error"></div>
                <input type="submit" class ="btn btn-primary" value="Bình luận">
            <form>
            </div>
        </div>
        <div class="otherComment">
        `;
        for (let comment of post.comment) {
            if (comment.commentOwner == firebase.auth().currentUser.email) {
                html += `
            <div class="comment-user-1">
                <div class="left-comment">
                    <div class="userImgComment">
                        <img src="${firebase.auth().currentUser.photoURL}" alt="">
                    </div>
                    <div>
                        <div class="content-comment">
                            <a href="#" class="name">${firebase.auth().currentUser.displayName}</a>
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
            </div>`
            }
            else {
                let owner = userInfo.find(user => user.userEmail == comment.commentOwner)
                html += `
                <div class="comment-user-1">
                    <div class="left-comment">
                        <div class="userImgComment">
                            <img src="${owner.userAvatar}" alt="">
                        </div>
                        <div>
                            <div class="content-comment">
                                <a href="#" class="name">${owner.nickName}</a>
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
                </div>`
            }
        }
        html += `</div>`
        allComment.innerHTML = html
        allComment.style.display = 'block'
    },
    showListFriend: (listFriend) => {
        let friends = document.querySelector('.body-listFriend')
        for (let friend of listFriend) {
            htmlListFriend = `
            <div class="your-friend" >
                    <button class="friendInfoBtn" data-toggle="collapse" data-target="#action-1" friendEmail="${friend.userEmail}">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="friendPicture">
                                        <img src="${friend.userAvatar}"
                                            alt="pic">
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="friendInfo">
                                        <span class="name">${friend.nickName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                    <div class="collapse action" id="action-1">
                                <button class="btn-action btn btn-info" id="profile">
                                        Xem trang cá nhân
                                </button>
                                <button class="btn-action btn btn-success">
                                        Chat
                                </button>
                            </div>
            </div>`
            friends.innerHTML += htmlListFriend
        }
    },
    showSearchResults: (searchResults, valueInput) => {
        let keySearch = document.querySelector('.keyWord')
        keySearch.innerText = valueInput
        let showResults = document.querySelector('.allResult')
        for (let result of searchResults) {
            let htmlSearch = `
            <div class="single-result border border-left-0 border-right-0 border-bottom-0">
            <div class="imgUserResult">
                <img src="${result.userAvatar}" alt="">
            </div>
            <div class="infoUserResult">
                <span class="nameResult">${result.nickName}</span>
                <span class="emailResult">${result.userEmail}</span>
            </div>
            <div class="addFriendResult">
                <button type="button" data-toggle="modal" data-target="#addFriendRequest" id="addFriend" userEmail=${result.userEmail}>
                    <i class="material-icons">person_add</i>
                </button>
            </div>
        </div>`
            showResults.innerHTML += htmlSearch
        }
    },
    showNotification: () => {
        let addFriend = document.querySelector('.searchBody')
        let html = `
        <div class="modal fade" id="addFriendRequest">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Kết bạn</h3>
                </div>
                <div class="add-friend-notification">
                    <span>Đã gửi yêu cầu kết bạn</span>
                </div>
                <div class="add-friend-setting-button">
                    <button class="btn btn-success" data-dismiss="modal">Đồng ý</button>
                </div>
            </div>
        </div>
        `
        addFriend.innerHTML += html
    },
    showProfile: () => {
        let bodyCenter = document.querySelector('#app')
        let html = `
        <section class="profileBody">
        <div class="headerProfile">
            <div class="backgroundImgProfile">
                <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/104493659_137310848006710_4173352029415994070_n.jpg?_nc_cat=104&_nc_sid=110474&_nc_oc=AQlw8MS_11lnaA0dJjoCVyxBzOoQ6rjZwO4122OdVEWY5TyGdFDFTremECPmxvlw2eM&_nc_ht=scontent.fhan2-4.fna&oh=888eebdcaa305db71e53a763591cb8fa&oe=5F188C34" alt="">
            </div>
            <div class="imgProfile">
                <img src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D" alt="">
            </div>
            <div class="nameProfile">Vũ Quang Minh</div>
        </div>
        <div class="bodyProfile">
            <!-- introduction -->
            <div class="introduction">
                <h3>Giới thiệu</h3>
                <div class="genderProfile">
                    Giới tính
                    <span style="color: #28a745;">Nam</span>
                </div>
                <div class="dobProfile">
                    Ngày sinh
                    <span style="color: #28a745;">26/3/2001</span>
                </div>
                <div class="emailProfile">
                    Email
                    <span style="color: #28a745;">a@gmail.com</span>
                </div>
                <div class="editProfile">
                    <button type="button" data-toggle="modal" data-target="#editBackgroundModal">Sửa ảnh nền</button>
                    <button type="button" data-toggle="modal" data-target="#editPicModal">Sửa ảnh đại diện</button>
                    <button type="button" data-toggle="modal" data-target="#editInfoModal">Sửa thông tin cá nhân</button>
                </div>
            </div>
        </section>`
        bodyCenter.innerHTML += html;
    },
    showFriendRequest: (userInfo, friendRequest) => {
        let app = document.querySelector('.allRequest');
        friendRequest.splice(friendRequest.indexOf(firebase.auth().currentUser.email), 1);
        let info = []
        for (let i = 0; i < friendRequest.length; i++) {
            info.push(userInfo.find(userInfo => userInfo.userEmail == friendRequest[i]))
        }
        for (let user of info) {
            let html = `
            <div class="single-request border border-left-0 border-right-0 border-bottom-0">
                <div class="imgUserRequest">
                    <img src="${user.userAvatar}" alt="">
                </div>
                <div class="infoUserRequest">
                    <span class="nameRequest">${user.nickName}</span>
                    <span class="emailRequest">${user.userEmail}</span>
                </div>
                <div class="settingFriendRequest">
                    <button type="button" data-toggle="modal" data-target="#exceptFriendRequest" id="agree">
                        <i class="material-icons" style="color: #28a745;">done</i>
                    </button>
                    <button type="button" data-toggle="modal" data-target="#declineFriendRequest" id="dGree">
                        <i class="material-icons" style="color: red;">clear</i>
                    </button>
                </div>
            </div>`
            app.innerHTML += html
        }
    }
}
