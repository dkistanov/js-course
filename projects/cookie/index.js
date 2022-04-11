/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

window.addEventListener('load', function () {
  const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
  for (const cookie in cookies) {
    addCookieToTable(cookie, cookies[cookie]);
  }
});

filterNameInput.addEventListener('input', function () {
  for (const elem of listTable.children) {
    if (checkChild(elem, filterNameInput.value, true)) {
      elem.classList.remove('hidden');
    } else {
      elem.classList.add('hidden');
    }
  }
  // checkChild(listTable, addNameInput.value);
});

function addCookieToTable(name, value) {
  document.cookie = `${name}=${value}`;
  addNameInput.value = '';
  addValueInput.value = '';

  const newCookie = document.createElement('tr');
  const removeButtonCont = document.createElement('th');
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Удалить';
  removeButton.addEventListener('click', function (e) {
    e.preventDefault();
    listTable.removeChild(newCookie);
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  });
  removeButtonCont.appendChild(removeButton);
  newCookie.innerHTML = `<th>${name}</th><th>${value}</th>`;
  newCookie.appendChild(removeButtonCont);
  if (!name.includes(filterNameInput.value) || !name.includes(filterNameInput.value)) {
    newCookie.classList.add('hidden');
  }
  listTable.appendChild(newCookie);
}
function checkChild(parent, name, filter = false) {
  if (!parent.children.length) {
    return false;
  }
  const firstChild = parent.children[0];
  if (filter) {
    if (
      (firstChild.tagName === 'TH' && firstChild.textContent.includes(name)) ||
      firstChild.nextElementSibling.textContent.includes(name)
    ) {
      return true;
    }
  } else {
    if (firstChild.tagName === 'TH' && firstChild.textContent === name) {
      return firstChild;
    }
  }
  for (const child of parent.children) {
    const result = checkChild(child, name);
    if (result) {
      return result;
    }
  }
  return false;
}
function refreshAddedCookie(name, value) {
  const addedChild = checkChild(listTable, name) || null;
  const addedChildParent = addedChild.parentElement;
  if (!addedChild) {
    return;
  }

  if (checkChild(addedChildParent, filterNameInput.value, true)) {
    addedChildParent.classList.add('hidden');
  }
  addedChild.nextElementSibling.textContent = value;
  document.cookie = `${name}=${value}`;
}

addButton.addEventListener('click', () => {
  const cookieName = addNameInput.value;
  const cookieValue = addValueInput.value;
  let isCookieAdded = false;
  const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
  for (const cookie in cookies) {
    if (cookie === cookieName) {
      isCookieAdded = true;
    }
  }
  if (!isCookieAdded) {
    addCookieToTable(cookieName, cookieValue);
  } else {
    refreshAddedCookie(cookieName, cookieValue);
  }
});

listTable.addEventListener('click', (e) => {});
