const componentHome = {
    nav: `
    <section class="navigationBar">
    <nav class="navbar navbar-expand-sm bg-success navbar-dark fixed-top">
        <div class="navbar-left">
            <a href="#" class="home">LeuLeu</a>
        </div>
        <div class="navbar-right">
        <form id="search">
            <div class="navSearch">
                <input class="border border-success" type="text" name="searchBar" placeholder="Tìm kiếm . . .">
                <button class="btn" type="submit">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </form>
            <div class="currentUser">
                <button class="btn btnHome">
                <i class="fa fa-home" style="font-size:36px"></i>
                </button>
                <button class="btn">
                    <i class="fa fa-bell"></i>
                </button>
                <button class="btn" id="friendRequest">
                    <i class="fa fa-users"></i>
                </button>
                <button class="btn">
                    <i class="fa fa-comment"></i>
                </button>
                <button class="btn your-profile">
                    <div class="currentEmail">
                        <img class="currentImg"
                            src=""
                            alt="">
                        <span class="currentLink"></span>
                    </div>
                </button>
                <button class="btn" id="signOut">
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
                            <img  class="resImage" src=""
                                alt="">
                        </div>
                        <div class="currentName"></div>
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
                        <button class="btn" id="signOut">
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
        </div>
    </aside>
</section>
    `,
    bodyCenter: `
    <section class="body-center">
    <section class="profileBody" style="display: none;">
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
        </div>
    </section>
    <div class="newsFeed">
        <div class="createPost">
            <a href="#">
                <img class="currentImg avatar"
                    src=""
                    alt="">
            </a>
            <button class="createPostBtn" data-toggle="modal" data-target="#createPostModal">
                <span>Đăng bài viết</span>
            </button>
        </div>
        <div class="post">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`,
createPost: `
<div class="modal fade" id="createPostModal">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Tạo bài viết</h3>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <form id="form-createPost">
        <div class="form-content">
            <div class="add-content">
                <textarea class="form-control" row="3" name="text" id="content" placeholder="Hãy viết gì đó ..."></textarea>
                <div class="message-error" id="content-error"></div>
            </div>
                <input type="file" id="file" accept="image/*" name="fileUpload">
                <div class="message-error" id="file-error"></div>
            <div id="previewPost" class="collapse">
                <span>Xem trước:</span>
                <div class="previewArea">
                    <div class="contentPreview"></div>
                    <div class="picPreview">
                    <img src="">
                    </div>
                </div>
            </div>
        </div>
        <div class="modalFooter border border-left-0 border-right-0 border-bottom-0">
            <button type="button" class="previewBtn" data-toggle="collapse" data-target="#previewPost">Xem trước</button>
            <input class="upload" class="btn btn-primary" type="submit" value="Đăng" >
        </div>
        </form>
    </div>
</div>
</div>
`,
searchPage:
` <section class="searchBody">
<div class="search-title">
    <span>Kết quả tìm kiếm cho </span>
    <div class="keyWord"></div>
</div>
<div class="allResult">

</div>
<div class="search-footer">
    <span>Không còn kết quả khác</span>
</div>

<!-- add friend confirm -->
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
</div>
</section>`,
friendRequest: `<section class="friendRequestBody">
<div class="friend-request-title">
    <span>Yêu cầu kết bạn</span>
</div>
    <div class="allRequest">
        </div>
        <div class="friend-request-footer">
            <span>Không còn yêu cầu khác</span>
        </div></section>`
}
