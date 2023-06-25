document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Send email
  document.querySelector('#compose-form').addEventListener('submit', (event) => {
    event.preventDefault();
    send_email();
  });
    
  // By default, load the inbox
  load_mailbox('inbox');
});

function send_email(){
  // get all the information needed from a form
  const body = document.querySelector('#compose-body').value;
  const subject = document.querySelector('#compose-subject').value;
  const recepients = document.querySelector('#compose-recipients').value;

  // POST the email
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recepients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
    // Print the result in case of any errors
    console.log(result);
  });
  // Redirect the user to their sent mailbox
  load_mailbox('sent');
}

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // get all the emails in a mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // loop through all the emails and for each of them create a new box
      emails.forEach((email) => {

        // set the background to white if email is unread otherwise set it to gray
        let background = "";
        email.read ? background = 'rgb(209, 209, 209)': background = 'white';

        // generate html to display each email
        document.querySelector('#emails-view').innerHTML +=
        `<hr>
        <div class="cont" data-id="${email.id}" style="background-color:${background};">
            <div>
              <div>${email.sender}</div>
              <div>${email.subject}</div>
            </div>
            <div>${email.timestamp}</div>
        </div>`
      });
      document.querySelectorAll(".cont").forEach((email) => {
        email.addEventListener("click", () => {
          console.log(email.dataset.id);

          // once clicked on, the email should be marked as read
          fetch(`/emails/${email.dataset.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                read: true
            })
          });

          // get the email by id
          fetch(`/emails/${email.dataset.id}`)
          .then(response => response.json())
          .then(email => {
              // Print email
              console.log(email);

              // ... do something else with email ...
          });
        });
      });
  });
}