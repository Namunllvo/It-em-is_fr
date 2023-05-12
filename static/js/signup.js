/* 헤더 푸터 가져오기 */
fetch("./header-footer.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("header").innerHTML = data;
  });

window.onload = () => {
    console.log("로딩됨")
}

// async function handleSignup(){
//     const email = document.getElementById("email").value
//     const nickname = document.getElementById("nickname").value
//     const password = document.getElementById("password").value
//     const password2 = document.getElementById("password2").value
//     const image = document.getElementById("image").files[0]
//     console.log(email,password,nickname,image)

//     const response = await fetch("http://127.0.0.1:8000/users/signup/", {
//         headers: {
//             'content-type' : 'application/json',
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             "email" : email,
//             "nickname" : nickname,
//             "password" : password,
//             "password2" : password2,
//             "image" : image
//         })

//     })

//     console.log(response)

//     if (response.status == 201) {
//         alert("회원가입을 축하합니다!")
//         window.location.replace('http://127.0.0.1:5500/login.html')
//     }

//     return response
// }

async function handleSignup() {

    const email = document.getElementById("email").value
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const image = document.getElementById("image").files[0]



    const response = await fetch("http://127.0.0.1:8000/users/signup/", {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "nickname": nickname,
            "password": password,
            "password2": password2,
            "image": image
        })
    })


    if (response.status == 201) {
        alert("회원가입을 축하합니다!")
        window.location.replace('http://127.0.0.1:5500/login.html')
    }

    return response
}



function redirectToLogin() {
    window.location.href = "login.html";
}
// async function handleSignupButton() {
//     const response = await handleSignup();

//     if (response.status == 201) {
//         alert("회원가입을 축하합니다!")
//         window.location.replace(${}/login.html)
//     }
// }

/* 썸네일 미리보기 함수 */
function setThumbnail(event) {
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = document.createElement("img");
        img.setAttribute("src", event.target.result);

        // 썸네일 크기 조절
        img.style.width = "200px"; // 너비 200px로 설정
        img.style.height = "auto"; // 높이 자동 설정
        document
            .querySelector("div#image_container")
            .appendChild(img);
    };

    reader.readAsDataURL(event.target.files[0]);
}

function handlelogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}

// async function handleMock(){
//     const response = await fetch('http://127.0.0.1:8000/users/nock/', {
//         headers: {
//             "authorization" : "Bearer " + localStorage.getItem("access"),
//             // 글 타입으로 JSon 형태를 받겠다
//             // JWT 형식은 자바스크립트에서도 이어진다!

//         },
//         method: 'GET',
//         body: JSON.stringify({
//             "email" : email,
//             "password" : password
//             // JSon 형태이므로 반드시 쌍따옴표 쓰기
//         })
//         // stringfy = serialize
//     })

//     console.log(response)
// }

