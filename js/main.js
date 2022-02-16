/* global data */
/* exported data */

var $photoURL = document.querySelector('#photo');
var $img = document.querySelector('img');

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoURL.value);
});

var $form = document.querySelector('form');
var $new = document.querySelector('#new');
var $entryForm = document.querySelector("div[data-view='entry-form']");
var $entriesNav = document.querySelector('#entriesNav');
var $entriesList = document.querySelector("div[data-view='entries']");
var $dataView = document.querySelector('ul');

document.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.entries.length === 0) {
    document.querySelector('p[class="text-center"]').remove();
  }
  data.entries.unshift(saveEntry());
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $dataView.prepend(createNewElement(data.entries[0]));
  showEntries();
  $form.reset();
});

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.view === 'entry-form') {
    showForm();
  } else if (data.view === 'entries') {
    showEntries();
  }
  addEntriesToPage();
});

document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return;
  }
  if (event.target === $new) {
    showForm();
  } else if (event.target === $entriesNav) {
    showEntries();
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
  var createTitleDiv = document.createElement('div');
  var createIconAnchor = document.createElement('a');
  var createIcon = document.createElement('i');

  var createTitle = document.createElement('h2');
  var createNote = document.createElement('p');
  // creates image section
  createImgDiv.appendChild(createImg).setAttribute('src', entry.photoUrl);
  createRowDiv.appendChild(createImgDiv).setAttribute('class', 'column-half b-margin');

  // creates title section
  createTitle.textContent = entry.title;
  createNote.textContent = entry.notes;
  createTitleDiv.appendChild(createTitle).setAttribute('class', spacing);
  createIconAnchor.appendChild(createIcon).setAttribute('class', 'fa fa-solid fa-pen');
  createTitleDiv.appendChild(createIconAnchor).setAttribute('class', 'absolute edit-icon');
  createTitleDiv.appendChild(createIconAnchor).setAttribute('href', '#');

  // creates description paragraph
  createTextDiv.appendChild(createTitleDiv).setAttribute('class', 'row relative');
  createTextDiv.appendChild(createNote).setAttribute('class', spacing);
  createRowDiv.appendChild(createTextDiv).setAttribute('class', 'column-half');

  createLi.appendChild(createRowDiv).setAttribute('class', 'row');
  createLi.setAttribute('class', 'b-margin');

  return createLi;
}

function addEntriesToPage(event) {
  if (data.entries.length === 0) {
    var createNote = document.createElement('p');
    createNote.textContent = 'No entries have been recorded.';
    $dataView.appendChild(createNote).setAttribute('class', 'text-center');
  }
  for (var i = 0; i < data.entries.length; i++) {
    var dataEntry = data.entries[i];
    $dataView.appendChild(createNewElement(dataEntry));
  }
}

function showForm() {
  $entryForm.classList.remove('hidden');
  $entriesList.classList.add('hidden');
  data.view = 'entry-form';
}

function showEntries() {
  $entryForm.classList.add('hidden');
  $entriesList.classList.remove('hidden');
  data.view = 'entries';
}
