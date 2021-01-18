// Catching Buttons
const addButton = document.querySelector("#add");
const resetButton = document.querySelector("#reset");

const editButton = document.querySelectorAll(".edit");
const deletButton = document.querySelectorAll(".delet");
const updateButton = document.querySelectorAll(".update");

const downloadButton = document.querySelector("#download");
// Catching inputs
const clientTitle = document.querySelector("#title");
const clientValue = document.querySelector("#value");
const clientColor = document.querySelector("#color");
// Catching data holder
const dataList = document.querySelector("#data-list");
//Catchig display bars
const chart = document.querySelector("#chart");
const label = document.querySelector("#data-label");

// list counter
let itemNumber = 0;

// REseting
resetButton.addEventListener("click", () => {
  dataList.innerHTML = "";
  upadteChart();
  chart.innerHTML = "";
});

//click event on Add Button
addButton.addEventListener("click", manupulatingData);

function manupulatingData() {
  itemNumber++; //Adding a list item
  const title = clientTitle.value;
  const value = clientValue.value;
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // Creating elements
  // Item Div
  const dataItemDiv = document.createElement("div");
  // Values div
  const itemValuesDiv = document.createElement("div");
  const itemTitle = document.createElement("div");
  const itemValue = document.createElement("div");
  const itemColor = document.createElement("div");
  // Buttons div
  const itemButtonDiv = document.createElement("div");
  const itemEditButton = document.createElement("button");
  const itemDeletButton = document.createElement("button");
  //   Adding ON Click event in buttons in html
  itemEditButton.onclick = editItem;
  itemDeletButton.onclick = deleteItem;

  // adding class in Item values
  dataItemDiv.className = `data-item item${itemNumber}`;

  itemValuesDiv.className = `item-values`;
  itemTitle.className = `title`;
  itemValue.className = `value`;
  itemColor.className = `color`;

  // adding classed in Item buttons
  itemButtonDiv.className = `item-buttons`;

  itemEditButton.className = `edit`;
  itemDeletButton.className = `delet`;

  //pushing value in title value color edit and delet buttons
  itemTitle.innerText = title;
  itemValue.innerText = value;
  itemColor.innerText = `#${randomColor}`;
  itemEditButton.innerText = "EDIT";
  itemDeletButton.innerText = `DELETE`;
  itemColor.style.backgroundColor = `#${randomColor}`;
  // Pushing title value and color in the item values div
  itemValuesDiv.appendChild(itemTitle);
  itemValuesDiv.appendChild(itemValue);
  itemValuesDiv.appendChild(itemColor);

  // Pushing edit and delet buttons in the items buttons div
  itemButtonDiv.appendChild(itemEditButton);
  itemButtonDiv.appendChild(itemDeletButton);

  // Pushing item values and Button divs in the Data Item div
  dataItemDiv.appendChild(itemValuesDiv);
  dataItemDiv.appendChild(itemButtonDiv);

  // Pushing data item div in the data list
  dataList.appendChild(dataItemDiv);

  // upadating chart
  upadteChart();
}

// Edit Item
function editItem(e) {
  // creating update button
  const updateButton = document.createElement("button");
  updateButton.id = "update";
  updateButton.innerText = " UPDATE";
  updateButton.onclick = upadte;

  //  creating input for updates
  const titleUpdate = document.createElement("input");
  titleUpdate.type = "text";
  titleUpdate.className = "title";
  const valueUpdate = document.createElement("input");
  valueUpdate.type = "text";
  valueUpdate.className = "value";
  const colorUpdate = document.createElement("input");
  colorUpdate.type = "color";
  colorUpdate.className = "color";

  //  pushing update inputs in the item value div
  const eventGrandNode = e.target.parentNode.parentNode;
  eventGrandNode.querySelector(".item-values").innerHTML = "";
  eventGrandNode.querySelector(".item-values").appendChild(titleUpdate);
  eventGrandNode.querySelector(".item-values").appendChild(valueUpdate);
  eventGrandNode.querySelector(".item-values").appendChild(colorUpdate);
  //  pushing update button

  eventGrandNode.querySelector(".item-buttons").innerHTML = "";
  eventGrandNode.querySelector(".item-buttons").appendChild(updateButton);
}
// delet Item
function deleteItem(e) {
  dataList.removeChild(e.target.parentNode.parentNode);
  upadteChart();
}

// update
function upadte(e) {
  const updateButtonParent = e.target.parentNode;

  const title = updateButtonParent.previousSibling.querySelector(".title")
    .value;
  const value = updateButtonParent.previousSibling.querySelector(".value")
    .value;
  const color = updateButtonParent.previousSibling.querySelector(".color")
    .value;

  // Creating elements
  // Item Div
  // Values div
  const itemTitle = document.createElement("div");
  const itemValue = document.createElement("div");
  const itemColor = document.createElement("div");
  // Buttons div
  const itemEditButton = document.createElement("button");
  const itemDeletButton = document.createElement("button");
  //   Adding ON Click event in buttons in html
  itemEditButton.onclick = editItem;
  itemDeletButton.onclick = deleteItem;

  // adding class in Item values
  itemTitle.className = `title`;
  itemValue.className = `value`;
  itemColor.className = `color`;

  // adding classed in Item buttons
  itemEditButton.className = `edit`;
  itemDeletButton.className = `delet`;

  //pushing value in title value color edit and delet buttons
  itemTitle.innerText = title;
  itemValue.innerText = value;
  itemColor.innerText = color;
  itemEditButton.innerText = "EDIT";
  itemDeletButton.innerText = `DELETE`;
  itemColor.style.backgroundColor = color;
  // Pushing title value and color in the item values div
  updateButtonParent.previousSibling.innerHTML = "";
  updateButtonParent.previousSibling.appendChild(itemTitle);
  updateButtonParent.previousSibling.appendChild(itemValue);
  updateButtonParent.previousSibling.appendChild(itemColor);

  // Pushing edit and delet buttons in the items buttons div
  updateButtonParent.innerHTML = "";
  console.log(updateButton);
  console.log(updateButton.parentNode);
  updateButtonParent.appendChild(itemEditButton);
  updateButtonParent.appendChild(itemDeletButton);

  upadteChart();
}

function upadteChart() {
  chart.innerHTML = "";
  label.innerHTML = "";

  const title = document.querySelectorAll(".title");
  const value = document.querySelectorAll(".value");
  const color = document.querySelectorAll(".color");

  // creating title value and color holder array
  const titleArr = [];
  const valueArr = [];
  const colorArr = [];

  title.forEach((e) => {
    titleArr.push(e.innerText);
  });
  value.forEach((e) => {
    valueArr.push(e.innerText);
  });
  color.forEach((e) => {
    colorArr.push(e.innerText);
  });

  //normalizing the values with in the range 0 to 100 (as percent)
  // the largest value considered as 100%
  //oters values convert under % corrosponding to the large value

  const largeValue = Math.max(...valueArr);
  const valueInPercentArr = valueArr.map((x) => (x * 100) / largeValue); //Mathematical formula

  //putting the percent bar inside the screen
  for (let i = 0; i < valueArr.length; i++) {
    // as values are kept inside the array
    const barDiv = document.createElement("div");
    barDiv.style.height = `${valueInPercentArr[i]}%`;
    barDiv.style.backgroundColor = colorArr[i];
    chart.appendChild(barDiv);

    // Creating label item
    const labelItem = document.createElement("div");
    labelItem.className = 'label-item';
    const labelItemTitle = document.createElement("h5");
    const labelItemColor = document.createElement("div");
    // pushing value in the label

    labelItemTitle.innerText = titleArr[i];
    labelItemColor.style.backgroundColor = colorArr[i];
    labelItem.appendChild(labelItemTitle);
    labelItem.appendChild(labelItemColor);
    label.appendChild(labelItem);
  }
}
