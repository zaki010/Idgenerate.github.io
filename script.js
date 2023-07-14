document.getElementById('idForm').addEventListener('submit', generateID);

// Load stored IDs on page load
document.addEventListener('DOMContentLoaded', loadStoredIDs);

document.getElementById('nextButton').addEventListener('click', redirectToNextPage);
document.getElementById('clearButton').addEventListener('click', clearStoredIDs);

function generateID(e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var year = document.getElementById('year').value;
  var id = generateRandomID(year);
  saveID(name, id);
  displayID(name, id);
}

function generateRandomID(year) {
  var random = Math.floor(Math.random() * 900000) + 100000;
  var id = year.toString() + random.toString();
  if (id.length > 6) {
    id = id.substr(0, 6);
  } else if (id.length < 6) {
    var zerosToAdd = 6 - id.length;
    for (var i = 0; i < zerosToAdd; i++) {
      id = "0" + id;
    }
  }
  return id;
}

function saveID(name, id) {
  var storedIDs = localStorage.getItem('ids');
  var ids = storedIDs ? JSON.parse(storedIDs) : [];
  var currentDate = new Date().toLocaleDateString();
  ids.push({ name: name, date: currentDate, id: id });
  localStorage.setItem('ids', JSON.stringify(ids));
}

function displayID(name, id) {
  var idTable = document.getElementById('idTable');
  var tbody = idTable.getElementsByTagName('tbody')[0];

  var newRow = document.createElement('tr');
  var serialNoCell = document.createElement('td');
  var nameCell = document.createElement('td');
  var idCell = document.createElement('td');
  var copySymbol = document.createElement('span');

  serialNoCell.textContent = tbody.childElementCount + 1;
  nameCell.textContent = name;
  idCell.textContent = id;

  copySymbol.innerHTML = "&#x2398;";
  copySymbol.className = "copy-symbol";
  copySymbol.addEventListener('click', function() {
    copyToClipboard(id);
  });

  idCell.prepend(copySymbol);

  newRow.appendChild(serialNoCell);
  newRow.appendChild(nameCell);
  newRow.appendChild(idCell);

  tbody.appendChild(newRow);
}

function loadStoredIDs() {
  var storedIDs = localStorage.getItem('ids');
  var ids = storedIDs ? JSON.parse(storedIDs) : [];

  var idTable = document.getElementById('idTable');
  var tbody = idTable.getElementsByTagName('tbody')[0];
  tbody.innerHTML = "";

  ids.forEach(function(item, index) {
    var newRow = document.createElement('tr');
    var serialNoCell = document.createElement('td');
    var nameCell = document.createElement('td');
    var idCell = document.createElement('td');
    var copySymbol = document.createElement('span');

    serialNoCell.textContent = index + 1;
    nameCell.textContent = item.name;
    idCell.textContent = item.id;

    copySymbol.innerHTML = "&#x2398;";
    copySymbol.className = "copy-symbol";
    copySymbol.addEventListener('click', function() {
      copyToClipboard(item.id);
    });

    idCell.prepend(copySymbol);

    newRow.appendChild(serialNoCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(idCell);

    tbody.appendChild(newRow);
  });
}

function copyToClipboard(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed'; // Ensure textarea is always visible
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function redirectToNextPage() {
  window.location.href = "https://zaki010.github.io/AnjumanPayment.github.io/";
}

function clearStoredIDs() {
  localStorage.removeItem('ids');
  var idTable = document.getElementById('idTable');
  var tbody = idTable.getElementsByTagName('tbody')[0];
  tbody.innerHTML = "";
}
