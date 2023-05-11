console.log("디테일 js, 댓글, 게시글 팔로우 등등")

// 댓글 작성
async function loadComments(postingId) {    // handle=눌렀을때 실행(처리)한다는 의미
    const response = await getComments(postingId);
    console.log(response)

    const commentList = document.getElementById("comment-list")

    response.forEach(comment => {

        // 19강 참고
        // commentList.innerHTML += 

    });
}

async function loadPostings(postingId) {
    const response = await getPost(postingId);
    console.log(response)

    const postingTitle = document.getElementById("posting-title")
    const postingImage = document.getElementById("posting-image")
    const postingContent = document.getElementById("posting-content")

    postingTitle.innerText = response.title
    postingContent.innerText = response.content
    const newImage = document.createElement("img")

    if (response.image) {
        newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    } else {
        newImage.setAttribute("src", "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg")
    }

    // newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    // newImage.setAttribute("class", "img-fluid") // 부트스트랩 사용시 이미지 크기 조절



    postingImage.appendChild(newImage)
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postingId = urlParams.get('posting_id');
    console.log(postingId)

    await loadPostings(postingId);
    await loadComments(postingId);
}