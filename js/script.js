/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const header = document.querySelector("header");
const ul = document.querySelector(".student-list");

/**
 * Creates and returns an element while configuring the created element's attributes depending on the arguments provided by the user.
 * @param {string} elementName - Name of the element that the .createElement method will create.
 * @param {string} property - Attribute of the element to configure.
 * @param {string} value - Value set for the property parameter.
 * @param {string} secondProperty - If parameter is set: secondProperty is the second attribute to configure.
 * @param {string} secondValue - If parameter is set: secondValue is the value set for the secondProperty parameter.
 * @param {string} thirdProperty - If parameter is set: thirdProperty is the third attribute to configure.
 * @param {string} thirdValue - If parameter is set: thirdValue is the value set for the thirdProperty parameter.
 */

function createElement(
  elementName,
  property,
  value,
  secondProperty,
  secondValue,
  thirdProperty,
  thirdValue
) {
  element = document.createElement(elementName);
  element[property] = value;
  element[secondProperty] = secondValue;
  element[thirdProperty] = thirdValue;
  return element;
}

/**
 * Appends the child element to a parent element.
 * @param {string} parent - Parent element of the child element.
 * @param {string} child - Child element to be appended to the parent element.
 */

function appendToParent(parent, child) {
  const element = parent.appendChild(child);
  return element;
}

/**
 * Creates the profile card of each student and displays it on the page depending on the list and page parameters.
 * @param {array} list - Array containing the data of each student.
 * @param {number} page - Number value that specifies which index from the array parameter will be shown on the page.
 */

function displayPage(list, page) {
  let startIndex = 0; //Starting index to be displayed on page 1.
  let endIndex = 8; //Ending index to be displayed on page 1.
  if (page == 2) {
    //startIndex is changed depending on the value of the page parameter since having one calculation for startIndex repeats profile cards.
    startIndex = page * 8 - 7;
  } else if (page == 3) {
    startIndex = page * 8 - 6;
  } else if (page == 4) {
    startIndex = page * 8 - 5;
  } else if (page == 5) {
    startIndex = page * 8 - 4;
  }
  if (page > 1) {
    //endIndex for each page parameter that is greater than 1.
    endIndex = page * 9 - 1;
  }
  ul.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const currentIndex = list.indexOf(list[i]);
    if (currentIndex >= startIndex && currentIndex <= endIndex) {
      const li = createElement("li", "className", "student-item cf");

      // First div element
      const studentDetails = createElement(
        "div",
        "className",
        "student-details"
      );
      const img = createElement(
        "img",
        "className",
        "avatar",
        "src",
        list[i].picture.large,
        "alt",
        "Profile Picture"
      );
      const name = createElement(
        "h3",
        "textContent",
        `${list[i].name.first} ${list[i].name.last}`
      );
      const email = createElement(
        "span",
        "className",
        "email",
        "textContent",
        list[i].email
      );
      appendToParent(studentDetails, img);
      appendToParent(studentDetails, name);
      appendToParent(studentDetails, email);

      // Second div element
      const joinedDetails = createElement("div", "className", "joined-details");
      const date = createElement(
        "span",
        "className",
        "date",
        "textContent",
        `Joined ${list[i].registered.date}`
      );
      appendToParent(joinedDetails, date);

      // Appending to parent elements
      appendToParent(li, studentDetails);
      appendToParent(li, joinedDetails);
      appendToParent(ul, li);
    }
  }
}

/**
 * Creates and appends functioning pagination buttons. Once a button is pressed, displayPage() is called and displays the profile cards designated for that certain page.
 * @param {array} list - Array containing the data of each student.
 */

function pagination(list) {
  pageButtons = Math.ceil(list.length / 9);
  const paginationUL = document.querySelector("ul.link-list");
  paginationUL.innerHTML = "";
  for (let j = 1; j < pageButtons + 1; j++) {
    const li = document.createElement("li");
    const button = createElement("button", "innerHTML", j, "type", "button");
    appendToParent(li, button);
    appendToParent(paginationUL, li);
  }
  const firstButton = paginationUL.firstElementChild.firstElementChild;
  firstButton.className = "active";
  paginationUL.addEventListener("click", (e) => {
    const liArray = document.querySelectorAll("ul.link-list > li");
    const clickedButton = e.target;
    if (e.target.type === "button") {
      for (let i = 0; i < liArray.length; i++) {
        const button = liArray[i].firstElementChild;
        if (button.className === "active") {
          button.className = "";
          clickedButton.className = "active";
          displayPage(list, clickedButton.textContent);
        }
      }
    }
  });
}

/**
 * Creates a search bar including events for submitting and keyup - Which calls performSearch() to filter through the array and the searchInput's value.
 */

function searchBar() {
  const searchLabel = createElement(
    "label",
    "htmlFor",
    "search",
    "className",
    "student-search"
  );
  const searchInput = createElement(
    "input",
    "id",
    "search",
    "placeholder",
    "Search by name..."
  );
  const searchButton = createElement("button", "type", "button");
  const searchImage = createElement(
    "img",
    "src",
    "img/icn-search.svg",
    "alt",
    "Search icon"
  );

  appendToParent(searchLabel, searchInput);
  appendToParent(searchButton, searchImage);
  appendToParent(searchLabel, searchButton);
  appendToParent(header, searchLabel);

  searchButton.addEventListener("submit", (e) => {
    e.preventDefault();
    performSearch(searchInput, data);
  });

  searchInput.addEventListener("keyup", () => {
    performSearch(searchInput, data);
  });
}

/**
 * Filters through the array and value parameters which returns and displays the filtered results to the page.
 * @param {string} searchInput - Input element that retrieves the value of what the user types.
 * @param {array} list - Array containing the data of each student.
 */

function performSearch(searchInput, list) {
  const pageNumbers = document.querySelector(".pagination");
  function displayFilteredPage(arr, page) {
    displayPage(arr, page);
    pagination(arr);
    pageNumbers.firstElementChild.className = "link-list";
  }
  let namesArray = [];
  for (let i = 0; i < list.length; i++) {
    const names = list[i];
    const name = `${list[i].name.first.toLowerCase()} ${list[
      i
    ].name.last.toLowerCase()}`;
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue.length !== 0 && name.includes(searchValue)) {
      //Filtering through the array to check if the input's value is inside or part of the name variable.
      namesArray.push(names);
      displayFilteredPage(namesArray, 1);
    } else if (searchValue == "") {
      displayFilteredPage(list, 1);
    } else if (!isNaN(searchValue) || namesArray.length === 0) {
      ul.innerHTML =
        "<div id='js-results'><h2 id='js-h2'> No results. </h2></div>";
      pageNumbers.firstElementChild.className = "hide link-list";
    }
  }
}

searchBar();
displayPage(data, 1);
pagination(data);
