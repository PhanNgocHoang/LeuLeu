const models = {
    listFriends: null,
    listPost: null,
    currentPost: null,
    listFriendsFalse: null,
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
    saveListFriendsFalse(listFriends){
        models.listFriendsFalse = listFriends;
    }
}