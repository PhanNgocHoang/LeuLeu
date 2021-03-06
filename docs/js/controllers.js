const controllers = {
    register: async (userInfo) => {
        if (userInfo.gender == 'male') {
            let avatar = "https://firebasestorage.googleapis.com/v0/b/project-mxh.appspot.com/o/avatar%2Favatar-boy.jpg?alt=media&token=47601c21-06dd-4f52-8f17-b228ed399120"
            try {
                await firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
                await firebase.auth().currentUser.updateProfile({
                    displayName: userInfo.nickname,
                    photoURL: avatar
                })
                let userRegister = {
                    nickname: userInfo.nickname,
                    userAvatar: avatar,
                    userDoB: userInfo.dayofbirth,
                    userEmail: userInfo.email,
                    userGender: userInfo.gender
                }
                await firebase.firestore()
                    .collection("Users")
                    .add(userRegister)
                await firebase.auth().currentUser.sendEmailVerification()
                alert('Bạn đã đăng ký thành công, vui long truy cập email để xác thực')
            } catch (err) {
                alert(err.message)
            }
        }
        else {
            let avatar = "https://firebasestorage.googleapis.com/v0/b/project-mxh.appspot.com/o/avatar%2Favatar-girl.jpg?alt=media&token=47601c21-06dd-4f52-8f17-b228ed399120"
            try {
                await firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
                await firebase.auth().currentUser.updateProfile({
                    displayName: userInfo.nickname,
                    photoURL: avatar
                })
                let userRegister = {
                    nickname: userInfo.nickname,
                    userAvatar: avatar,
                    userDoB: userInfo.dayofbirth,
                    userEmail: userInfo.email,
                    userGender: userInfo.gender
                }
                await firebase.firestore()
                    .collection("Users")
                    .add(userRegister)
                await firebase.auth().currentUser.sendEmailVerification()
                alert('Bạn đã đăng ký thành công, vui long truy cập email để xác thực')
            } catch (err) {
                alert(err.message)
            }
        }

    },
    login: async (loginInfo) => {
        let email = loginInfo.email
        let password = loginInfo.password
        utils.setText('#login-message', '')
        utils.disabledButton('#login-btn')
        try {
            let result = await firebase.auth().signInWithEmailAndPassword(email, password)
            if (result.user && result.user.emailVerified) {
                view.showScreens('home')
            }
            else {
                throw new Error('Email must verified')
            }
        } catch (Error) {
            utils.setText('#login-message', Error.message)
        }
    },
    loadListFriends: async (currentUser) => {
        let result = await firebase.firestore()
            .collection('Friends')
            .where('user', 'array-contains', currentUser)
            .get()
        let friends = utils.getDataFromDocs(result.docs)
        let listFriendsAgr = []
        let listFriendsDisAgr = []
        for (const friend of friends) {
            if (friend.status == true) {
                for (let i = 0; i < friend.user.length; i++) {
                    for (let j = i + 1; j < friend.user.length; j++) {
                        listFriendsAgr.push(friend.user[i])
                        listFriendsAgr.push(friend.user[j])
                    }
                }
            }
            if (friend.status == false) {
                for (let i = 0; i < friend.user.length; i++) {
                    for (let j = i + 1; j < friend.user.length; j++) {
                        listFriendsDisAgr.push(friend.user[i])
                        listFriendsDisAgr.push(friend.user[j])
                    }
                }
            }
        }
        let arrayFriendsAgr = [...new Set(listFriendsAgr)]
        let arrayFriendsDisAgr = [...new Set(listFriendsDisAgr)]
        models.saveListFriends(arrayFriendsAgr)
        models.saveListFriendsDisAgr(arrayFriendsDisAgr)
    },
    searchFriend: async (searchValue) => {
        let searchKey = searchValue.searchKey
        let result = await firebase.firestore()
            .collection('Users')
            .where('nickName', '==', searchKey)
            .get()
        let searchResults = utils.getDataFromDocs(result.docs)
        models.saveSearchResults(searchResults)
    },
    loadPost: async () => {
        let friends = models.listFriends
        let posts = [];
        for (let i = 0; i < friends.length; i++) {

            let friendPosts = await firebase.firestore()
                .collection('Post')
                .where('owner', '==', friends[i])
                .get()
            for (let friendPost of friendPosts.docs) {
                posts.push(utils.getDataFromDoc(friendPost));
            }
        }
        models.saveListPost(posts);
    },
    createPost: async (postInfo) => {
        if (!postInfo.file[0]) {
            let newPost = {
                content: postInfo.content,
                owner: firebase.auth().currentUser.email,
                createAt: new Date().toISOString(),
                like: [],
                comment: [],
                image: "",
                title: "đã đăng một bài viết"
            }
            try {
                await firebase.firestore()
                    .collection('Post')
                    .add(newPost)
                alert("Đăng bài thành công")
            } catch (err) {
                alert(err.message)
            }
        }
        else {

            let image = await controllers.uploadFile(postInfo.file[0])
            let newPost = {
                content: postInfo.content,
                owner: firebase.auth().currentUser.email,
                createAt: new Date().toISOString(),
                like: [],
                comment: [],
                image: "".concat(image),
                title: "đã đăng một bài viết"
            }
            try {
                await firebase.firestore()
                    .collection('Post')
                    .add(newPost)
                alert("Đăng bài thành công")
            } catch (err) {
                alert(err.message)
            }
        }
    },
    getComment: (postInfo) => {
        let Posts = models.listPost
        let post = Posts.find(post => post.id == postInfo.id)
        models.saveCurrentPost(post)

    },
    updateLikes: async (likeInfo, postId) => {
        try {
            await firebase.firestore()
                .collection('Post')
                .doc(postId)
                .update({ like: firebase.firestore.FieldValue.arrayUnion(likeInfo) })
            alert('Bạn đã like thành công')
        } catch (err) {
            alert(err.message)
        }
    },
    listFriendsInfo: async () => {
        let currentUser = firebase.auth().currentUser.email
        let friendsInfo = models.listFriends.filter(item => item !== currentUser)
        let arrayInfo = []
        for (let i = 0; i < friendsInfo.length; i++) {
            let result = await firebase.firestore()
                .collection('Users')
                .where('userEmail', '==', friendsInfo[i])
                .get()
            for (let info of result.docs) {
                arrayInfo.push(utils.getDataFromDoc(info))
            }
        }
        models.saveFriendInfo(arrayInfo)

    },
    addFriends: async (friendInfo) => {
        let newFriend = {
            user: [firebase.auth().currentUser.email, friendInfo],
            status: false
        }
        try {
            await firebase.firestore()
                .collection('Friends')
                .add(newFriend)
        } catch (err) {
            alert(err.message)
        }
    },
    dislike: async (likeInfo, postId) => {
        try {
            await firebase.firestore()
                .collection('Post')
                .doc(postId)
                .update({ like: firebase.firestore.FieldValue.arrayRemove(likeInfo) })
        } catch (error) {
            alert(error.message)
        }
    },
    addComment: async (content, email, postId) => {
        let commentInfo = {
            commentContent: content,
            commentOwner: email,
            createAt: new Date().toISOString()
        }
        try {
            await firebase.firestore()
                .collection('Post')
                .doc(postId)
                .update({ comment: firebase.firestore.FieldValue.arrayUnion(commentInfo) })
            alert('Bạn đã comment thành công')
        } catch (err) {
            alert(err.message)
        }
    },
    uploadFile: async (file) => {
        let fileName = file.name
        let filePath = `posts/${fileName}`
        let fileRef = firebase.storage().ref().child(filePath)
        await fileRef.put(file)
        let fileLink = await firebase.storage().ref(filePath).getDownloadURL()
        return fileLink
    },
    getUserProfile: async () => {
        let allUser = await firebase.firestore()
            .collection('Users')
            .get()
        let result = utils.getDataFromDocs(allUser.docs)
        models.saveUserInfo(result)
    },
    setupPostChange: async () => {
        let isFirstRun = true
        for (let i = 0; i < models.listFriends.length; i++) {
            firebase.firestore()
                .collection('Post')
                .where('owner', '==', models.listFriends[i])
                .onSnapshot((snapshot) => {
                    if (isFirstRun) {
                        isFirstRun = false
                        return
                    }
                    let docChanges = snapshot.docChanges()
                    for (docChange of docChanges) {
                        let type = docChange.type
                        let doc = docChange.doc
                        let post = utils.getDataFromDoc(doc)
                        if (type == 'modified') {
                            models.updatePost(post)
                            if (models.currentPost && models.currentPost.id == post.id) {
                                view.showComment(models.currentPost, models.userInfo)
                                view.showListPosts(models.listPost)
                            }
                        }
                        if (type == 'added') {
                            models.updatePost(post)
                            view.showComment()
                            view.showListPosts(models.listPost)
                        }
                    }
                })
        }
    },
    agreeFriendRequest:async(friendEmail, email)=>{
        let user = [friendEmail, email]
        let createAt = new Date().toISOString()
        try {
            let result = await firebase.firestore()
            .collection('Friends')
            .where('user', '==', user)
            .get()
        let friend = utils.getDataFromDocs(result.docs)
        let friendId = friend[0].id
            firebase.firestore()
                .collection('Friends')
                .doc(friendId)
                .update({status: true})
        alert('Xác nhận bạn bè thành công')
        // let conversation ={
        //     messages: [],
        //     createAt: createAt,
        //     users: user,
        //     tile:[]
        // }
        }catch(err) {
            alert(err.message)
        }
    },
    DisagreeFriendRequest:async(friendEmail, email) => {
        let user = [friendEmail, email]
        try {
            let result = await firebase.firestore()
            .collection('Friends')
            .where('user', '==', user)
            .get()
        let friend = utils.getDataFromDocs(result.docs)
        let friendId = friend[0].id
            firebase.firestore()
                .collection('Friends')
                .doc(friendId)
                .delete()
        alert('Bạn đã từ chối xác nhận bạn bè')
        }catch(err) {
            alert(err.message)
        }
    }
}