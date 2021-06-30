if (document.getElementById("avatar")) {
  const avatarInput = document.getElementById("avatar");
  const addAvatar = document.getElementById("addAvatar");
  avatarInput.addEventListener("change", () => {
    addAvatar.click();
  });
}
