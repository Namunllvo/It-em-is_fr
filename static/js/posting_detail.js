
console.log("디테일 js, 댓글, 게시글 팔로우 등등")
let postingId

// 댓글 작성
async function loadComments(postingId) {    // handle=눌렀을때 실행(처리)한다는 의미
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
        newCard.appendChild(newCardBody)


        const newCardComment = document.createElement("h5")
        newCardComment.setAttribute("class", "card-title")
        newCardComment.innerText = comment.comment
        newCard.appendChild(newCardComment)

        const newCardTimestamp = document.createElement("h10")
        newCardTimestamp.setAttribute("class", "card-text")
        newCardTimestamp.innerText = comment.updated_at
        newCard.appendChild(newCardTimestamp)

        comment_list.appendChild(newCol)

    });
}

async function submitComment() {
    // const commentElement = document.getElementById("new-comment")
    // const newComment = commentElement.value
    const newComment = document.getElementById("new-comment").value
    const response = await postComment(postingId, newComment)

    console.log(typeof newComment)
    console.log(typeof response)

    // commentElement.value = ""

    loadComments(postingId)
}

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
    // newImage.setAttribute("class", "img-fluid") // 부트스트랩 사용시 이미지 크기 조절



    postingImage.appendChild(newImage)
}


window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    postingId = urlParams.get('posting_id');
    console.log("포스트아이디")
    console.log(postingId)

    await loadPostings(postingId);
    await loadComments(postingId);
}