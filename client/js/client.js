console.log("Hello");
const form = document.querySelector('form'); //selecting element from html
const loadingElement = document.querySelector('.loading');
loadingElement.style.display = 'none';
form.addEventListener('submit',(event) => {
   event.preventDefault();
   const formData = new FormData(form);
   const name = formData.get('name');
   const content = formData.get('content');
   const geek = {
     name,
     content
   };
   form.style.display = 'none';
   loadingElement.style.display = '';
   console.log(geek);
});
