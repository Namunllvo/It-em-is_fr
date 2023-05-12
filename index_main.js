console.log("js 연결")

// 로그인한 사용자의 토큰을 저장하고 있는지 확인
const token = localStorage.getItem("token");


// 창이 켜지면 나타나는 것들

// window.onload = async function loadPostingView() {
//   postings = await getpostings()
//   console.log(postings)
//   // 게시글 확인

//   //최신 게시글 목록
//   const post_list = document.getElementById('article-list')
//   //index_main에서 article-list를 post_list 변수에 담아 불러오기

//   // postings 리스트에서 끝에서 5개만 담아 forEach로 출력
//   postings.slice(-5).forEach(post => {
    
//     const newCol = document.createElement("div");
//     // class=col인 div 생성
//     newCol.setAttribute("class", "col")
//     // newCol 엘리먼트 생성

//         //// 수정중 ////

//     // newCol.setAttribute("onclick", `articleDetail(${post.id})`)
//     // class=card인 div생성, post.id값
//     // 게시물 클릭하면 해당 상세페이지 이동
//     newCol.addEventListener("click", async () => {
//       try {
//         // 로그인한 사용자인지 확인
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Unauthorized");
//         }
    
//         // 게시글 상세 페이지로 이동
//         window.location.href = `/articles/${post.id}`;
//       } catch (error) {
//         // 로그인하지 않은 사용자일 경우, 로그인 페이지로 이동
//         window.location.href = "/login.html";
//       }
//     });
    
//     ///// 수정중 ////



//     const newCard = document.createElement("div")
//     // newCard 엘리먼트 생성
//     newCard.setAttribute("class", "card")
//     // class="card" 속성 부여
//     newCard.setAttribute("id", post.id)
//     // id설정 (onclick 용도로 지정)
//     newCol.appendChild(newCard)
//     // newCard 하나하나를 newCol에 붙여줌

//     const articleImage = document.createElement("img")
//     articleImage.setAttribute("src", `${backend_base_url}${post.image}`)
//     articleImage.setAttribute("class", "card-img-top")
//     newCard.appendChild(articleImage)

//     const newCardBody = document.createElement("div")
//     newCardBody.setAttribute("class", "card-body")
//     newCard.appendChild(newCardBody)

//     const newCardTitle = document.createElement("h5")
//     newCardTitle.setAttribute("class", "card-title")
//     newCardTitle.innerText = post.title
//     newCardBody.appendChild(newCardTitle)


//     post_list.appendChild(newCol)
//     // 처음 불러왔던 post_list에 추가
//   }
//   );



window.onload = async function loadPostingView() {
  try {
    const post_list = document.getElementById("article-list");

    // 최근 5개 게시글 가져오기
    const posts = await getTop5Postings();

    // 게시글 목록을 뒤집어서 출력
    posts.slice(-5).reverse().forEach((post) => {
      const newCol = document.createElement("div");
      newCol.setAttribute("class", "col");
      newCol.addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Unauthorized");
          }

          window.location.href = `/articles/${post.id}`;
        } catch (error) {
          window.location.href = "/login.html";
        }
      });

      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("id", post.id);

      const articleImage = document.createElement("img");
      articleImage.setAttribute("src", `${backend_base_url}${post.image}`);
      articleImage.setAttribute("class", "card-img-top");
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
    postings.slice(0,5).forEach(post => {
      const newCol = document.createElement("div");
      newCol.setAttribute("class", "col");
      newCol.addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Unauthorized");
          }
    
          window.location.href = `/articles/${post.id}`;
        } catch (error) {
          window.location.href = "/login.html";
        }
      });
    
      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("id", post.id);
      newCol.appendChild(newCard);
    
      const articleImage = document.createElement("img");
      articleImage.setAttribute("src", `${backend_base_url}${post.image}`);
      articleImage.setAttribute("class", "card-img-top");
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
  //   articleImage.setAttribute("class", "card-img-top")
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
  //   articleImage.setAttribute("class", "card-img-top")
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
    postings.slice(0,5).forEach(post => {
      const newCol = document.createElement("div");
      newCol.setAttribute("class", "col");
      newCol.addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Unauthorized");
          }
          articleDetail(post.id);
        } catch (error) {
          window.location.href = "/login.html";
        }
      });
  
      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("id", post.id);
      newCol.appendChild(newCard);
  
      const articleImage = document.createElement("img");
      articleImage.setAttribute("src", `${backend_base_url}${post.image}`);
      articleImage.setAttribute("class", "card-img-top");
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
