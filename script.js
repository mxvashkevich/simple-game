"use strict";
(() => {

  const buttonSendValues = document.querySelector(".send_values");
  const inputValue = document.getElementById("input_values");
  const gameAreaDiv = document.getElementById("gamearea");

  let sizeGlobal;
  let coordinateHeroGlobal = [];
  let coordinateGoalGlobal = [];

  function buildGameArea(size) {
    const area = 20 * size;
    let counter = 0;

    gameAreaDiv.style.width = `${area}px`;
    gameAreaDiv.style.height = `${area}px`;

    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) {
        counter++;
        gameAreaDiv.insertAdjacentHTML(
          "beforeend",
          `<div id="square_${counter}" class="square"></div>`
        );
      }
    }
  }

  function randomCoordinates(max) {
    const coordinateX = Math.floor(Math.random() * max);
    const coordinateY = Math.floor(Math.random() * max);
    const coordinatesArray = [coordinateX, coordinateY];
    console.log(coordinatesArray);
    return coordinatesArray;
  }

  function paintBlockHero(array, size, condition) {
    console.log(`Hero X: ${array[0]}, Hero Y: ${array[1]}`);
    const coordinateX = array[0]; // задаем координаты, по которым будет окрашиваться блок из входного массива координат
    const coordinateY = array[1];
    
    const coordinatePrint = `square_${
      size * (coordinateY + 1) - (size - coordinateX)
    }`; // вычисляем какой по счету блок будет окрашен
    const elem = document.getElementById(coordinatePrint);
    if (condition) {
      elem.style.backgroundColor = "red";
    } else {
      elem.style.backgroundColor = "aqua";
    }
    isWon();
  }

  function paintBlockGoal(array, size) {
    const coordinateX = array[0]; // задаем координаты, по которым будет окрашиваться блок из входного массива координат
    const coordinateY = array[1];

    const coordinatePrint = `square_${
      size * (coordinateY + 1) - (size - coordinateX)
    }`; // вычисляем какой по счету блок будет окрашен

    const elem = document.getElementById(coordinatePrint);
    elem.style.backgroundColor = "green";
  }

  function invisible() {
    inputValue.style.display = "none"; // делаем невидимыми интерфейсы ввода
    buttonSendValues.style.display = "none";
  }

  function isWon() {
      if (
        coordinateHeroGlobal.length !== 0 &&
        coordinateHeroGlobal[0] === coordinateGoalGlobal[0] &&
        coordinateHeroGlobal[1] === coordinateGoalGlobal[1]
        ) {
        document.querySelector('.text').innerHTML = 'ВЫ ВЫИГРАЛИ!';
        document.querySelector('.text').style.backgroundColor = 'red';
        document.querySelector('.text').style.fontSize = '28px';
      }
  }

  function createArea() {
    if (Number(inputValue.value.trim())) {
      const sizeGameArea = Number(inputValue.value.trim()); // забираем данные из инпута
      invisible();
      buildGameArea(sizeGameArea); //передаем введенное значение в функцию по постройке игровой доски
      coordinateHeroGlobal = randomCoordinates(sizeGameArea);
      coordinateGoalGlobal = randomCoordinates(sizeGameArea);
      paintBlockHero(coordinateHeroGlobal, sizeGameArea, true);
      paintBlockGoal(coordinateGoalGlobal, sizeGameArea);
      sizeGlobal = sizeGameArea;
    } else alert("Введи цифры!");
  }

  buttonSendValues.addEventListener("click", createArea);

  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "ArrowDown":
        
        if(coordinateHeroGlobal[1] - 1 < sizeGlobal)
        {
          console.log(`cHG0: ${coordinateHeroGlobal[0]}, cHG1: ${coordinateHeroGlobal[1]}, sizeG: ${sizeGlobal}`)
          paintBlockHero(coordinateHeroGlobal, sizeGlobal, false);
          coordinateHeroGlobal = [
          coordinateHeroGlobal[0],
          coordinateHeroGlobal[1] + 1,
        ];
        paintBlockHero(coordinateHeroGlobal, sizeGlobal, true);
        }
        
        break;
      case "ArrowUp":
        paintBlockHero(coordinateHeroGlobal, sizeGlobal, false);
        coordinateHeroGlobal = [
          coordinateHeroGlobal[0],
          coordinateHeroGlobal[1] - 1,
        ];
        paintBlockHero(coordinateHeroGlobal, sizeGlobal, true);
        break;
      case "ArrowLeft":
        paintBlockHero(coordinateHeroGlobal, sizeGlobal, false);
        coordinateHeroGlobal = [
          coordinateHeroGlobal[0] - 1,
          coordinateHeroGlobal[1],
        ];
        paintBlockHero(coordinateHeroGlobal, sizeGlobal, true);
        break;
      case "ArrowRight":
        paintBlockHero(coordinateHeroGlobal, sizeGlobal, false);
        coordinateHeroGlobal = [
          coordinateHeroGlobal[0] + 1,
          coordinateHeroGlobal[1],
        ];
        paintBlockHero(coordinateHeroGlobal, sizeGlobal, true);
        break;
        case "Enter": 
        createArea();
        break;
    }
  });
})()