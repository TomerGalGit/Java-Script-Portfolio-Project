document.addEventListener("DOMContentLoaded", () => {
    const accessKey = "MFPxEuYmQ-1wBZshF_DmvDPZpMOhLg1dG2nQYDfDT8w";
  
    const formELEM = document.querySelector('form');
    const inputELEM = document.querySelector('#search-input');
    const searchResults = document.querySelector('.search-res');
    const showMoreBtn = document.querySelector('#showMore-btn');
  
    let inputData = "";
    let page = 1;
  
    async function searchForImage(){
      inputData = inputELEM.value;
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      const results = data.results;
  
      if(page === 1){
        searchResults.innerHTML = "";
      }
  
      results.map((result) => {
        const imageOverlay = document.createElement('div');
        imageOverlay.classList.add('search-res-box');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
  
        imageOverlay.appendChild(image);
        imageOverlay.appendChild(imageLink);
        searchResults.appendChild(imageOverlay);
      });
  
      page++;
  
      if(page > 1){
        showMoreBtn.style.display = 'block';
      }
    }
  
    formELEM.addEventListener("submit", (e) => {
      e.preventDefault();
      page = 1;
      searchForImage();
    });
  
    showMoreBtn.addEventListener('click', () => {
      searchForImage();
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const imageDisplay = document.getElementById('example');
    let i = 0;
    setInterval( () => {
    i++;
    if (i === 5) {
      i = 1;
    }
    imageDisplay.src = `/API Project/Images/ss${i}.png`
    }
    ,3 * 1000);
   
  });

  
