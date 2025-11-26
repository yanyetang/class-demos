const wrtieMTGDataTOWebPage = (magicCards) => {
  // get the html table from the dom
  let targetTableElement = document.querySelector("table");

  // add rows to the tbody for each card
  magicCards.forEach((mageicCard) => {
    // add a new row for each card
    let newRow = document.createElement("tr");

    // add a new td for card ID and add to row
    let idCell = document.createElement("td");
    idCell.innerText = mageicCard.id;
    newRow.appendChild(idCell);

    // add a new td for card name and add to row
    let nameCell = document.createElement("td");
    nameCell.innerText = mageicCard.name;
    newRow.appendChild(nameCell);

    // add a new td for card description and add to row
    let descCell = document.createElement("td");
    descCell.innerText = mageicCard.text;
    newRow.appendchild(descCell);

    // add the row to the table
    targetTableElement.tbody.appendchild(newRow);
  });
};

const loadPageofMTHCards = async () => {
  // see if a page number has been stored in local storage, and if so retreive if
  // otherwise , set page to 1 for starting page
  let pageNumber = 1;
  let previousPage = localStorage.getItem("page");
  if (previousPage != undefined) {
    pageNumber = parseInt(previousPage) + 1; // add one to previous current page
  }

  try {
    const ressonse = await fetch(
      `https://api.magicthegathering.io/v1/cards?page=${pageNumber}`
    );
    const magicJSON = await ressonse.json();
    console.log(magicJSON);

    // store the page number back in localStorage
    localStorage.setItem("page", pageNumber);

    wrtieMTGDataTOWebPage(magicJSON.cards);
  } catch (error) {}
};

console.log("this happends first ");

// add an event listener for my button
document.querySelector("button").addEventListener("click", () => {
  // hopefuuly wen we call this function we will get new page of data
  loadPageofMTHCards();
});
