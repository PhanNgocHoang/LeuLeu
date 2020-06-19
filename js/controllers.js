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
                displayName: nickname,
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
                view.showScreens('home')
            }
            else{
                throw new Error('Email must verified')
            }
        } catch (Error) {
            utils.setText('#login-message', Error.message)
        }
    },
    loadListFriends: async(currentUser)=>{
        let result = await firebase.firestore()
            .collection('Friends')
            .where('user', 'array-contains',currentUser)
            .get()
        let friends = utils.getDataFromDocs(result.docs)  
        for (const friend of friends) {
            if(friend.status == true) {
                models.saveListFriends(friend.user)
            }
        }
    },
    loadPost: async()=>{
        let friends = models.listFriends
        let posts = [];
        for(let i = 0; i < friends.length; i++) {

            let friendPosts = await firebase.firestore()
                .collection('Post')
                .where('owner', '==', friends[i])
                .get()
            for (let friendPost of friendPosts.docs) {
                posts.push(friendPost.data());
            }
        }
        models.saveListPost(posts);
    },
    createPost: async(postInfo) => {
        let newPost = {
            content :postInfo.content,
            backgroundColor :"".concat(postInfo.background),
            textColor :"".concat(postInfo.textColor),
            owner : firebase.auth().currentUser.email,
            createAt : new Date().toISOString(),
            like : [],
            comment : [],
            image : ""
        }
        try {
            await firebase.firestore()
                .collection('Post')
                .add(newPost)
        }catch(err){
            console.log(err)
        }
    }
}