const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

// 게시글 리스트 보여주는 함수
async function getpostings(){
  const response = await fetch(`${backend_base_url}/postings/`)
  // await으로 db가져올 시간동안 기다리기
  if (response.status == 200) {
    const response_json = await response.json()
    return response_json
  }
  else {
    alert("불러오기 실패")
  }
}
  
// 게시글 클릭 해당 게시글 상세페이지 이동 함수
function articleDetail(post_id) {
  window.location.href = `${backend_base_url}/postings/${post_id}/`
}