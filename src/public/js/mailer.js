const caadd = document.querySelector(".buy");
caadd.addEventListener("click", async (e) => {
  const id = e.target.dataset;
  await fetch("/api/cart/mailer", {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  
  Toastify({
    text: "compra exitosa",
    duration: 3000,
    destination: "/products",
    newWindow:false,
    close: true,
    gravity: "top", 
    position: "left", 
    stopOnFocus: true, 
    style: {
      color : "#000",
      fontFamily: "sans-serif",
      background: "#d00000",
      borderRadius : "10px"
    },
    onClick: function(){} 
  }).showToast();
});