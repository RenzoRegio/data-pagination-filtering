/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function displayPage(list, page) {
  const startIndex = page * 8 - 8;
  const endIndex = page * 8;
  const ul = document.querySelector(".student-list");
  ul.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const currentIndex = list.indexOf(list[i]);
    if (currentIndex >= startIndex && currentIndex <= endIndex) {
      const li = document.createElement("li");
      li.className = "student-item cf";
      //first div
      const studentDetails = document.createElement("div");
      studentDetails.className = "student-details";
      const img = document.createElement("img");
      img.className = "avatar";
      img.src = list[i].picture.large;
      img.alt = "Profile Picture";
      const name = document.createElement("h3");
      name.textContent = `${list[i].name.first} ${list[i].name.last}`;
      const email = document.createElement("span");
      email.className = "email";
      email.textContent = list[i].email;
      studentDetails.appendChild(img);
      studentDetails.appendChild(name);
      studentDetails.appendChild(email);
      // second div
      const joinedDetails = document.createElement("div");
      joinedDetails.className = "joined-details";
      const date = document.createElement("span");
      date.className = "date";
      date.textContent = `Joined ${list[i].registered.date}`;
      joinedDetails.appendChild(date);
      //appending the whole page
      li.appendChild(studentDetails);
      li.insertAdjacentElement("beforeend", joinedDetails);
      ul.appendChild(li);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function pagination(list) {
  pageButtons = Math.ceil(list.length / 9);
  const ul = document.querySelector("ul.link-list");
  ul.innerHTML = "";
  for (let j = 1; j < pageButtons + 1; j++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerHTML = j;
    button.type = "button";
    li.appendChild(button);
    ul.appendChild(li);
  }
  let firstButton = ul.children[0].firstElementChild;
  firstButton.className = "active";
  ul.addEventListener("click", (e) => {
    const liArray = document.querySelectorAll("ul.link-list > li");
    if (e.target.type === "button") {
      for (let i = 0; i < liArray.length; i++) {
        if (liArray[i].firstElementChild.className === "active") {
          liArray[i].firstElementChild.className = "";
          const clicked = e.target;
          clicked.className = "active";
          displayPage(data, clicked.textContent);
        }
      }
    }
  });
}

displayPage(data, 1);
pagination(data);

// Call functions
