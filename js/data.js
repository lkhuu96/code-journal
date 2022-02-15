/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('code-journal-local-storage');
if (previousEntriesJSON !== null) {
  data.entries = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function (events) {
  var entryArrayJSON = JSON.stringify(data.entries);
  localStorage.setItem('code-journal-local-storage', entryArrayJSON);
});
