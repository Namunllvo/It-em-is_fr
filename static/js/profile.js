const frontend_base_url = "http://127.0.0.1:5500";
const backend_base_url = "http://127.0.0.1:8000";

/* 헤더 푸터 가져오기 */
fetch("./header-footer.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("header").innerHTML = data;
  });
