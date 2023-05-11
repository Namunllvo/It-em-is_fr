const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

async function getpostings(){
  const response = await fetch(`${backend_base_url}/postings/`)
  if (response.status == 200) {
    const response_json = await response.json()
    return response_json
  }
  else {
    alert("불러오기 실패")
  }
}

