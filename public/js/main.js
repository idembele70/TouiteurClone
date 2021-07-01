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
  document.onclick = (e) => {
    if (e.target == userFinder || e.target == owned_listbox) return;
    owned_listbox.innerHTML = "";
  };
}
function searchBarItems({ id, username, avatar }) {
  return `
  <a href="/users/${id}" style="width:200px; text-decoration: none;" >
  <li class="list-group-item" style="width:200px;">
      <div class="row">
        <div class="col-6">
          <img
            src="/static/assets/profile-picture/${avatar}"
            style="width:40px"
            alt="profile picture"
          />
          </div>
          <div class="col-6 text-center" style="line-height:40px">
          ${username}
        </div>
      </div>
      </li>
  </a>
    `;
}

if (document.getElementById("btn-follow")) {
  const btnFollow = document.getElementById("btn-follow");
  btnFollow.onclick = (e) => {
    e.preventDefault();
    fetch(e.target.href, { method: "PUT" });
    location.reload()
  };
}
