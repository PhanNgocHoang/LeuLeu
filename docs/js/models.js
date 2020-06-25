const models = {
    listFriends: null,
    listPost: null,
    currentPost: null,
    listFriendsDisAgr: null,
    userInfo: null,
    friendInfo: null,
    searchResults: null,
    userInfo: null,
    saveListFriends(listFriends){
        models.listFriends = listFriends;
    },
    saveListPost(listPost){
        models.listPost = listPost;
    },
    saveCurrentPost(post){
        models.currentPost = post;
    },
    saveListFriendsDisAgr(listFriends){
        models.listFriendsDisAgr = listFriends;
    },
    saveFriendInfo(friendInfo){
        models.friendInfo = friendInfo;
    },
    saveSearchResults(searchResults){
        models.searchResults = searchResults;
    },
    saveUserInfo(userInfo){
        models.userInfo = userInfo;
    },
    updatePost(newPost){
        if(models.currentPost && models.currentPost.id === newPost.id)
        {
            models.saveCurrentPost(newPost)
        }
        if(models.listPost){
            let indexPost = models.listPost.findIndex((item)=>{
                return item.id === newPost.id
            })
            if(indexPost >= 0){
                models.listPost.splice(indexPost, 1, newPost)
            }
            else{
                models.listPost.push(newPost)
            }
        }
    }
}