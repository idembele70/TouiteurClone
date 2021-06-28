/* console.log();
const searchBtn = document.body.querySelector("#userFinder");
searchBtn.addEventListener("focus", function (e) {
  fetch("/touites/",
    {
      method : "GET",

    }
  )
})
 */

const followBtn = document.getElementById("btn-follow");

followBtn.onclick = function () {
  const userId = document.location.pathname.split("/")[2];
  fetch(`follow/${userId}`, {
    method: "GET",
  })
    .then(() => console.log("get update"))
    .catch(console.error);
};
