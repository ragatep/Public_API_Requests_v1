/**
 *  Treehouse FSJS Techdegree:
 *  Project 5 - Public API Requests
 *  Student: Ryan Agatep
 *  app.js
 */

'use strict';

const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');
/**
 *  12 random users are pulled from the API in a single request.
 */
const urls = [
  'https://randomuser.me/api/?results=12&nat=us'
  /** 
   * I created an array of urls in case I need another url in the future.
  */
];
/**
 *  Arrays that are used for holding different versions of the list of employees.
 */
let workingDirectories = [];
let previousDirectories = [];
let newDirectories = [];
/**
 *  Builds the Search field section.
 */
const searchContainer = document.querySelector('.search-container');
const searchHTML = `
  <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
  `;
searchContainer.insertAdjacentHTML('afterBegin', searchHTML);

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

/**
 *  Function that fetch data from a url, checks the status of the connection
 *  and parse data to json.
 */
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => console.log('Looks like there was a problem', error))
}
/**
 *  Promise that calls fetchData(url) and gets ALL data to a list 
 *  and stores to multiple arrays for later use.
 */
Promise.all(urls.map(url =>
  fetchData(url)
))
.then(data => {
  const employeeList = data[0].results;
  workingDirectories.push(employeeList);
  previousDirectories.push(employeeList);
  generateGallery(employeeList);
})

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

/**
 *  Checks the status of the etchData(url) connection
 */
function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
/**
 *  Takes the workingDirectories[0] list then
 *  compares each item with the value from searchInput.
 *  If there is match add the item to newDirectories[0] and return true.
 */
function searchResult(lists){
  let searchInput = document.querySelector('#search-input').value;
  let searchResults = [];
  lists.forEach(employee => {
    let employeeName = `${employee.name.first} ${employee.name.last}`;
      if(searchInput.lenght !== 0) {
        if(employeeName.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())) {
          searchResults.push(employee);
        } 
      }
    })
    if(searchResults.length > 0){
      newDirectories[0] = searchResults;
      return true;
    }
}
/**
 * Takes the employeeList list and builds the employee cards in the gallery.
 * Employee image, first and last name, email and city.
 */
function generateGallery(employeeList) {
  const galleryCard = employeeList.map(card => `
    <div class="card" id="${employeeList.indexOf(card)}">
      <div class="card-img-container">
        <img class="card-img" src="${card.picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${card.name.first} ${card.name.last}</h3>
        <p class="card-text">${card.email}</p>
        <p class="card-text cap">${card.location.city}, ${card.location.state}</p>
      </div>
    </div>
  `).join('');
  gallery.insertAdjacentHTML('beforeEnd', galleryCard);
}
/**
 *  Takes the information from a card that was clicked including its id,
 *  builds a modal and inserts it in the 'body'
 *  If the there is cell information then call formatCellPhoneNumber();.
 *  If there is dob information then call formatDate();.
 *  Converts state names to abbreviations.
 *  Employee image, first and last name, email and city, cell number, address and dob.
 */
function generateModal(clicked, cardId) {
  const cell = formatCellPhoneNumber(clicked.cell, true);
  const dob = formatDate(clicked.dob.date, true);
  const state = stateNameToAbbreviation(clicked.location.state, true);
  const modal = `
    <div class="modal-container" id="${cardId}">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${clicked.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${clicked.name.first} ${clicked.name.last}</h3>
              <p class="modal-text">📧 ${clicked.email}</p>
              <p class="modal-text cap">🏙️ ${clicked.location.city}</p>
              <hr>
              <p class="modal-text phone_us">📱 ${cell}</p>
              <p class="modal-text cap">🏠 ${clicked.location.street.number} ${clicked.location.street.name}, ${clicked.location.city}, ${state} ${clicked.location.postcode}</p>
              <p class="modal-text">🎂 Birthday: ${dob}</p>
          </div>
      </div>

      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">⬅️ Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next ➡️</button>
      </div>
    </div>
    `;
  gallery.insertAdjacentHTML('afterEnd', modal);
}

function reloadList() {
  const reloadList = `
    <div class="reload-info-container">
      <hr>
      <h2 class="reload-text">🤔 Hmmm... </h2>
      <p class="reload-text">We couldn't find any matches.</p>
      <p class="reload-text">Click inside the Search Box to reload the current list of employees or, refresh the page to get a new list.</p>
      <hr>
    </div>
  `;
  gallery.insertAdjacentHTML('beforeEnd', reloadList);
}

/**
 *  Function that closes the modal.
 */
const closeModal = () => document.querySelector('.modal-container').remove();
/**
 *  Function that removes the modal buttons.
 */
const removeModalButtonContainer = () => document.querySelector('.modal-btn-container').remove();
/**
 *  Function that converts cell phone number to this format: (XXX) XXX-XXXX.
 *  Returns formatted cell phone number.
 */
const formatCellPhoneNumber = (originalCellNumber) => {
  const replaceSpecialCharters = originalCellNumber.replaceAll((/[^\d]/g), '');
  const formattedCellNumber = replaceSpecialCharters.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  return formattedCellNumber;
}
/**
 *  Function that converts a date to this format: MM/DD/YYYY.
 *  Returns formatted date.
 */
const formatDate = (originalDate) => {
  let year = originalDate.substring(0,4);
  let month = originalDate.substring(5,7);
  let day = originalDate.substring(8,10);
  return `${month}/${day}/${year}`;
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

/**
 *  Added a search feature so that students can be filtered by name.
 *  On submit, will check if searchResult(workingDirectories[0]) returns true.
 *  If true, matched items are added to newDirectories.
 *  A new set of cards is generated using the newDirectories list.
 *  If no match is found, shows the orignal set of cards,
 *  and resets the newDirectories list.
 */
const submit = document.querySelector('.search-submit');
submit.addEventListener('click', (e) => {
  e.preventDefault();
  if(searchResult(workingDirectories[0]) === true) {
    gallery.innerHTML = '';
    generateGallery(newDirectories[0]);
    workingDirectories[0] = newDirectories[0];
  } else {
      gallery.innerHTML = '';
      reloadList();
    } 
})
/**
 *  Clicking inside the search box or clicking the 'x' button will reset the gallery
 *  with the original set of cards.
 */
const searchBox = document.querySelector('input[type="search"]'); 
searchBox.addEventListener('click', (e) => {
  gallery.innerHTML = '';
  workingDirectories[0] = previousDirectories[0];
  newDirectories = [];
  generateGallery(workingDirectories[0]);
})
/**
 *  Show the item's modal when a card is clicked.
 */
gallery.addEventListener('click', (e) => {
  // e.target.parentNode.parentNode
  if(e.target.closest('.card')) {
    const cardId = parseInt(e.target.closest('.card').id);
    generateModal(workingDirectories[0][cardId], cardId);
  }
})
/**
 *  Calls the function that closes the modal when the its 'x' buttom is clicked.
 *  Functionality added to switch back and forth between employees
 *  when the detail modal window is open.
 */
body.addEventListener('click', (e) => {
  if(e.target.closest('.modal-close-btn')) {
    closeModal();
  }
  if(document.querySelector('.modal-img')) {
    const modal = document.querySelector('.modal-container');
    const cards = document.querySelectorAll('.card');
    let modalId = parseInt(modal.id);
    const lastCard = workingDirectories[0].length -1;
    if(cards.length > 1) {
      if(e.target.className === 'modal-next btn'){
        if(modalId === lastCard) {
          modalId = 0;
        } else {
          modalId ++;
        }
        closeModal();
        generateModal(workingDirectories[0][modalId], modalId);
      }
      if(e.target.className === 'modal-prev btn'){
        if(modalId === 0){
          modalId = lastCard;
        } else {
          modalId --;
        }
        closeModal();
        generateModal(workingDirectories[0][modalId], modalId);
      } 
    } else removeModalButtonContainer();
  }
})

// ------------------------------------------
//  POST DATA
// ------------------------------------------

