const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

let token = localStorage.getItem("access")

// 모든 게시글 가져오기
async function getPostings() {
    const response = await fetch(`${backend_base_url}/postings/`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("--불러오기 실패--")
    }
}

// url의 게시글 id 받아오기
async function getPost(postingId) {
    const response = await fetch(`${backend_base_url}/postings/${postingId}/`, {
        method: 'GET',
        // credentials: "include",
        headers: {
            //"application/json; charset=utf-8"
            'Authorization': `Bearer ${token}`,
        },
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


async function getComments(postingId) {
    const response = await fetch(`${backend_base_url}/postings/${postingId}/comment/`, {
        method: 'GET',
        // credentials: "include",
        headers: {
            //"application/json; charset=utf-8"
            'Authorization': `Bearer ${token}`,
        },
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

async function postComment(postingId, newComment) {


    const response = await fetch(`${backend_base_url}/postings/${postingId}/comment/`, {
        // mode: 'no-cors',
        method: 'POST',
        // credentials: "include",
        headers: {
            'Content-Type': "application/json",      //"application/json; charset=utf-8"
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            "comment": newComment,
        })
    }
    )
    console.log(response)
    console.log(typeof response)

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert("꺼져")
    }
}
