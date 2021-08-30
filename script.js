/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */

window.onload = function pixelArt() {
  const pixelBoard = document.getElementById('pixel-board');
  let tableSize = 5;

  function reloadPage() {
    document.location.reload(true);
  }

  function table() {
    for (let j = 0; j < tableSize; j += 1) {
      const linesClass = document.createElement('div');

      pixelBoard.appendChild(linesClass);
      for (let i = 0; i < tableSize; i += 1) {
        const ColumnClass = document.createElement('div');

        ColumnClass.classList.add('pixel');

        pixelBoard.appendChild(ColumnClass);
      }
    }
  }
  table();

  function tableNumberSize() {
    const inputLine = document.querySelector('#board-size').value;
    const invalidBoard = 'Board inválido!';

    console.log(inputLine);
    if (inputLine === null) {
      alert(invalidBoard);
    } else if (inputLine < 5) {
      tableSize = 5;
      alert(invalidBoard);
    } else if (inputLine > 50) {
      tableSize = 50;
      alert(invalidBoard);
    } else tableSize = inputLine;
    console.log(inputLine);
    pixelBoard.innerHTML = '';
    table();
  }

  function updateVisit() {
    if (typeof (Storage) !== 'undefined') {
      const num = parseFloat(localStorage.count);
      if (localStorage.count !== undefined) {
        let count = num;
        count += 1;
        localStorage.count = count;
        document.getElementById('count').innerHTML = count;
      } else {
        localStorage.count = 1;
        document.getElementById('count').innerHTML = 1;
      }
    } else {
      document.write('Sem suporte para Web Storage');
    }
  }
  updateVisit();

  function eraseVisits() {
    localStorage.count = 1;
    document.getElementById('count').innerHTML = 1;
  }

  const eraseVisitButton = document.querySelector('#erase-visits');
  eraseVisitButton.addEventListener('click', eraseVisits);

  function paint() {
    const colorPalette = document.getElementsByClassName('color');
    const pixel = document.getElementsByClassName('pixel');
    const color = ['black', 'red', 'blue', 'green'];
    const newColors = ['black'];

    function generateRandomNumber() {
      const min = Math.ceil(0);
      const max = Math.floor(256);
      const randomColor = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomColor;
    }

    for (let i = 0; i < 3; i += 1) {
      newColors.push(`rgb(${generateRandomNumber()},
        ${generateRandomNumber()}, ${generateRandomNumber()})`);
    }

    function changePaletteColor() {
      if (localStorage.count === '1') {
        for (let i = 0; i < colorPalette.length; i += 1) {
          colorPalette[i].style.backgroundColor = color[i];
        }
      } else {
        for (let i = 0; i < colorPalette.length; i += 1) {
          colorPalette[i].style.backgroundColor = newColors[i];
        }
      }
    }
    changePaletteColor();

    function PintNewPaletteColor(event) {
      const click = event;

      for (let i = 0; i < colorPalette.length; i += 1) {
        if (colorPalette[i].classList.contains('selected')) {
          click.target.style.backgroundColor = newColors[i];
        }
      }
    }

    function paintSelectedColor(event) {
      const click = event;

      if (localStorage.count === '1') {
        for (let i = 0; i < colorPalette.length; i += 1) {
          if (colorPalette[i].classList.contains('selected')) {
            click.target.style.backgroundColor = color[i];
          }
        }
      } else PintNewPaletteColor(click);
    }

    for (let i = 0; i < pixel.length; i += 1) {
      pixel[i].addEventListener('click', paintSelectedColor);
    }

    function selectedColor(event) {
      for (let i = 0; i < colorPalette.length; i += 1) {
        if (colorPalette[i].classList.contains('selected')) {
          colorPalette[i].classList.remove('selected');
        }
      }
      event.target.classList.add('selected');
      paintSelectedColor(event);
    }

    for (let i = 0; i < colorPalette.length; i += 1) {
      colorPalette[i].addEventListener('click', selectedColor);
    }

    function erase() {
      for (let i = 0; i < pixel.length; i += 1) {
        pixel[i].style.backgroundColor = 'white';
      }
    }

    function createEraseOne() {
      const paletteColor = document.getElementById('color-palette');
      const whitePixel = document.createElement('div');

      for (let i = 0; i < colorPalette.length; i += 1) {
        if (paletteColor.children[i].classList.contains('eraseColor')) {
          paletteColor.removeChild(paletteColor.children[i]);
        } else {
          whitePixel.classList.add('color');
          whitePixel.classList.add('eraseColor');
          paletteColor.appendChild(whitePixel);
        }
      }
    }

    const confirmLine = document.querySelector('#generate-board');
    const eraseBoard = document.querySelector('#clear-board');
    const erasePixel = document.querySelector('#clear-pixel');
    const reloadButton = document.querySelector('#reload-page');

    confirmLine.addEventListener('click', tableNumberSize);
    eraseBoard.addEventListener('click', erase);
    erasePixel.addEventListener('click', createEraseOne);
    reloadButton.addEventListener('click', reloadPage);
  }
  paint();
  eraseVisitButton.addEventListener('click', paint);
};
