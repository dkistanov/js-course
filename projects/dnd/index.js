/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

let cursorElemX = 0;
let cursorElemY = 0;
let currentDraggle = null;

document.addEventListener('mousemove', (e) => {
  if (!currentDraggle || currentDraggle.tagName !== 'DIV') {
    return;
  }
  currentDraggle.style.left = e.clientX - cursorElemX + 'px';
  currentDraggle.style.top = e.clientY - cursorElemY + 'px';
});

function random(from, to) {
  return Math.round(Math.random() * (to - from));
}
function randomSize(from, to) {
  const width = random(from, to) + 'px';
  const height = random(from, to) + 'px';
  return `width: ${width};height: ${height};`;
}
function randomPosition() {
  return `position:absolute; left: ${random(0, 100)}%;top:${random(0, 100)}%;`;
}
function randomColor() {
  return 'background-color: #' + Math.floor(Math.random() * 16777215).toString(16) + ';';
}

export function createDiv() {
  const newDiv = document.createElement('div');
  newDiv.style.cssText = randomSize(0, 200) + randomPosition() + randomColor();
  newDiv.addEventListener('mousedown', (e) => {
    currentDraggle = e.target;
    cursorElemX = e.clientX - e.target.getBoundingClientRect().x;
    cursorElemY = e.clientY - e.target.getBoundingClientRect().y;
  });
  newDiv.addEventListener('mouseup', (e) => {
    currentDraggle = null;
  });
  return newDiv;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
