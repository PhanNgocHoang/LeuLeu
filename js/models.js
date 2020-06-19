const models = {
    listFriends: null,
    listPost: null,
    saveListFriends(listFriends){
        models.listFriends = listFriends;
    },
    saveListPost(listPost){
        models.listPost = listPost;
    }
}