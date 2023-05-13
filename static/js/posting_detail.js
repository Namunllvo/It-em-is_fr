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
        console.log(newCard)

        newCol.appendChild(newCard)

        const newCardHeader = document.createElement("div")
        newCardHeader.setAttribute("class", "card-header")
        newCardHeader.innerText = comment.user
        newCard.appendChild(newCardHeader)

        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body")
        newCardBody.innerText = comment.comment
        newCard.appendChild(newCardBody)


        // const newCardComment = document.createElement("h5")
        // newCardComment.setAttribute("class", "card-title")
        // newCardComment.innerText = comment.comment
        // newCard.appendChild(newCardComment)

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

        console.log("소요시간" + elapsedText(date_));



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

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    postingId = urlParams.get('posting_id');
    console.log("포스트아이디")
    console.log(postingId)

    await loadPostings(postingId);
    await loadComments(postingId);
}