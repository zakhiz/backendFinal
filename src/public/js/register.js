const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  fetch("/api/sessions/register", {
    method: "POST",
    body: data,
  })
    .then((result) => result.json())
    .then((json) => {
      console.log(json);
      if (json.status === "success") {
        window.location.replace("/");
      }
    });
  form.reset();
});
