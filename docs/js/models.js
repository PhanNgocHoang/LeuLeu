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
    }
}