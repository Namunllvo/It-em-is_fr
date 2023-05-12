/* 헤더 푸터 가져오기 */
fetch("./header-footer.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("header").innerHTML = data;
  });

console.log("main_posting_list.js 메인 게시글 리스트 js 로드")
console.log(location.origin)


function postingDetail(posting_id) {
    console.log(posting_id)
    window.location.href = `${frontend_base_url}/posting_detail.html?posting_id=${posting_id}`
}

window.onload = async function loadPostings() {
    postings = await getPostings()
    console.log(postings)

    const posting_list = document.getElementById("posting-list")

    postings.forEach(posting => {
        const newCol = document.createElement("div");
        newCol.setAttribute("class", "col")
        // 상세 게시물로 이동
        newCol.setAttribute("onclick", `postingDetail(${posting.id})`)

        const newCard = document.createElement("div");
        newCard.setAttribute("class", "card")
        newCard.setAttribute("id", posting.id)
        console.log(newCard)

        newCol.appendChild(newCard)

        const postingImage = document.createElement("img")
        postingImage.setAttribute("class", "card-img-top")

        if (posting.image) {
            postingImage.setAttribute("src", `${backend_base_url}${posting.image}`)
        } else {
            postingImage.setAttribute("src", "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg")
        }


        newCard.appendChild(postingImage)

        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body")
        newCard.appendChild(newCardBody)

        const newCardTitle = document.createElement("h5")
        newCardTitle.setAttribute("class", "card-title")
        newCardTitle.innerText = posting.title
        newCardBody.appendChild(newCardTitle)

        const newCardContent = document.createElement("h6")
        newCardContent.setAttribute("class", "card-text")
        newCardContent.innerText = posting.content
        newCardBody.appendChild(newCardContent)

        const newCardLikeCount = document.createElement("h6")
        newCardLikeCount.setAttribute("class", "card-text")
        newCardLikeCount.innerText = posting.likes_count
        newCardBody.appendChild(newCardLikeCount)

        const newCardCommentCount = document.createElement("h6")
        newCardCommentCount.setAttribute("class", "card-text")
        newCardCommentCount.innerText = posting.comments_count
        newCardBody.appendChild(newCardCommentCount)



        posting_list.appendChild(newCol)

    });
}