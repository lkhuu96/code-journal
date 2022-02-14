/* global data */
/* exported data */

var entryArray = [];
var nextEntryId = 0;
var $photoURL = document.querySelector('#photo');
var $img = document.querySelector('img');
$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoURL.value);
});

var $form = document.querySelector('form');
document.addEventListener('submit', function (event) {
  event.preventDefault();
  saveEntry();
  nextEntryId++;
  $form.reset();
});

function saveEntry() {
  var entryObject = {};
  entryObject.title = $form.elements.title.value;
  entryObject.photoUrl = $form.elements.photo.value;
  entryObject.notes = $form.elements.notes.value;
  entryObject.nextEntryId = nextEntryId;
  entryArray.unshift(entryObject);
}
