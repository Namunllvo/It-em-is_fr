console.log("상세게시글 댓글, 게시글, 팔로우, 좋아요 등등");
console.log("response.user");
let postingId;
let urlParams;
let date;
let msg;

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
  } else if (elapsedTime < day * 15) {
    elapsedText = Math.trunc(elapsedTime / day) + "일 전";
  } else {
    elapsedText = SimpleDateTimeFormat(date, "yyyy.M.d");
  }

  return elapsedText;
}

// 댓글 작성
async function submitComment() {
  urlParams = new URLSearchParams(window.location.search);
  postingId = urlParams.get("posting_id");
  const commentElement = document.getElementById("new-comment");
  let newComment = commentElement.value;
  postComment(postingId, newComment);
  loadComments(postingId);
  commentElement.value = ""; //입력란 공백처리
}

// 댓글 수정
async function putCommentMode(commentId) {
  msg = confirm("댓글을 수정하시겠습니까?");
  if (msg) {
    urlParams = new URLSearchParams(window.location.search);
    postingId = urlParams.get("posting_id");

    const comment_response = await getComments(postingId);
    let comment = comment_response.find((comment) => comment.id === commentId);
    console.log(comment);
    const put_comment = document.getElementById(`${commentId}`);
    console.log("put_comment", put_comment);
    // 해당 댓글 모습 변경
    put_comment.innerHTML = `
    <div class="card-header" style="font-style: solid; font-size:20px">By ${comment.user}
    <div class="card-div" style="display: inline-block; float: right;" id="card-div">
    <button class="btn btn-default btn-xs" id="card-btn1" type="button" onclick="putComment(${commentId},'수정이되었어요..?')" style="">
    수정</button>
    <button class="btn btn-light" id="card-btn2" type="button" onclick="loadComments(postingId)" style="">
    취소</button>
    </div>
    </div>
    <textarea type="text" class="new-comment_myo" id="put_${comment.id}" rows="2" maxlength="100" placeholder="댓글을 작성해주세요.">${comment.comment}</textarea>
    `;
  }
  //   loadComments(postingId);
}

// 댓글 삭제
async function delComment(commentId) {
  urlParams = new URLSearchParams(window.location.search);
  postingId = urlParams.get("posting_id");
  msg = confirm("댓글을 삭제하시겠습니까?");
  if (msg) {
    deleteComment(commentId);
  }
  loadComments(postingId);
}

// 댓글 불러오기
async function loadComments(postingId) {
  // 현재 로그인 유저
  let payload = localStorage.getItem("payload");
  let payload_parse = JSON.parse(payload);
  let current_user = payload_parse.nickname;
  urlParams = new URLSearchParams(window.location.search);
  postingId = urlParams.get("posting_id");

  const response = await getComments(postingId);

  const comment_list = document.getElementById("comment-list");
  comment_list.innerHTML = ""; //댓글비우기

  // 최신순 배열을 위해 역순배열 reverse()
  response.reverse().forEach((comment) => {
    // 댓글 작성 유저
    const comment_user = comment.user;

    const newCol = document.createElement("div");
    newCol.setAttribute("class", "col");
    // 19강 참고
    // commentList.innerHTML +=
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    newCard.setAttribute("id", comment.id);

    newCol.appendChild(newCard);

    // 댓글 작성 유저 표시
    const newCardHeader = document.createElement("div");
    newCardHeader.setAttribute("class", "card-header");
    newCardHeader.setAttribute("style", "font-style: solid; font-size:20px");
    newCardHeader.innerText = `By ${comment.user}`;
    newCard.append(newCardHeader);

    // 로그인 유저와 댓글 작성자가 같다면 수정 삭제 버튼 보이기
    if (current_user == comment_user) {
      // 수정 삭제 버튼 공간
      const newCardHead = document.createElement("div");
      newCardHead.setAttribute("class", "card-div");
      newCardHead.setAttribute("style", "display: inline-block; float: right;");
      newCardHead.setAttribute("id", "card-div");
      newCardHeader.append(newCardHead);

      // 수정 버튼
      const toggleBtnPutbtn = document.createElement("button");
      toggleBtnPutbtn.setAttribute("class", "btn btn-default btn-xs");
      toggleBtnPutbtn.setAttribute("id", "card-btn1");
      toggleBtnPutbtn.setAttribute("type", "button");
      toggleBtnPutbtn.setAttribute("onclick", `putCommentMode(${comment.id});`);
      toggleBtnPutbtn.setAttribute("style", "");
      toggleBtnPutbtn.innerHTML = "수정";

      newCardHead.appendChild(toggleBtnPutbtn);

      // 삭제 버튼
      const toggleBtnDelete = document.createElement("button");
      toggleBtnDelete.setAttribute("class", "btn btn-light");
      toggleBtnDelete.setAttribute("id", "card-btn2");
      toggleBtnDelete.setAttribute("type", "button");
      toggleBtnDelete.setAttribute("onclick", `delComment(${comment.id})`);
      toggleBtnDelete.setAttribute("style", "");
      toggleBtnDelete.innerHTML = "삭제";

      newCardHead.appendChild(toggleBtnDelete);
    }
    const newCardBody = document.createElement("div");
    newCardBody.setAttribute("class", "card-body");
    newCardBody.innerText = comment.comment;
    newCard.appendChild(newCardBody);

    // 작성시간
    const newCardTimestamp = document.createElement("h10");
    newCardTimestamp.setAttribute("class", "card-text_");

    var date = comment.updated_at;
    var date_ = new Date(date);
    var time = elapsedText(date_);
    newCardTimestamp.innerText = time;

    newCard.appendChild(newCardTimestamp);

    comment_list.appendChild(newCol);
  });
}

// 게시글 수정페이지로 이동
async function putPosting(postingId) {
  urlParams = new URLSearchParams(window.location.search);
  postingId = urlParams.get("posting_id");

  // 현재 로그인 유저
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);
  const current_user = payload_parse.nickname;
  // 게시글 작성 유저
  const response = await getPost(postingId);
  const posting_user = response.user;

  const put = confirm("글을 수정하시겠습니까?");
  // 확인버튼
  if (put == true) {
    // 작성한 유저가 맞음
    if (current_user == posting_user) {
      // 수정페이지 이동
      window.location.replace(
        `${frontend_base_url}/static/update_posting.html?posting_id=${postingId}`
      );
    }
    // 작성한 유저가 아님
    else {
      alert("수정할 권한이 없습니다");
      location.reload();
    }
  }
  // 취소버튼
  else {
    alert("수정을 취소합니다.");
    location.reload();
  }
}

// 게시글 삭제하기
async function deletePosting(postingId) {
  urlParams = new URLSearchParams(window.location.search);
  postingId = urlParams.get("posting_id");
  deletePost(postingId);
}

// 게시글 불러오기
async function loadPostings(postingId) {
  // 현재 로그인 유저
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);
  const current_user = payload_parse.nickname;
  // 게시글 작성 유저
  const response = await getPost(postingId);
  const posting_user = response.user;

  // 현재 로그인 유저와 게시글 작성 유저가 같을 때 수정,삭제 보이기
  if (current_user == posting_user) {
    let articleBtn = document.getElementById("articleBtn");

    let putBtn = document.createElement("button");
    putBtn.innerText = "수정";
    putBtn.type = "put";
    putBtn.className = "btn btn-info btn-sm";
    putBtn.setAttribute("onclick", "putPosting()");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "삭제";
    deleteBtn.type = "delete";
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.setAttribute("onclick", "deletePosting()");

    articleBtn.appendChild(putBtn);
    articleBtn.appendChild(deleteBtn);
  }

  const postingTitle = document.getElementById("posting-title");
  const postingImage = document.getElementById("posting-image");
  const postingContent = document.getElementById("posting-content");
  const postingUser = document.getElementById("posting-user");
  const postingLikes = document.getElementById("like-count");
  const followUser = document.getElementById("follow-user");

  postingTitle.innerText = response.title;
  postingContent.innerText = response.content;
  postingUser.innerText = `작성자 ${response.user}`;
  postingLikes.innerText = response.likes_count;
  followUser.innerText = response.user;
  const newImage = document.createElement("img");

  if (response.image) {
    newImage.setAttribute("src", `${backend_base_url}${response.image}`);
    // newImage.setAttribute("src", "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg")
  } else {
    newImage.setAttribute(
      "src",
      "https://cdn.pixabay.com/photo/2017/01/26/18/09/length-landscape-2011238__480.jpg"
    );
  }

  // newImage.setAttribute("src", `${backend_base_url}${response.image}`)
  newImage.setAttribute("class", "img-fluid"); // 부트스트랩 사용시 이미지 크기 조절

  postingImage.appendChild(newImage);
}

// 팔로우 -미완성
// async function follow() {
//     // const response = await postfollow();
//     // console.log(response)
//     console.log("팔로우 post")
// }

// 좋아요 -미완성
// async function like(postingId) {
//     // const urlParams = new URLSearchParams(window.location.search);
//     // postingId = urlParams.get('posting_id');
//     // const response = await postlike(postingId);
//     // console.log(response)
//     console.log("좋아요 post")
// }

window.onload = async function () {
  urlParams = new URLSearchParams(window.location.search);
  postingId = urlParams.get("posting_id");

  await loadPostings(postingId);
  await loadComments(postingId);
  // await follow(postingId);
  // await like(postingId);
};
