const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

let token = localStorage.getItem("access")


/* 게시글 생성하기 */
  async function createPosting(){
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