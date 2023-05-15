let postingId

const urlParams = new URLSearchParams(window.location.search);
postingId = urlParams.get('posting_id');

function goPost(){
  window.location.replace(`${frontend_base_url}/static/posting_detail.html?posting_id=${postingId}`)  
}

// 게시글 수정하기
async function putPost() {
  // 현재 로그인 유저
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);
  const current_user = payload_parse.nickname;
  // 게시글 작성 유저
  const post_user = await getPost(postingId);
  const posting_user = post_user.user;
  
  const put = confirm("글을 수정하시겠습니까?")
  // 확인버튼
  if (put) {
    // 유저일치
    if (current_user===posting_user){
      const formData = new FormData();

      const title = document.getElementById("post_title").value
      const content = document.getElementById("post_content").value
      const image = document.getElementById("post_img").files[0]

      formData.append( "title", title );
      formData.append( "content", content );
      // 이미지가 있을 때만 데이터를 보냄
      if (image){
        formData.append( "image", image );
      }
      const response = await fetch(`${backend_base_url}/postings/${postingId}/`, {
          method: 'PUT',
          headers: {
              "Authorization":`Bearer ${token}`
          },
          body: formData
      })
      console.log(response.status, response)
    
      if (response.status == 200) {
          alert("게시글이 수정되었습니다!")
          window.location.replace(`${frontend_base_url}/static/posting_detail.html?posting_id=${postingId}`)
        }else{
          alert(`${response.status}\n제목과 내용을 모두 채워주세요!`)
        }
      }else{
        alert("수정할 권한이 없습니다")
        window.location.replace(`${frontend_base_url}/static/posting_detail.html?posting_id=${postingId}`)
      }
    }
  // 취소버튼
  else {
    alert("수정을 취소합니다.")
    location.reload()
  }
}

/* 게시글 생성하기 */
  async function putPosting(){
    const formData = new FormData();

    const title = document.getElementById("post_title").value
    const content = document.getElementById("post_content").value
    const image = document.getElementById("post_img").files[0]

    formData.append( "title", title );
    formData.append( "content", content );
    // 이미지가 있을 때만 데이터를 보냄
    if (image){
    formData.append( "image", image );
    }
    const response = await fetch(`${backend_base_url}/postings/`, {
          method: 'POST',
          headers: {
            "Authorization":`Bearer ${token}`
          },
          body: formData
    })

    console.log(response.status, response)
    
    if (response.status == 201) {
        alert("게시글이 생성되었습니다!")
        window.location.replace(`${frontend_base_url}/static/index.html`)
    }else{
      alert(`${response.status}\n제목과 내용을 모두 채워주세요!`)
    }
}

/* 썸네일 미리보기 함수 */
function setThumbnail(event) {
  var reader = new FileReader();

  reader.onload = function (event) {
    // 화살표 추가
    let icon = document.createElement("text");
    icon.innerText = '▼   ▼   ▼   ▼   ▼';
    icon.style.font = "50px solid";
    icon.style.margin = "0 50px 0 50px";
    icon.style.textAlign = "center";
    icon.style.color = "red";

    var img = document.createElement("img");
    img.setAttribute("src", event.target.result);

    // 썸네일 크기 조절
    img.style.width = "350px"; // 너비 200px로 설정
    img.style.height = "auto"; // 높이 자동 설정
    img.style.border = "3px dashed red";
    img.style.margin = "0 50px 0 50px";
    document.querySelector("div#image_container").appendChild(icon);
    document.querySelector("div#image_container").appendChild(img);
  };

  reader.readAsDataURL(event.target.files[0]);
}