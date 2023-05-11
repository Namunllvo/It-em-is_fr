async function handlelogin(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email,password)

    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers: {
            'content-type' : 'application/json',
            // 다음 url로 fetch할 때까지 기다림.
            // 글 타입으로 JSon 형태를 받겠다
            // JWT 형식은 자바스크립트에서도 이어진다!

        },
        method: 'POST',
        body: JSON.stringify({
            "email" : email,
            "password" : password
            // JSon 형태이므로 반드시 쌍따옴표 쓰기
        })
        // stringfy = serialize
    })

    const response_json = await response.json()
    // 토큰을 주네?

    console.log(response_json)
    // 말 잘 듣나 확인

    localStorage.setItem("access", response_json.access);
    // access token 값(value)을 "access"라는 key 이름으로 저장
    localStorage.setItem("refresh", response_json.refresh);
    // refresh token 값(value)을 "refresh"라는 key 이름으로 저장

    const base64Url = accessToken.split('.')[1];
    // accessToken 문자열에서 점으로 분리된 두 번째 부분 (payload)을 추출
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Base64Url로 인코딩 된 문자열을 Base64로 디코딩하고, URL 안전 문자 (-와 _)를 Base64 표준 안전 문자 (+와 /)로 대체
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    // 디코딩 된 Base64 문자열을 UTF-8 문자열로 디코딩하고, URL로 인코딩 된 문자열을 디코딩합니다.

    localStorage.setItem("payload", response_json.jsonPayload);
    // 디코딩된 JSON 페이로드를 문자열로 저장합니다. 이 문자열은 localStorage 객체에 "payload" 키로 저장됩니다.


}