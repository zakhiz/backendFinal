const add = document.querySelectorAll(".added");
for (let i = 0; i < add.length; i++) {
  add[i].addEventListener("click", async (e) => {
    const id = e.target.dataset;
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  });
}

const account = document.getElementById("btnPerfil");
const menu = document.getElementById("menu");
account.addEventListener("click", (e) => {
  account.classList.add("hidden");
  menu.innerHTML = `
     <div class="menu" >
        <a class="nav__container-button" id="cerrar">close</a>
        <a class="nav__container-button" href="/profile">Profile</a>
     <div>
    `;
  const cerrar = document.getElementById("cerrar");
  cerrar.addEventListener("click", () => {
    account.classList.remove("hidden");
    menu.innerHTML = "";
  });
});

const logout = () => {
  fetch("/api/sessions/logout")
    .then((res) => res.json())
    .then((json) => {
      if (json.status === "success") {
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      }
    });
};
