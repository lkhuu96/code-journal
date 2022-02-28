/* global data */
/* exported data */

var $photoURL = document.querySelector('#photo');
var $img = document.querySelector('img');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('form');
var $new = document.querySelector('#new');
var $entryForm = document.querySelector("div[data-view='entry-form']");
var $entriesNav = document.querySelector('#entriesNav');
var $entriesList = document.querySelector("div[data-view='entries']");
var $dataView = document.querySelector('ul');
var $deleteButton = document.querySelector('#delete-button');
var $confirmPopup = document.querySelector('#confirm-popup');
var $confirmDelete = document.querySelector('#confirm-delete');
var $confirmCancel = document.querySelector('#cancel');
var $formTitle = document.querySelector('h1.column-full');
var $noEntries = document.querySelector('p[class="text-center"]');
var $body = document.querySelector('body');
var entry = data.entries;
var editingIndex = null;
var editingId = null;

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoURL.value);
});

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.view === 'entry-form') {
    showForm();
  } else if (data.view === 'entries') {
    showEntries();
  }
  for (var i = 0; i < entry.length; i++) {
    $dataView.appendChild(createNewElement(entry[i]));
  }
});

document.addEventListener('submit', function (event) {
  event.preventDefault();
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
});

document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return;
  }
  if (event.target === $new) {
    $formTitle.textContent = 'New Entry';
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    data.editing = null;
    $deleteButton.classList.add('hidden');
    showForm();
  } else if (event.target === $entriesNav) {
    showEntries();
  }
});

$dataView.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  var getLi = event.target.closest('li');
  editingId = parseInt(getLi.getAttribute('data-entry-id'));
  for (var i = 0; i < entry.length; i++) {
    if (entry[i].entryId === editingId) {
      data.editing = entry[i];
      editingIndex = i;
    }
  }
  showForm();
  $formTitle.textContent = 'Edit Entry';
  $title.value = data.editing.title;
  $photoURL.value = data.editing.photoUrl;
  $img.setAttribute('src', $photoURL.value);
  $notes.value = data.editing.notes;
  $deleteButton.classList.remove('hidden');
});

$deleteButton.addEventListener('click', function (event) {
  event.preventDefault();
  showPopup();
});

$confirmCancel.addEventListener('click', function (event) {
  event.preventDefault();
  hidePopup();
});

$confirmDelete.addEventListener('click', function (event) {
  event.preventDefault();
  hidePopup();
  data.editing = null;
  document.querySelectorAll('li')[editingIndex].remove();
  data.entries.splice(editingIndex, 1);
  showEntries();
});

function saveEntry() {
  var entryObject = {};
  entryObject.title = $form.elements.title.value;
  entryObject.photoUrl = $form.elements.photo.value;
  entryObject.notes = $form.elements.notes.value;
  return entryObject;
}

function createNewElement(entry) {
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
  createTitleDiv.appendChild(createTitle).setAttribute('class', 'b-margin no-top-margin');
  createIconAnchor.appendChild(createIcon).setAttribute('class', 'fa-solid fa-pen');
  createTitleDiv.appendChild(createIconAnchor).setAttribute('class', 'edit-icon');
  createTitleDiv.appendChild(createIconAnchor).setAttribute('href', '#');

  createTextDiv.appendChild(createTitleDiv).setAttribute('class', 'row space-between');
  createTextDiv.appendChild(createNote).setAttribute('class', 'no-top-margin');
  createRowDiv.appendChild(createTextDiv).setAttribute('class', 'column-half');

  createLi.appendChild(createRowDiv).setAttribute('class', 'row');
  createLi.setAttribute('class', 'b-margin');
  createLi.setAttribute('data-entry-id', entry.entryId);
  return createLi;
}

function showForm() {
  $form.reset();
  $entryForm.classList.remove('hidden');
  $entriesList.classList.add('hidden');
  data.view = 'entry-form';
}

function showEntries() {
  if (entry.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
  $entryForm.classList.add('hidden');
  $entriesList.classList.remove('hidden');
  data.editing = null;
  data.view = 'entries';
}

function showPopup() {
  $confirmPopup.classList.remove('hidden');
  $body.classList.add('no-scroll');
}

function hidePopup() {
  $confirmPopup.classList.add('hidden');
  $body.classList.remove('no-scroll');
}
