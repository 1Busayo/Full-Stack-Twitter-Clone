console.log("Hello");
const form = document.querySelector('form'); //selecting element from html
const loadingElement = document.querySelector('.loading');
const API_URL = 'https://twitterclone-stacksapien.c9users.io/geek';
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
   fetch(API_URL,{
     method : 'POST',
     body : JSON.stringify(geek),
     headers:{
       'content-type' : 'application/json'
     }
   });
});
