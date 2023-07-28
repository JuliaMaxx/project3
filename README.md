# CS50W Project 3: Mail
## Video Demo: https://www.youtube.com/watch?v=jm6GsuQkwLQ
![Screenshot (17)](https://github.com/JuliaMaxy/project3/assets/121096183/93fedffa-3042-4183-83c6-a68c50dc40cc)
## Description:
Design a single-page-app that functionally resembles Gmail that makes API calls to send and receive emails.
## Specification:
- **`Send Mail`**:
  - When a user submits the email composition form, the 'email' is sent to the chosen user if that user is registered
  - Once the email has been sent, the user’s sent mailbox is loaded.
- **`Mailbox`**:
  -  When a user visits their `Inbox`, `Sent mailbox`, or `Archive`, the appropriate mailbox is loaded.
  -  If the email is unread, it appears with a white background. If the email has been read, it appears with a gray background.
- **`View Email`**:
  - When a user clicks on an email, the user is taken to a view where they see the content of that email.
  - Page shows the email’s sender, recipients, subject, timestamp, and body.
- **`Archive and Unarchive`**:
  - Users can archive and unarchive emails that they have received.
  - Once an email has been archived or unarchived, the user’s inbox is loaded.
- **`Reply`**:
    - Users can reply to an email.
    - When the user clicks the “Reply” button, they are taken to the email composition form.
    - The composition form is pre-filled with the recipient field set to whoever sent the original email.
    - The subject line is pre-filled. If the original email had a subject line of foo, the new subject line is Re: foo.
    - The body of the email is pre-filled with a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original text of the email.
