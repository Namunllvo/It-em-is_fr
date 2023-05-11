const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

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
    const response = await fetch(`${backend_base_url}/postings/${postingId}/`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


async function getComments(postingId) {
    const response = await fetch(`${backend_base_url}/postings/${postingId}/comment/`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}