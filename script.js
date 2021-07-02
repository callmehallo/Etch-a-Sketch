"use strict";
const wrapper = document.querySelector(".wrapper");
//makes the right amount of divs
let mkDivs = (size = 16) => {
  for (let i = 1; i <= size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("grid");
    wrapper.append(div);
  }
};
mkDivs();
//Boolean um zwischen bleibender Linie und hover-effekt zu wechseln
const gridList = wrapper.childNodes;

let isToggle = false;
let toggle = document.querySelector(".toggle");
toggle.addEventListener("click", () => {
  if (isToggle) {
    return (isToggle = false);
  } else return (isToggle = true);
});

let onOff = (e) => {
  setTimeout(function () {
    e.target.setAttribute("style", "background-color: white");
  }, 100);
};

//callback fn for black lines
let hovBlack = (e) => {
  e.target.setAttribute("style", "background-color: black");
  if (isToggle === true) {
    onOff(e);
  }
};

gridList.forEach((gridList) => {
  gridList.addEventListener("mouseover", hovBlack);
});

const black = document.querySelector(".black");
black.addEventListener("click", (e) => {
  gridList.forEach((gridList) => {
    gridList.removeEventListener("mouseover", hovRGB);
    gridList.addEventListener("mouseover", hovBlack);
  });
});

//makes rgb colors
let mkRgb = () => {
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  return `background-color: rgb(${r},${g},${b})`;
};
//callback fn for rgb lines
let hovRGB = (e) => {
  let rgb = mkRgb();
  e.target.setAttribute("style", `${rgb}`);
  if (isToggle === true) {
    onOff(e);
  }
};

const rgb = document.querySelector(".rgbtn"); //btn for rgb

//makes rgb lines and removes black line hover effect:
rgb.addEventListener("click", (e) => {
  gridList.forEach((gridList) => {
    gridList.removeEventListener("mouseover", hovBlack);
    gridList.addEventListener("mouseover", hovRGB);
  });
});

//clears and resizes the grid
const resize = document.querySelector(".resize");
resize.addEventListener("click", () => {
  let size = prompt("how many squares per side do you wish?", "");
  if (size <= 100) {
    while (gridList.length > 0) {
      gridList[0].remove();
    }
    mkDivs(size);
    wrapper.setAttribute(
      "style",
      `grid-template-columns: repeat(${size}, 1fr);
        grid-template-rows: repeat(${size}, 1fr)`
    );
    gridList.forEach((gridList) => {
      gridList.addEventListener("mouseover", hovBlack);
    });
  } else {
    alert(
      "The highest Square size per side is 100. Please insert a smaller number"
    );
  }
});

//clear button that just clears grid:
const clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
  gridList.forEach((div) =>
    div.setAttribute("style", "background-color:white")
  );
});
