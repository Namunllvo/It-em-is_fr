window.onload = ()=>{
    console.log("로딩됨")
}

async function handleProfileModify(){
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const response = await fetch('파이썬링크', {
        headers: {
            'content-type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "nickname" : nickname,
            "password" : password,
            "password2" : password2
        })

    })

    console.log(response)

}