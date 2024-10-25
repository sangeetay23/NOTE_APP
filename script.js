const saveNote = document.querySelector('.save-note');
const myTitle = document.querySelector('#my-title');
const myText = document.querySelector('#my-text');
const noteList = document.querySelector('.notes');

let notes = JSON.parse(localStorage.getItem('notes')) || [];


window.addEventListener('load', () => {
  showNotes();
});


saveNote.addEventListener('click', () => {
  const currentDate = new Date();
  const note = {
    title: myTitle.value || 'Untitled',
    content: myText.value,
    timestamp: currentDate.toLocaleString(),
  };

  if (!note.content) {
    alert("Note content cannot be empty!");
    return;
  }

  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
  
  myTitle.value = '';
  myText.value = '';
  
  showNotes();
});

function showNotes() {
  noteList.innerHTML = '';
  notes.forEach((note, index) => {
    let label = document.createElement('div');
    let title = document.createElement('h3');
    let content = document.createElement('p');
    let timeStamp = document.createElement('time');
    let actions = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');

    title.textContent = note.title;
    content.textContent = note.content;
    timeStamp.textContent = `Added on: ${note.timestamp}`;
    deleteBtn.textContent = 'Delete';
    editBtn.textContent = 'Edit';

    label.classList.add('note-container');
    actions.classList.add('actions');
    deleteBtn.classList.add('delete-btn');
    editBtn.classList.add('edit-btn');

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    label.appendChild(title);
    label.appendChild(content);
    label.appendChild(timeStamp);
    label.appendChild(actions);
    noteList.appendChild(label);


    deleteBtn.addEventListener('click', () => {
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      showNotes();
    });

    editBtn.addEventListener('click', () => {
      myTitle.value = note.title;
      myText.value = note.content;
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      myText.focus();
      showNotes();
    });
  });
}

