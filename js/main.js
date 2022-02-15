/* global data */
/* exported data */

var $photoURL = document.querySelector('#photo');
var $img = document.querySelector('img');
$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoURL.value);
});

var $form = document.querySelector('form');
document.addEventListener('submit', function (event) {
  event.preventDefault();
  data.entries.unshift(saveEntry());
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

var $dataView = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', addEntriesToPage);

var $anchorEntryForm = document.querySelector("a[href='#entry-form']");
var $entryForm = document.querySelector("div[data-view='entry-form']");
var $entries = document.querySelector('#entries');
var $save = document.querySelector('#save');
document.addEventListener('click', function (event) {
  if (event.target === $anchorEntryForm) {
    $entryForm.classList.remove('hidden');
    $entries.classList.add('hidden');
  } else if (event.target === $save) {
    $entryForm.classList.add('hidden');
    $entries.classList.remove('hidden');
  }
});

function saveEntry() {
  var entryObject = {};
  entryObject.title = $form.elements.title.value;
  entryObject.photoUrl = $form.elements.photo.value;
  entryObject.notes = $form.elements.notes.value;
  entryObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  return entryObject;
}

function createNewElement(entry) {
  var spacing = 'b-margin no-top-margin';
  var createLi = document.createElement('li');
  var createRowDiv = document.createElement('div');
  var createImgDiv = document.createElement('div');
  var createImg = document.createElement('img');
  var createTextDiv = document.createElement('div');
  var createTitle = document.createElement('h2');
  var createNote = document.createElement('p');

  var imgSrc = entry.photoUrl;
  createImgDiv.appendChild(createImg).setAttribute('src', imgSrc);
  createRowDiv.appendChild(createImgDiv).setAttribute('class', 'column-half b-margin');

  var title = entry.title;
  createTitle.textContent = title;
  var note = entry.notes;
  createNote.textContent = note;
  createTextDiv.appendChild(createTitle).setAttribute('class', spacing);
  createTextDiv.appendChild(createNote).setAttribute('class', spacing);
  createRowDiv.appendChild(createTextDiv).setAttribute('class', 'column-half');

  createLi.appendChild(createRowDiv).setAttribute('class', 'row');
  createLi.setAttribute('class', 'b-margin');

  return createLi;
}

function addEntriesToPage(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var dataEntry = data.entries[i];
    $dataView.appendChild(createNewElement(dataEntry));
  }
}
