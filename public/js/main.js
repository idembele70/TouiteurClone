if (document.getElementById("avatar")) {
  const avatarInput = document.getElementById("avatar");
  const addAvatar = document.getElementById("addAvatar");
  avatarInput.addEventListener("change", () => {
    addAvatar.click();
  });
}

if (document.getElementById("userFinder")) {
  const userFinder = document.getElementById("userFinder");
  const owned_listbox = document.getElementById("owned_listbox");
  userFinder.onfocus = userFinder.oninput = async (e) => {
    await fetch("/users/")
      .then((res) => res.json())
      .then((data) => {
        owned_listbox.innerHTML = "";
        data.users.forEach(({ _id: id, username, avatar }) => {
          if (username.match(e.target.value) || e.target.value == "")
            owned_listbox.innerHTML += searchBarItems({
              id,
              username,
              avatar,
            });
        });
      })
      .catch(console.error);
  };
  userFinder.onblur = () => {
    console.log("lose focus");
  };
}

function wait(duration) {
  const debut = Date.now();
  while (Date.now() - debut < duration);
}

function searchBarItems({ id, username, avatar }) {
  return `<li class="list-group-item" style="width:200px; z-index: 2">
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
