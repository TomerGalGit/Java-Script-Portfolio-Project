document.addEventListener('DOMContentLoaded', function() {
    const imageDisplay = document.getElementById('example');
    let i = 1;
    setInterval( () => {
    i++;
    if (i === 4) {
      i = 1;
    }
    imageDisplay.src = `/Whack-A-Mole Project/Assets/Images/ss${i}.png`
    }
    ,3 * 1000);
  });