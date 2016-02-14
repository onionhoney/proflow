// function httpGetAsync(theUrl, callback)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() { 
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// }

// function authentication() {
// 	var url = "https://sandbox.evernote.com/oauth?oauth_callback=http://www.foo.com&oauth_consumer_key=wybmax&oauth_nonce=3166905818410889691&oauth_signature=T0+xCYjTiyz7GZiElg1uQaHGQ6I=&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1429565574&oauth_version=1.0"
// 	var result = httpGetAsync(url, callback);
// }

function makeNote(noteStore, noteTitle, noteBody, parentNotebook, callback) {
 
  var nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
  nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
  nBody += "<en-note>" + noteBody + "</en-note>";
 
  // Create note object
  var ourNote = new Evernote.Note();
  ourNote.title = noteTitle;
  ourNote.content = nBody;
 
  // parentNotebook is optional; if omitted, default notebook is used
  if (parentNotebook && parentNotebook.guid) {
    ourNote.notebookGuid = parentNotebook.guid;
  }
 
  // Attempt to create note in Evernote account
  noteStore.createNote(ourNote, function(err, note) {
    if (err) {
      // Something was wrong with the note data
      // See EDAMErrorCode enumeration for error code explanation
      // http://dev.evernote.com/documentation/reference/Errors.html#Enum_EDAMErrorCode
      console.log(err);
    } else {
      callback(note);
    }
  });
}
