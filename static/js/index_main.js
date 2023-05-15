console.log("js 연결")

// 로그인한 사용자의 토큰을 저장하고 있는지 확인
const token = localStorage.getItem("access");
const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)

window.onload = async function loadPostingView() {
  try {
    const post_list = document.getElementById("article-list");
    // 최근 5개 게시글 가져오기
    const posts = await getpostings();

    // 게시글 목록을 뒤집어서 출력
    posts.slice(-5).reverse().forEach((post) => {
      const newCol = document.createElement("div");
      newCol.setAttribute("class", "col");
      newCol.addEventListener("click", async () => {
        try {
          const postData = await getPost(post.id, token);
          
          if (!token) {
            throw new Error("Unauthorized");
          }
           // 토큰 값 전달하여 게시글 상세 정보 가져오기
          
          window.location.href = `${frontend_base_url}/static/posting_detail.html?posting_id=${post.id}`
          
        } catch (error) {
          // window.location.href = "/static/login.html";
        }
      });

      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("id", post.id);

      const articleImage = document.createElement("img");
      articleImage.setAttribute("src", `${backend_base_url}${post.image}`);
      articleImage.setAttribute("class", "card-img-top_nmh");
      newCard.appendChild(articleImage);

      const newCardBody = document.createElement("div");
      newCardBody.setAttribute("class", "card-body");
      newCard.appendChild(newCardBody);

      const newCardTitle = document.createElement("h5");
      newCardTitle.setAttribute("class", "card-title");
      newCardTitle.innerText = post.title;
      newCardBody.appendChild(newCardTitle);

      newCol.appendChild(newCard);
      post_list.appendChild(newCol);
    });
  } catch (error) {
    console.error(error);
  };

  //hot 게시글 목록
  //// 아래는 검증필요!!!!! ////
  const hot_list = document.getElementById('hotissue-list');

  getTop5Postings().then(postings => {
    var s = postings.sort(function (a, b) {
      return b.comments_count - a.comments_count;
      });
      console.log(s)
    postings.slice(0,5).forEach(post => {
      const newCol = document.createElement("div");
      newCol.setAttribute("class", "col");
      newCol.addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("access");
          if (!token) {
            throw new Error("Unauthorized");
          }
    
          window.location.href = `${frontend_base_url}/static/posting_detail.html?posting_id=${post.id}`;
        } catch (error) {
          window.location.href = "/static/login.html";
        }
      });
    
      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("id", post.id);
      newCol.appendChild(newCard);
    
      const articleImage = document.createElement("img");
      articleImage.setAttribute("src", `${backend_base_url}${post.image}`);
      articleImage.setAttribute("class", "card-img-top_nmh");
      newCard.appendChild(articleImage);
    
      const newCardBody = document.createElement("div");
      newCardBody.setAttribute("class", "card-body");
      newCard.appendChild(newCardBody);
    
      const newCardTitle = document.createElement("h5");
      newCardTitle.setAttribute("class", "card-title");
      newCardTitle.innerText = post.title;
      newCardBody.appendChild(newCardTitle);
    
      hot_list.appendChild(newCol);
    });
  });
  
  

  //////////////////////////////////////////////////////////////////

  // const hot_list = document.getElementById('hotissue-list')

  // postings.slice(0, 5).forEach(post => {
  //   const newCol = document.createElement("div");
  //   newCol.setAttribute("class", "col")
  //   newCol.setAttribute("onclick", `articleDetail(${post.id})`)

  //   const newCard = document.createElement("div")
  //   newCard.setAttribute("class", "card")
  //   newCard.setAttribute("id", post.id)
  //   newCol.appendChild(newCard)

  //   const articleImage = document.createElement("img")
  //   articleImage.setAttribute("src", `${backend_base_url}${post.image}`)
  //   articleImage.setAttribute("class", "card-img-top_nmh")
  //   newCard.appendChild(articleImage)

  //   const newCardBody = document.createElement("div")
  //   newCardBody.setAttribute("class", "card-body")
  //   newCard.appendChild(newCardBody)

  //   const newCardTitle = document.createElement("h5")
  //   newCardTitle.setAttribute("class", "card-title")
  //   newCardTitle.innerText = post.title
  //   newCardBody.appendChild(newCardTitle)


  //   hot_list.appendChild(newCol)
  // }
  // );

  //////////////////////////////////////////////////////////////////

  //best 게시글 목록
  // const best_list = document.getElementById('best-list')

  // postings.slice(0, 5).forEach(post => {
  //   const newCol = document.createElement("div");
  //   newCol.setAttribute("class", "col")
  //   newCol.setAttribute("onclick", `articleDetail(${post.id})`)
    
  //   const newCard = document.createElement("div")
  //   newCard.setAttribute("class", "card")
  //   newCard.setAttribute("id", post.id)
  //   newCol.appendChild(newCard)

  //   const articleImage = document.createElement("img")
  //   articleImage.setAttribute("src", `${backend_base_url}${post.image}`)
  //   articleImage.setAttribute("class", "card-img-top_nmh")
  //   newCard.appendChild(articleImage)

  //   const newCardBody = document.createElement("div")
  //   newCardBody.setAttribute("class", "card-body")
  //   newCard.appendChild(newCardBody)

  //   const newCardTitle = document.createElement("h5")
  //   newCardTitle.setAttribute("class", "card-title")
  //   newCardTitle.innerText = post.title
  //   newCardBody.appendChild(newCardTitle)


  //   best_list.appendChild(newCol)
  // }
  // );
  
  const best_list = document.getElementById('best-list');

  getTop5LikedPostings().then(postings => {
    var s = postings.sort(function (a, b) {
      return b.likes_count - a.likes_count;
      });
      console.log(s)
    postings.slice(0,5).forEach(post => {
      const newCol = document.createElement("div");
      newCol.setAttribute("class", "col");
      newCol.addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("access");
          if (!token) {
            throw new Error("Unauthorized");
          }
          window.location.href = `${frontend_base_url}/static/posting_detail.html?posting_id=${post.id}`;
        } catch (error) {
          window.location.href = "/static/login.html";
        }
      });
  
      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("id", post.id);
      newCol.appendChild(newCard);
  
      const articleImage = document.createElement("img");
      articleImage.setAttribute("src", `${backend_base_url}${post.image}`);
      articleImage.setAttribute("class", "card-img-top_nmh");
      newCard.appendChild(articleImage);
  
      const newCardBody = document.createElement("div");
      newCardBody.setAttribute("class", "card-body");
      newCard.appendChild(newCardBody);
  
      const newCardTitle = document.createElement("h5");
      newCardTitle.setAttribute("class", "card-title");
      newCardTitle.innerText = post.title;
      newCardBody.appendChild(newCardTitle);
  
      best_list.appendChild(newCol);
    });
  });
  
}
