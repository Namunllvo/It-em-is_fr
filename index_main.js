console.log("js 연결")
// 창이 켜지면 나타나는 것들
window.onload = async function loadPostingView() {
  postings = await getpostings()
  console.log(postings)
  
  // 게시글 클릭 해당 게시글 상세페이지 이동 함수
  function articleDetail(post_id) {
    window.location.href = `${backend_base_url}/postings/post_id=${post_id}`
  }
  console.log(articleDetail)
  //최신 게시글 목록
  const post_list = document.getElementById('article-list')

  // postings 리스트에서 각 post 담아 forEach로 출력
  postings.forEach(post => {
    // class=col인 div 생성
    const newCol = document.createElement("div");
    newCol.setAttribute("class", "col")
    // 게시물 클릭하면 해당 상세페이지 이동
    newCol.setAttribute("onclick", `articleDetail(${post.id})`)
    // class=card인 div생성, post.id값
    const newCard = document.createElement("div")
    newCard.setAttribute("class", "card")
    newCard.setAttribute("id", post.id)
    newCol.appendChild(newCard)

    const articleImage = document.createElement("img")
    articleImage.setAttribute("src", `${backend_base_url}${post.image}`)
    articleImage.setAttribute("class", "card-img-top")
    newCard.appendChild(articleImage)

    const newCardBody = document.createElement("div")
    newCardBody.setAttribute("class", "card-body")
    newCard.appendChild(newCardBody)

    const newCardTitle = document.createElement("h5")
    newCardTitle.setAttribute("class", "card-title")
    newCardTitle.innerText = post.title
    newCardBody.appendChild(newCardTitle)


    post_list.appendChild(newCol)
  }
  );

}
