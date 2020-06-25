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
                <button class="btn">
                    <i class="fa fa-bell"></i>
                </button>
                <button class="btn">
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
    bodyCenter: `<section class="body-center">
    <div class="newsFeed">
        <div class="createPost">
            <a href="#">
                <img class="currentImg"
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
                    <img src="https://www.hd-freewallpapers.com/latest-wallpapers/desktop-image-of-a-parrot-wallpaper.jpg">
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
profile:`
<section class="profileBody">
<div class="headerProfile">
    <div class="backgroundImgProfile">
        <img src="" alt="" class="background-image">
    </div>
    <div class="imgProfile">
        <img alt="" class="profile-image">
    </div>
    <div class="nameProfile">h</div>
</div>
<div class="bodyProfile">
    <!-- introduction -->
    <div class="introduction">
        <h3>Giới thiệu</h3>
        <div class="genderProfile">
            Giới tính
            <span style="color: #28a745;" id="gender"></span>
        </div>
        <div class="dobProfile">
            Ngày sinh
            <span style="color: #28a745;" id="dob"></span>
        </div>
        <div class="emailProfile">
            Email
            <span style="color: #28a745;" id="email"></span>
        </div>
        <div class="editProfile">
            <button type="button" data-toggle="modal" data-target="#editBackgroundModal">Sửa ảnh nền</button>
            <button type="button" data-toggle="modal" data-target="#editPicModal">Sửa ảnh đại diện</button>
            <button type="button" data-toggle="modal" data-target="#editInfoModal">Sửa thông tin cá nhân</button>
        </div>
    </div>

    <!-- post user -->
    <div class="postProfile">
        <div class="createPostProfile">
            <div class="imgUserCreate">
                <img src="" alt="" class="createImage">
            </div>
            <button class="createPostBtnProfile" data-toggle="modal" data-target="#createPostModal">
                <span>Đăng bài viết</span>
            </button>
        </div>
        <div class="post">
        </div>
    </div>
</div>
<!-- edit background modal -->
<div class="modal fade" id="editBackgroundModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Tạo bài viết</h3>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="form-content">
                <div class="uploadPic" style="padding-top: 10px;">
                    <span>Chọn ảnh nền</span>
                    <input type="file" id="file" accept="image/*" hidden>
                    <label for="file">Tải ảnh</label>
                </div>
                <div id="previewPost" class="collapse">
                    <span>Xem trước:</span>
                    <div class="previewArea">
                        <div class="picPreview">
                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t1.15752-0/p280x280/103833129_265083201477769_8692333083300381149_n.jpg?_nc_cat=107&_nc_sid=b96e70&_nc_oc=AQk7aXQvkglZp_iCJt2MgwpRELZeOtkRHw6_0lpEu7c7O1XGoRZix6zZwR3o6htqSBI&_nc_ht=scontent.fhan2-5.fna&_nc_tp=6&oh=79e9bc2081b8fe3ba6ec5f168e10a7b1&oe=5F139D59" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modalFooter border border-left-0 border-right-0 border-bottom-0">
                <button type="button" class="previewBtn" data-toggle="collapse" data-target="#previewPost">Xem trước</button>
                <button type="button" class="upload">Đăng</button>
            </div>
        </div>
    </div>
</div>

<!-- edit pic modal -->
<div class="modal fade" id="editPicModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Tạo bài viết</h3>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="form-content">
                <div class="uploadPic" style="padding-top: 10px;">
                    <span>Chọn ảnh đại diện</span>
                    <input type="file" id="file" accept="image/*" hidden>
                    <label for="file">Tải ảnh</label>
                </div>
                <div id="previewPost" class="collapse">
                    <span>Xem trước:</span>
                    <div class="previewArea">
                        <div class="picPreview">
                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t1.15752-0/p280x280/103833129_265083201477769_8692333083300381149_n.jpg?_nc_cat=107&_nc_sid=b96e70&_nc_oc=AQk7aXQvkglZp_iCJt2MgwpRELZeOtkRHw6_0lpEu7c7O1XGoRZix6zZwR3o6htqSBI&_nc_ht=scontent.fhan2-5.fna&_nc_tp=6&oh=79e9bc2081b8fe3ba6ec5f168e10a7b1&oe=5F139D59" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modalFooter border border-left-0 border-right-0 border-bottom-0">
                <button type="button" class="previewBtn" data-toggle="collapse" data-target="#previewPost">Xem trước</button>
                <button type="button" class="upload">Đăng</button>
            </div>
        </div>
    </div>
</div>

<!-- edit info modal -->
<div class="modal fade" id="editInfoModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Tạo bài viết</h3>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="form-content">
                <div class="editGender">
                    <span>Nhập giới tính</span>
                    <form action="/action_page.php">
                        <select class="custom-select mb-3">
                            <option selected>Chọn giới tính</option>
                            <option value="volvo">Nam</option>
                            <option value="fiat">Nữ</option>
                            <option value="audi">Khác</option>
                        </select>
                    </form>
                </div>
                <div class="editDob">
                    <span>Nhập ngày sinh</span>
                    <form action="/action_page.php">
                        <input type="date">
                    </form>
                </div>
            </div>
            <div class="modalFooter border border-left-0 border-right-0 border-bottom-0">
                <button type="button" class="upload">Sửa</button>
            </div>
        </div>
    </div>
</div>
</section>`
}
