/* 헤더 푸터 가져오기 */
fetch("./header-footer.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector("header").innerHTML = data;
    });


console.log("디테일 js, 댓글, 게시글 팔로우 등등")
console.log("response.user")
let postingId
let date
var count = 0;

// 작성한 사용자이면 수정, 삭제 버튼을 보여주고
// 작성한 사용자가 아니면 신고버튼을 보여준다
function toggleBtn1() {
    // 토글 할 버튼 선택 (toggleBtn)

    const toggleBtn = document.getElementsById(`${comment.id}`);

    // btn1 숨기기 (display: none)
    if (toggleBtn.style.display == 'none') {
        toggleBtn.style.display = 'block';
    }
    // btn` 보이기 (display: block)

    else {
        toggleBtn.style.display = 'none';
    }


    // toggleBtn.addEventListener("click", clickCounter);

}


// 댓글 작성시간 계산
function elapsedText(date) {
    // 초 (밀리초)
    const seconds = 1;
    // 분
    const minute = seconds * 60;
    // 시
    const hour = minute * 60;
    // 일
    const day = hour * 24;

    var today = new Date();
    var elapsedTime = Math.trunc((today.getTime() - date.getTime()) / 1000);

    var elapsedText = "";
    if (elapsedTime < seconds + 10) {
        elapsedText = "방금 전";
    } else if (elapsedTime < minute) {
        elapsedText = elapsedTime + "초 전";
    } else if (elapsedTime < hour) {
        elapsedText = Math.trunc(elapsedTime / minute) + "분 전";
    } else if (elapsedTime < day) {
        elapsedText = Math.trunc(elapsedTime / hour) + "시간 전";
    } else if (elapsedTime < (day * 15)) {
        elapsedText = Math.trunc(elapsedTime / day) + "일 전";
    } else {
        elapsedText = SimpleDateTimeFormat(date, "yyyy.M.d");
    }

    return elapsedText;
}

// 댓글 불러오기
async function loadComments(postingId) {
    const response = await getComments(postingId);
    console.log(response)

    const comment_list = document.getElementById("comment-list")
    comment_list.innerHTML = ""

    response.forEach(comment => {
        const newCol = document.createElement("div");
        newCol.setAttribute("class", "col")
        // 19강 참고
        // commentList.innerHTML += 
        const newCard = document.createElement("div");
        newCard.setAttribute("class", "card")
        newCard.setAttribute("id", comment.id)
        // console.log(newCard)

        newCol.appendChild(newCard)

        const newCardHeader = document.createElement("div")
        newCardHeader.setAttribute("class", "card-header")
        newCardHeader.innerText = comment.user
        newCard.append(newCardHeader)

        // 댓글 삭제
        const toggleBtn = document.createElement("a")
        toggleBtn.setAttribute("class", "card-link")
        toggleBtn.setAttribute("id", `${comment.id}`)
        toggleBtn.setAttribute("href", "javascript:void(0);")
        toggleBtn.setAttribute("onclick", "toggleBtn1();")
        toggleBtn.innerHTML = "⁝"

        newCardHeader.appendChild(toggleBtn)

        const newCardHead = document.createElement("div")
        newCardHead.setAttribute("class", "card-div")
        newCardHead.setAttribute("id", "card-div")
        newCardHead.setAttribute("style", "display:none;")
        toggleBtn.append(newCardHead)


        const toggleBtnPut = document.createElement("a")
        const toggleBtnPutbtn = document.createElement("button")
        toggleBtnPutbtn.setAttribute("class", "btn btn-default btn-xs")
        toggleBtnPutbtn.setAttribute("id", "card-btn1")
        toggleBtnPutbtn.setAttribute("type", "button")
        toggleBtnPutbtn.setAttribute("href", "javascript:void(0);")
        toggleBtnPutbtn.setAttribute("onclick", "deleteComment();")
        toggleBtnPutbtn.setAttribute("style", "")
        toggleBtnPutbtn.innerHTML = "수정"

        toggleBtnPut.appendChild(toggleBtnPutbtn)
        newCardHead.appendChild(toggleBtnPutbtn)

        const toggleBtnDelete = document.createElement("a")
        toggleBtnDelete.setAttribute("class", "btn btn-light")
        toggleBtnDelete.setAttribute("id", "card-btn2")
        toggleBtnDelete.setAttribute("href", "javascript:void(0);")
        toggleBtnDelete.setAttribute("style", "")
        toggleBtnDelete.innerHTML = "삭제"

        newCardHead.appendChild(toggleBtnDelete)



        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body")
        newCardBody.innerText = comment.comment
        newCard.appendChild(newCardBody)


        // const newCardComment = document.createElement("h5")
        // newCardComment.setAttribute("class", "card-title")
        // newCardComment.innerText = comment.comment
        // newCard.appendChild(newCardComment)
        // 작성시간
        const newCardTimestamp = document.createElement("h10")
        newCardTimestamp.setAttribute("class", "card-text_")
        // newCardTimestamp.innerText = comment.updated_at

        var date = comment.updated_at
        // var end = Date.now();
        var date_ = new Date(date);
        var time = elapsedText(date_)
        newCardTimestamp.innerText = time

        // var dt_ = new Date();
        // var rush = date.getTime()
        // console.log(comment.updated_at)

        // console.log("소요시간" + elapsedText(date_));



        newCard.appendChild(newCardTimestamp)

        comment_list.appendChild(newCol)

    });
}

// 댓글 작성
async function submitComment() {
    // Ver1
    // const newComment = document.getElementById("new-comment").value
    // const response = await postComment(postingId, newComment)

    const commentElement = document.getElementById("new-comment")
    const newComment = commentElement.value
    const response = await postComment(postingId, newComment)

    console.log(typeof newComment)
    console.log(typeof response)

    commentElement.value = ""

    loadComments(postingId)
}

// 댓글 삭제
// async function deleteComment(postingId, commentId) {
//     const urlParams = new URLSearchParams(window.location.search);
//     postingId = urlParams.get('comment_id');
//     const response = await deleteComment(postingId);
//     console.log(response)
//     console.log("댓글수정")
//     // console.log(typeof newComment)
//     // console.log(typeof response)

//     // commentElement.value = ""

//     // loadComments(postingId)
// }

// 게시글 불러오기
async function loadPostings(postingId) {
    const response = await getPost(postingId);
    console.log(response)

    const postingTitle = document.getElementById("posting-title")
    const postingImage = document.getElementById("posting-image")
    const postingContent = document.getElementById("posting-content")
    const postingUser = document.getElementById("posting-user")
    const postingLikes = document.getElementById("like-count")
    const followUser = document.getElementById("follow-user")
    console.log(postingTitle)
    console.log(postingImage)
    console.log(postingContent)
    console.log(postingUser)
    console.log(postingLikes)
    console.log(followUser)

    postingTitle.innerText = response.title
    postingContent.innerText = response.content
    postingUser.innerText = response.user
    postingLikes.innerText = response.likes_count
    followUser.innerText = response.user
    const newImage = document.createElement("img")

    if (response.image) {
        newImage.setAttribute("src", `${backend_base_url}${response.image}`)
        // newImage.setAttribute("src", "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg")
    } else {
        newImage.setAttribute("src", "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg")
    }

    // newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    newImage.setAttribute("class", "img-fluid") // 부트스트랩 사용시 이미지 크기 조절



    postingImage.appendChild(newImage)
}
// 게시글 삭제하기
async function deletePosting(postingId) {
    const urlParams = new URLSearchParams(window.location.search);
    postingId = urlParams.get('posting_id');
    // const response = await getPost(postingId);
    const response = await deletePost(postingId);
    console.log(response)
    console.log(response.user)

    console.log("포스트아이디")
    console.log(postingId)

    // console.log(response)
}

async function follow() {
    // const response = await postfollow();
    // console.log(response)
    console.log("로그인 작성")
}

async function like(postingId) {
    const urlParams = new URLSearchParams(window.location.search);
    postingId = urlParams.get('posting_id');
    const response = await postlike(postingId);
    console.log(response)
    console.log("로그인 작성")
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    postingId = urlParams.get('posting_id');
    console.log("포스트아이디")
    console.log(postingId)

    await loadPostings(postingId);
    await loadComments(postingId);
    // await follow(postingId);
    // await like(postingId);
}