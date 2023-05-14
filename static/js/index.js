console.log("메인 게시글 모든 posting리스트")
console.log(location.origin)


// 상세게시글로 이동
function postingDetail(posting_id) {
  console.log(posting_id)
  window.location.href = `${frontend_base_url}/static/posting_detail.html?posting_id=${posting_id}`
}

window.onload = async function loadPostings() {
  postings = await getPostings()
  console.log("0-max 까지 순차적으로")
  console.log(postings)

  const posting_list = document.getElementById("posting-list")
  posting_list.innerHTML = ""

  postings.forEach(posting => {
    const newCol = document.createElement("div");
    newCol.setAttribute("class", "col")
    // 상세 게시물로 이동
    newCol.setAttribute("onclick", `postingDetail(${posting.id})`)

    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card")
    newCard.setAttribute("id", posting.id)
    // console.log(newCard)

    newCol.appendChild(newCard)

    const newimgCard = document.createElement("div");
    newimgCard.setAttribute("class", "imgdiv")
    // newimgCard.setAttribute("id", posting.id)

    newCard.appendChild(newimgCard)

    const postingImage = document.createElement("img")
    postingImage.setAttribute("class", "card-img-top")
    postingImage.setAttribute("style", "width:100%; heigh:100%; object-fit: cover;")

    if (posting.image) {
      postingImage.setAttribute("src", `${backend_base_url}${posting.image}`)

    } else {
      postingImage.setAttribute("src", "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg")
    }


    newimgCard.appendChild(postingImage)

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

    const newCardCount = document.createElement("h6")
    newCardCount.setAttribute("class", "card-text")
    newCardCount.innerText = posting.likes_count
    newCardBody.appendChild(newCardCount)

    const newCardCommentCount = document.createElement("h6")
    newCardCommentCount.setAttribute("class", "card-text")
    newCardCommentCount.innerText = posting.comments_count
    newCardBody.appendChild(newCardCommentCount)



    posting_list.appendChild(newCol)


  });
}
// 보여지는 글자수 제한함수
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "...";
  } else {
    return str;
  }
}

// posting_list
// 최신순
async function news() {
  postings = await getPostings()
  console.log("0-max 까지 순차적으로")
  const posting_list = document.getElementById("posting-list")
  posting_list.innerHTML = ""
  // 생성시간 내림차순 reverse()
  postings.reverse().forEach(posting => {
    const newCol = document.createElement("div");
    newCol.setAttribute("class", "col")
    // 상세 게시물로 이동
    newCol.setAttribute("onclick", `postingDetail(${posting.id})`)

    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card")
    newCard.setAttribute("id", posting.id)
    // console.log(newCard)

    newCol.appendChild(newCard)

    const newimgCard = document.createElement("div");
    newimgCard.setAttribute("class", "imgdiv")
    // newimgCard.setAttribute("id", posting.id)

    newCard.appendChild(newimgCard)

    const postingImage = document.createElement("img")
    postingImage.setAttribute("class", "card-img-top")
    postingImage.setAttribute("style", "width:100%; heigh:100%; object-fit: cover;")

    if (posting.image) {
      postingImage.setAttribute("src", `${backend_base_url}${posting.image}`)

    } else {
      postingImage.setAttribute("src", "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg")
    }


    newimgCard.appendChild(postingImage)

    const newCardBody = document.createElement("div")
    newCardBody.setAttribute("class", "card-body")
    newCard.appendChild(newCardBody)

    const newCardTitle = document.createElement("h5")
    newCardTitle.setAttribute("class", "card-title")
    newCardTitle.innerText = posting.title
    newCardBody.appendChild(newCardTitle)

    const newCardContent = document.createElement("h6")
    newCardContent.setAttribute("class", "card-text")
    newCardContent.setAttribute("id", "card-text_myo")
    newCardContent.innerText = truncateString(posting.content, 20); //보이기 20자 제한
    newCardBody.appendChild(newCardContent)

    const newCardCount = document.createElement("h6")
    newCardCount.setAttribute("class", "card-text")
    newCardCount.innerText = `좋아요 ${posting.likes_count} | 댓글 ${posting.comments_count}`
    newCardBody.appendChild(newCardCount)

    posting_list.appendChild(newCol)
  });

};

// 핫이슈
async function hotissue() {
  postings = await getPostings()
  console.log("핫이슈")
  console.log(postings)
  var s = postings.sort(function (a, b) {
    return b.comments_count - a.comments_count;
  });
  console.log(s)
  postings.s

  const posting_list = document.getElementById("posting-list")
  posting_list.innerHTML = ""

  postings.forEach(posting => {
    const newCol = document.createElement("div");
    newCol.setAttribute("class", "col")
    // 상세 게시물로 이동
    newCol.setAttribute("onclick", `postingDetail(${posting.id})`)

    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card")
    newCard.setAttribute("id", posting.id)
    // console.log(newCard)

    newCol.appendChild(newCard)

    const newimgCard = document.createElement("div");
    newimgCard.setAttribute("class", "imgdiv")
    // newimgCard.setAttribute("id", posting.id)

    newCard.appendChild(newimgCard)

    const postingImage = document.createElement("img")
    postingImage.setAttribute("class", "card-img-top")
    postingImage.setAttribute("style", "width:100%; heigh:100%; object-fit: cover;")

    if (posting.image) {
      postingImage.setAttribute("src", `${backend_base_url}${posting.image}`)

    } else {
      postingImage.setAttribute("src", "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg")
    }


    newimgCard.appendChild(postingImage)

    const newCardBody = document.createElement("div")
    newCardBody.setAttribute("class", "card-body")
    newCard.appendChild(newCardBody)

    const newCardTitle = document.createElement("h5")
    newCardTitle.setAttribute("class", "card-title")
    newCardTitle.innerText = posting.title
    newCardBody.appendChild(newCardTitle)

    const newCardContent = document.createElement("h6")
    newCardContent.setAttribute("class", "card-text")
    newCardContent.setAttribute("id", "card-text_myo")
    newCardContent.innerText = truncateString(posting.content, 20); //보이기 20자 제한
    newCardBody.appendChild(newCardContent)

    const newCardCount = document.createElement("h6")
    newCardCount.setAttribute("class", "card-text")
    newCardCount.innerText = `좋아요 ${posting.likes_count} | 댓글 ${posting.comments_count}`
    newCardBody.appendChild(newCardCount)

    posting_list.appendChild(newCol)

  });

};

// 베스트
async function best() {
  postings = await getPostings()
  console.log("베스트")
  var s = postings.sort(function (a, b) {
    return b.likes_count - a.likes_count;
  });
  console.log(s)
  postings.s

  const posting_list = document.getElementById("posting-list")
  posting_list.innerHTML = ""

  postings.forEach(posting => {
    const newCol = document.createElement("div");
    newCol.setAttribute("class", "col")
    // 상세 게시물로 이동
    newCol.setAttribute("onclick", `postingDetail(${posting.id})`)

    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card")
    newCard.setAttribute("id", posting.id)
    // console.log(newCard)

    newCol.appendChild(newCard)

    const newimgCard = document.createElement("div");
    newimgCard.setAttribute("class", "imgdiv")
    // newimgCard.setAttribute("id", posting.id)

    newCard.appendChild(newimgCard)

    const postingImage = document.createElement("img")
    postingImage.setAttribute("class", "card-img-top")
    postingImage.setAttribute("style", "width:100%; heigh:100%; object-fit: cover;")

    if (posting.image) {
      postingImage.setAttribute("src", `${backend_base_url}${posting.image}`)

    } else {
      postingImage.setAttribute("src", "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg")
    }


    newimgCard.appendChild(postingImage)

    const newCardBody = document.createElement("div")
    newCardBody.setAttribute("class", "card-body")
    newCard.appendChild(newCardBody)

    const newCardTitle = document.createElement("h5")
    newCardTitle.setAttribute("class", "card-title")
    newCardTitle.innerText = posting.title
    newCardBody.appendChild(newCardTitle)

    const newCardContent = document.createElement("h6")
    newCardContent.setAttribute("class", "card-text")
    newCardContent.setAttribute("id", "card-text_myo")
    newCardContent.innerText = truncateString(posting.content, 20); //보이기 20자 제한
    newCardBody.appendChild(newCardContent)

    const newCardCount = document.createElement("h6")
    newCardCount.setAttribute("class", "card-text")
    newCardCount.innerText = `좋아요 ${posting.likes_count} | 댓글 ${posting.comments_count}`
    newCardBody.appendChild(newCardCount)

    posting_list.appendChild(newCol)
  });

};

// 페이지 네이션 -미완성
renderPagination: function pagination(currentPage) {
  // 현재 게시물의 전체 개수가 20개 이하면 pagination을 숨깁니다.
  if (_totalCount <= 8) return;

  var totalPage = Math.ceil(_totalCount / 8);
  var pageGroup = Math.ceil(currentPage / 8);

  var last = pageGroup * 8;
  if (last > totalPage) last = totalPage;
  var first = last - (8 - 1) <= 0 ? 1 : last - (8 - 1);

  const fragmentPage = document.createDocumentFragment();
  if (prev > 0) {
    var allpreli = document.createElement('li');
    allpreli.insertAdjacentHTML("beforeend", `<a href='#js-bottom' id='allprev'>&lt;&lt;</a>`);

    var preli = document.createElement('li');
    preli.insertAdjacentHTML("beforeend", `<a href='#js-ottom' id='prev'>&lt;</a>`);

    fragmentPage.appendChild(allpreli);
    fragmentPage.appendChild(preli);
  }

  for (var i = first; i <= last; i++) {
    const li = document.createElement("li");
    li.insertAdjacentHTML("beforeend", `<a href='#js-bottom' id='page-${i}' data-num='${i}'>${i}</a>`);
    fragmentPage.appendChild(li);
  }

  if (last < totalPage) {
    var allendli = document.createElement('li');
    allendli.insertAdjacentHTML("beforeend", `<a href='#js-bottom'  id='allnext'>&gt;&gt;</a>`);

    var endli = document.createElement('li');
    endli.insertAdjacentHTML("beforeend", `<a  href='#js-bottom'  id='next'>&gt;</a>`);

    fragmentPage.appendChild(endli);
    fragmentPage.appendChild(allendli);
  }

  document.getElementById('js-pagination').appendChild(fragmentPage);
  // 페이지 목록 생성

  $("#js-pagination a").click(function (e) {
    e.preventDefault();
    var $item = $(this);
    var $id = $item.attr("id");
    var selectedPage = $item.text();

    if ($id == "next") selectedPage = next;
    if ($id == "prev") selectedPage = prev;
    if ($id == "allprev") selectedPage = 1;
    if ($id == "allnext") selectedPage = totalPage;

    list.renderPagination(selectedPage);//페이지네이션 그리는 함수
    list.search(selectedPage);//페이지 그리는 함수
  });
};

