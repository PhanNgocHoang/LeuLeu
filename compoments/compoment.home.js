const componentHome = {
    nav: `
    <section class="navigationBar">
    <nav class="navbar navbar-expand-sm bg-success navbar-dark fixed-top">
        <div class="navbar-left">
            <a href="#" class="home">LeuLeu</a>
        </div>
        <div class="navbar-right">
            <div class="navSearch">
                <input class="border border-success" type="text" name="searchBar" placeholder="Tìm kiếm . . .">
                <button class="btn">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div class="currentUser">
                <button class="btn">
                    <i class="fa fa-bell"></i>
                </button>
                <button class="btn">
                    <i class="fa fa-users"></i>
                </button>
                <button class="btn">
                    <i class="fa fa-comment"></i>
                </button>
                <button class="btn">
                    <div class="currentEmail">
                        <img class="currentImg"
                            src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D"
                            alt="">
                        <span class="currentLink">Vũ Quang Minh</span>
                    </div>
                </button>
                <button class="btn">
                    <i class="fa fa-sign-out"></i>
                </button>
            </div>

            <!-- responsive navbar -->
            <div class="menu">
                <button class="btn btn-success" data-toggle="collapse" data-target="#menuButton">
                    <i class="fa fa-bars"></i>
                </button>
                <div class="menu-responsive collapse border" id="menuButton">
                    <div class="currentUserDetail border border-top-0 border-left-0 border-right-0">
                        <div class="currentImgDetail">
                            <img src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D"
                                alt="">
                        </div>
                        <div class="currentName">Vũ Quang Minh</div>
                        <button class="btn btn-success">Xem trang cá nhân</button>
                    </div>
                    <div class="navSearch border border-top-0 border-left-0 border-right-0">
                        <input class="border border-success" type="text" name="searchBar" placeholder=" Tìm kiếm . . .">
                        <button class="btn">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    <div class="notification">
                        <button class="btn">
                            <i class="fa fa-bell"></i>
                            <span style="color: #ffffff;padding-left: 5px;width: 100%;">Thông báo</span>
                        </button>
                    </div>
                    <div class="friendRequest">
                        <button class="btn">
                            <i class="fa fa-users"></i>
                            <span style="color: #ffffff;padding-left: 5px;width: 100%;">Bạn bè</span>
                        </button>
                    </div>
                    <div class="messages">
                        <button class="btn">
                            <i class="fa fa-comment"></i>
                            <span style="color: #ffffff;padding-left: 5px;width: 100%;">Chat</span>
                        </button>
                    </div>
                    <div class="signOut">
                        <button class="btn" id="signOut>
                            <i class="fa fa-sign-out"></i>
                            <span style="color: #ffffff;padding-left: 5px;width: 100%;">Đăng xuất</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</section>
    `,
    listFriends: `
    <section class="body-left">
    <aside class="list-friend">
        <div class="title-listFriend">
            <span>Bạn bè</span>
        </div>
        <div class="body-listFriend">
            <div>
                <div class="your-friend">
                    <button class="friendInfoBtn" data-toggle="collapse" data-target="#action-1">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="friendPicture">
                                        <img src="gs://project-mxh.appspot.com/avatar/avatar-girl.jpg"
                                            alt="pic">
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="friendInfo">
                                        <span class="name">Friend 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                    <div class="collapse action" id="action-1">
                        <button class="btn-action">
                            <div class="left">
                                <i class="fa fa-user"></i>
                            </div>
                            <div class="right">
                                <span>Xem trang cá nhân</span>
                            </div>
                        </button>
                        <button class="btn-action">
                            <div class="left">
                                <i class="fa fa-comment"></i>
                            </div>
                            <div class="right">
                                <span>Chat</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</section>
    `,
    bodyCenter: `<section class="body-center">
    <div class="newsFeed">
        <div class="createPost">
            <a href="#">
                <img class="currentImg"
                    src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D"
                    alt="">
            </a>
            <button class="createPostBtn" data-toggle="modal" data-target="#createPostModal">
                <span>Đăng bài viết</span>
            </button>
        </div>
        <div class="post">
            <div class="userPost">
                <div class="header-userPost">
                    
                </div>
                <div class="body-userPost">
                    
                </div>
                <div class="footer-userPost">
                    <div class="reaction-number">
                        <div class="like-userPost-number">
                            <a href="#" data-toggle="modal" data-target="#likePostUser">
                                <i class="fa fa-thumbs-up" style="color: #28a745; font-size: 20px;"></i>
                                <div class="number-like"></div>
                            </a>
                        </div>
                        <div class="comment-userPost-number">
                            <a href="#">
                                <div class="number-comment"></div>
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
                                            <a href="#" class="name">Lynk Lee</a>
                                            <span>Hello bạn mình cũng vừa qua đây nè</span>
                                        </div>
                                        <div class="react-comment">
                                            <a href="#">Thích</a>
                                            <a href="#">Trả lời</a>
                                            <div class="timeDetail">12/7/2020</div>
                                            <div class="react-comment-number">
                                                <a href="#" data-toggle="modal" data-target="#likeCommentUser">
                                                    <i class="fa fa-thumbs-up" style="color: #28a745; font-size: 20px;"></i>
                                                    <div class="number-like">1</div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="all-reply">
                                            <div class="reply-user-1">
                                                <div class="reply-left">
                                                    <div class="userImgReply">
                                                        <img src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D" alt="">
                                                    </div>
                                                    <div>
                                                        <div class="content-reply">
                                                            <a href="#" class="name">Vũ Quang Minh</a>
                                                            <span>Oke bạn</span>
                                                        </div>
                                                        <div class="react-reply">
                                                            <a href="#">Thích</a>
                                                            <div class="timeDetail">12/7/2020</div>
                                                            <div class="react-reply-number">
                                                                <a href="#" data-toggle="modal" data-target="#likeReplyUser">
                                                                    <i class="fa fa-thumbs-up" style="color: #28a745; font-size: 20px;"></i>
                                                                    <div class="number-like">1</div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="reply-right">
                                                    <button class="btn">...</button>
                                                </div>
                                            </div>
                                            <div class="replyInput">
                                                <div class="selfUserImgReply">
                                                    <img src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/92824120_829689567538246_7546079727425945600_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_oc=AQnUlCWOJLvOqpw5-8gDBz8U7RToIcqBxrEDKylUvT5Pg1nUZO13rQOQCX_YXq7QuBw&_nc_ht=scontent.fhan2-1.fna&_nc_tp=6&oh=2ce09fc05a0e7483b765fc92b24498ca&oe=5F04FA3D" alt="">
                                                </div>
                                                <div class="inputReply">
                                                    <input type="text" name="reply" placeholder="  Trả lời . . .">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-comment">
                                    <button class="btn">...</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`,
createPost: `
<div class="modal fade" id="createPostModal">
<form id="form-createPost">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Tạo bài viết</h3>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="form-group">
            <textarea class="form-control" name="content" placeholder="Hãy viết gì đó ..."></textarea>
            <div class="message-error" id="content-error"></div>
        </div> 
        <div class="form-group">
        <label>Background color</label>
        <input type="color" name="backgroudColor" id="backgroudColor">
        <div class="message-error" id="content-error"></div>
    </div> 
    <div class="form-group">
        <label>Text color</label>
        <input type="color" name="TextColor" id="TextColor">
        <div class="message-error" id="content-error"></div>
    </div> 
        <div class="previewPic"></div>
        <label>Tải ảnh<input type="file" name= "fileUpload"></label>
        <div class="message-error" id="file-error"></div>
        <div class="modalFooter border border-left-0 border-right-0 border-bottom-0">
            <input type="submit", class="upload" value="Dang">
        </div>
    </div>
</div>
</form>
</div>
`
}
