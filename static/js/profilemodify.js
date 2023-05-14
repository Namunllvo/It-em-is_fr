

// window.onload = ()=>{
//     console.log("로딩됨")
// }

// async function handleProfileModify(){

//     const nickname = document.getElementById("nickname").value
//     const password = document.getElementById("password").value
//     const password2 = document.getElementById("password2").value
//     const payload = localStorage.getItem("payload");
//     const payload_parse = JSON.parse(payload)
//     const id = payload_parse.user_id

//     const response = await fetch(`http://127.0.0.1:8000/users/profilemodify/${id}/`, {
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("access"),
//             'content-type': 'application/json',
//         },
//         method: 'PUT',
//         body: JSON.stringify({
//             "nickname" : nickname,
//             "password" : password,
//             "password2" : password2
//         })

//     })

//     console.log(response)

// }