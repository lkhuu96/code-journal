/* global data */
/* exported data */

var $photoURL = document.querySelector('#photo');
var $img = document.querySelector('img');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoURL.value);
});

var $form = document.querySelector('form');
var $new = document.querySelector('#new');
var $entryForm = document.querySelector("div[data-view='entry-form']");
var $entriesNav = document.querySelector('#entriesNav');
var $entriesList = document.querySelector("div[data-view='entries']");
var $dataView = document.querySelector('ul');
var entry = data.entries;
var editingIndex = null;
var editingId = null;

// click save button and updates dom with current information
document.addEventListener('submit', function (event) {
  event.preventDefault();
  if (entry.length === 0) {
    document.querySelector('p[class="text-center"]').remove();
  }
  if (data.editing === null) {
    entry.unshift(saveEntry());
    entry[0].entryId = data.nextEntryId;
    data.nextEntryId++;
    $dataView.prepend(createNewElement(entry[0]));
  } else {
    entry[editingIndex] = saveEntry();
    entry[editingIndex].entryId = editingId;
    document.querySelectorAll('li')[editingIndex].replaceWith(createNewElement(entry[editingIndex]));
  }
  data.editing = null;
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

// click on entries or new and shows new view
document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return;
  }
  if (event.target === $new) {
    $form.reset();
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    data.editing = null;
    showForm();
  } else if (event.target === $entriesNav) {
    showEntries();
  }
});

// click on edit and fills out form with selected item
$dataView.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  var getLi = event.target.closest('li');
  editingId = parseInt(getLi.getAttribute('data-entry-id'));
  var entries = entry;
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].entryId === editingId) {
      data.editing = entries[i];
      editingIndex = i;
    }
  }
  showForm();
  $title.value = data.editing.title;
  $photoURL.value = data.editing.photoUrl;
  $img.setAttribute('src', $photoURL.value);
  $notes.value = data.editing.notes;
});

function saveEntry() {
  var entryObject = {};
  entryObject.title = $form.elements.title.value;
  entryObject.photoUrl = $form.elements.photo.value;
  entryObject.notes = $form.elements.notes.value;
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

  createImgDiv.appendChild(createImg).setAttribute('src', entry.photoUrl);
  createRowDiv.appendChild(createImgDiv).setAttribute('class', 'column-half b-margin');

  createTitle.textContent = entry.title;
  createNote.textContent = entry.notes;
  createTitleDiv.appendChild(createTitle).setAttribute('class', spacing);
  createIconAnchor.appendChild(createIcon).setAttribute('class', 'fa-solid fa-pen');
  createTitleDiv.appendChild(createIconAnchor).setAttribute('class', 'absolute edit-icon');
  createTitleDiv.appendChild(createIconAnchor).setAttribute('href', '#');

  createTextDiv.appendChild(createTitleDiv).setAttribute('class', 'row relative');
  createTextDiv.appendChild(createNote).setAttribute('class', spacing);
  createRowDiv.appendChild(createTextDiv).setAttribute('class', 'column-half');

  createLi.appendChild(createRowDiv).setAttribute('class', 'row');
  createLi.setAttribute('class', 'b-margin');
  createLi.setAttribute('data-entry-id', entry.entryId);
  return createLi;
}

function addEntriesToPage(event) {
  if (entry.length === 0) {
    var createNote = document.createElement('p');
    createNote.textContent = 'No entries have been recorded.';
    $dataView.appendChild(createNote).setAttribute('class', 'text-center');
  }
  for (var i = 0; i < entry.length; i++) {
    var dataEntry = entry[i];
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
  data.editing = null;
  data.view = 'entries';
}
