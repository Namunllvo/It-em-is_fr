console.log("js 연결")
// 창이 켜지면 나타나는 것들
window.onload = async function loadPostingView() {
  postings = await getpostings()
  console.log(postings)
  // 게시글 확인

  //최신 게시글 목록
  const post_list = document.getElementById('article-list')
  //index_main에서 article-list를 post_list 변수에 담아 불러오기

  // postings 리스트에서 각 post 담아 forEach로 출력
  postings.forEach(post => {
    // class=col인 div 생성
    const newCol = document.createElement("div");
    // newCol 엘리먼트 생성
    newCol.setAttribute("class", "col")
    // 게시물 클릭하면 해당 상세페이지 이동
    newCol.setAttribute("onclick", `articleDetail(${post.id})`)
    // class=card인 div생성, post.id값
    const newCard = document.createElement("div")
    // newCard 엘리먼트 생성
    newCard.setAttribute("class", "card")
    // class="card" 속성 부여
    newCard.setAttribute("id", post.id)
    // id설정 (onclick 용도로 지정)
    newCol.appendChild(newCard)
    // newCard 하나하나를 newCol에 붙여줌

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
    // 처음 불러왔던 post_list에 추가
  }
  );

  //hot 게시글 목록
  const hot_list = document.getElementById('hotissue-list')

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


    hot_list.appendChild(newCol)
  }
  );

  //best 게시글 목록
  const best_list = document.getElementById('best-list')

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


    best_list.appendChild(newCol)
  }
  );
}
