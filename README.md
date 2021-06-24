# Facial Recognition App

This is an app, that takes an image, detects the face, and displays a box around
the face. The

## Technology Used

The app uses React on the front-end. PostgreSQL and NodeJS on the backend. To be
able to detect the faces in an image the Clarifai API is being used.

### Features

The app has a login feature that allows users to login securely. The passwords
are hashed using bcrypt. The database has two tables, users and login. So they
are stored in separate tables in the database. Once logged in you provide an
image link, hit detect and the API does it's magic. A box should appear on the
face of the image. There is also a feature that keeps track of how many images
have been detected for each user.
