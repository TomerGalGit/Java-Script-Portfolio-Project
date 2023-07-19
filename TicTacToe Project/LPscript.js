document.addEventListener('DOMContentLoaded', function() {
    const imageDisplay = document.getElementById('example');
    let i = 0;
    setInterval( () => {
    i++;
    if (i === 3) {
      i = 1;
    }
    imageDisplay.src = `/TicTacToe Project/Images/ss${i}.png`
    }
    ,3 * 1000);
   
  });