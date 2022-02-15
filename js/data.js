/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('code-journal-local-storage');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function (events) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', dataJSON);
});
