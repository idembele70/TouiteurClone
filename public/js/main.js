if (document.getElementById("avatar")) {
  const avatarInput = document.getElementById("avatar");
  const addAvatar = document.getElementById("addAvatar");
  avatarInput.addEventListener("change", () => {
    addAvatar.click();
  });
}

if (document.getElementById("userFinder")) {
  const userFinder = document.getElementById("userFinder");
  const searchContainer = document.getElementById("searchContainer");
  userFinder.onfocus = userFinder.oninput = async (e) => {
    await fetch("/users/")
      .then((res) => res.json())
      .then((data) => {
        searchContainer.innerHTML = "";
        data.users.forEach(({ _id: id, username, avatar }) => {
          if (username.match(e.target.value) || e.target.value == "")
            searchContainer.innerHTML += searchBarItems({
              id,
              username,
              avatar,
            });
        });
      })
      .catch(console.error);
  };
  userFinder.onblur = function (e) {
    e.target.value = "";
    searchContainer.innerHTML = "";
  };
}

function searchBarItems({ id, username, avatar }) {
  return `<li class="list-group-item" style="width:200px">
      <div class="row">
        <div class="col-6">
          <img
            src="/static/assets/profile-picture/${avatar}"
            style="width:40px"
            alt="profile picture"
          />
        </div>
        <div class="col-6">
          <a href="/users/${id}">${username}</a>
        </div>
      </div>
    </li>`;
}
