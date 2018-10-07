console.log("Hello");
const form = document.querySelector('form'); //selecting element from html
const loadingElement = document.querySelector('.loading');
const API_URL = 'https://twitterclone-stacksapien.c9users.io/geek';
const geekElement = document.querySelector('.geeks');
listAllGeeks();
loadingElement.style.display = '';
form.addEventListener('submit',(event) => {
   event.preventDefault();
   const formData = new FormData(form);
   const name = formData.get('name');
   const content = formData.get('content');
   const geek = {
     name,
     content
   };
   form.style.display = '';
   loadingElement.style.display = '';
   fetch(API_URL,{
     method : 'POST',
     body : JSON.stringify(geek),
     headers:{
       'content-type' : 'application/json'
     }
   }).then(response => response.json())
   .then(createdGeek => {
     form.reset();
     //form.style.display = 'none';

     listAllGeeks();
   });
});
function listAllGeeks(){
  geekElement.innerHTML = '';
  fetch(API_URL)
  .then(response =>response.json())
  .then(geeks => {
    console.log(geeks);
    geeks.reverse();
    geeks.forEach(geek =>{
      const div = document.createElement('div');

      const header = document.createElement('h3');
      header.textContent = geek.name;

      const contents = document.createElement('p');
      contents.textContent = geek.content;

      const date = document.createElement('small');
      date.textContent = new Date(geek.created);

      div.appendChild(header);
      div.appendChild(contents);
      div.appendChild(date);
      geekElement.appendChild(div);
    });
    loadingElement.style.display = 'none';
  });
};
