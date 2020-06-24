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
                let body = document.getElementById('app')
                body.style.background = "url('../images/luca-bravo-O453M2Liufs-unsplash.jpg') no-repeat;background-size: cover"
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
                avatarUser.src = avatar
                utils.setText('.currentLink', nickname)
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
                let btnLogOut = document.querySelector('#signOut')
                btnLogOut.onclick = (event) => {
                    event.preventDefault()
                    firebase.auth().signOut()
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
                        for (let like of post.like) {
                            if (like == email) {
                                let c = confirm('Bạn đã like bài này. Bạn có muốn dislike không?')
                                if (c === true) {
                                    controllers.dislike(email, postId)
                                }
                            }
                            else {
                                controllers.updateLikes(email, postId)
                            }
                        }
                    }
                    let commentBtn = userPost.querySelector('.commentBtn')
                    commentBtn.onclick = async (event) => {
                        event.preventDefault()
                        let postInfo = {
                            id: userPost.getAttribute('postId'),
                        }
                        controllers.getComment(postInfo)
                        await view.showComment(models.currentPost, models.userInfo)
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
            else{
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
    showComment(post, userInfo) {
        let userPost = document.querySelector('div[postId=' + post.id + ']')
        let allComment = userPost.querySelector('.allComment')
        let html = `
        <div class="selfComment border border-left-0 border-top-0 border-right-0">
            <div class="currentImgComment">
                <img src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D" alt="">
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
            let userComment = userInfo.find(ownerComment => ownerComment.userEmail == comment.commentOwner)
            html += `
            <div class="comment-user-1">
                <div class="left-comment">
                    <div class="userImgComment">
                        <img src="${userComment.userAvatar}" alt="">
                    </div>
                    <div>
                        <div class="content-comment">
                            <a href="#" class="name">${userComment.nickName}</a>
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
    }

}
