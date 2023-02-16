const form = document.getElementById("formProduct");
form.addEventListener('submit',async(e) =>{
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value,key)=> obj[key] = value)
  await fetch('/api/product',{
      method : 'POST',
      body : JSON.stringify(obj),
      headers : {
          'Content-Type' : 'application/json'
      }
  }).then(result => result.json())
    .then(json => console.log(json));
  form.reset();
})
