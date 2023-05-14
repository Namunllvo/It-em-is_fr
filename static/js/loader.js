function handlelogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    window.location.replace('http://127.0.0.1:5500/static/login.html')
}

function goBack() {
    window.history.back();
}

async function injectHeader() {
    /* 헤더 푸터 가져오기 */
    fetch("./header-footer.html")
    .then((response) => {
    return response.text();
    })
    .then((data) => {
    document.querySelector("header").innerHTML = data;
    })

    let headerHtml = await fetch("./header-footer.html")
    let data = await headerHtml.text()
    document.querySelector("header").innerHTML = data; 

    const payload = localStorage.getItem("payload");
    // payload가 존재 = 로그인되어있다면
    if (payload) {
        const payload_parse = JSON.parse(payload)

        const intro = document.getElementById("intro")
        intro.innerHTML =`${payload_parse.nickname}님 오셨군요!`

        let headerRight = document.getElementById("header-right")

        let mypage = document.createElement("ul")
        mypage.innerText="마이페이지"
        mypage.setAttribute("onclick","location.href='/static/profile.html';")
        
        let logout = document.createElement("ul")
        logout.innerText="로그아웃"
        logout.setAttribute("onclick","handlelogout()")
        
        headerRight.appendChild(mypage)
        headerRight.appendChild(logout)

        let login = document.getElementById("login")
        login.style.display = "none";
    }
}

injectHeader();



