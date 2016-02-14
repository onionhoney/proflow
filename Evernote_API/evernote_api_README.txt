### Evernote Developer's API
NoteStore URL:
https://sandbox.evernote.com/shard/s1/notestore


### Sample function of creating a text-only note in Evernote
https://dev.evernote.com/doc/articles/creating_notes.php
Code in "create_node.js"

### Basic idea of storing and retrieving notes in Evernote
When storing a note, keep track of its Node.guid;
every time opening the note-board, retrieving notes of all tracked Note.guid.

### Function: NoteStore.createNote
https://dev.evernote.com/doc/reference/NoteStore.html#Fn_NoteStore_createNote

### Function: NoteStore.getNote
https://dev.evernote.com/doc/reference/NoteStore.html#Fn_NoteStore_getNote

### Struct: Note
https://dev.evernote.com/doc/reference/Types.html#Struct_Note

### Other Resources
Evernote SDK for Javascript: 
https://github.com/evernote/evernote-sdk-js

OAuth (generating Temporary Token for authentication rather than Developer Token):
https://dev.evernote.com/doc/articles/authentication.php#devtoken