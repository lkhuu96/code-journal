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

  $form.reset();
});
