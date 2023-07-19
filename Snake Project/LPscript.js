document.addEventListener('DOMContentLoaded', function() {
    const imageDisplay = document.getElementById('example');
    let i = 1;
    setInterval( () => {
    i++;
    if (i === 3) {
      i = 1;
    }
    imageDisplay.src = `/Snake Project/Assests/ss${i}.png`
    }
    ,3 * 1000);
  });