/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const header = document.querySelector("header");
const ul = document.querySelector(".student-list");

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
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

function appendToParent(parent, child) {
  const element = parent.appendChild(child);
  return element;
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function displayPage(list, page) {
  const startIndex = page * 8 - 8;
  const endIndex = page * 8;
  ul.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const currentIndex = list.indexOf(list[i]);
    if (currentIndex >= startIndex && currentIndex <= endIndex) {
      const li = createElement("li", "className", "student-item cf");
      //first div
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

      // second div
      const joinedDetails = createElement("div", "className", "joined-details");
      const date = createElement(
        "span",
        "className",
        "date",
        "textContent",
        `Joined ${list[i].registered.date}`
      );
      appendToParent(joinedDetails, date);

      //appending the whole page
      appendToParent(li, studentDetails);
      appendToParent(li, joinedDetails);
      appendToParent(ul, li);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function performSearch(searchInput, list) {
  let namesArray = [];
  for (let i = 0; i < list.length; i++) {
    const names = list[i];
    const name = list[i].name.first.toLowerCase();
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue.length !== 0 && name.includes(searchValue)) {
      namesArray.push(names);
      const page = Math.round(namesArray.length / 9);
      displayPage(namesArray, page);
      pagination(namesArray);
    } else if (searchInput.value === "") {
      displayPage(list, 1);
    }
  }
}

searchBar();
displayPage(data, 1);
pagination(data);
