This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

##Project overview
Readaable app displays a set of posts created under various categories. It has got features like create/edit/delete a post, vote for the post, comment on the post. For each comment, we have edit delete and vote functionalities.

Project Setup
1) Download the project from github.
2) It has got two projects, api-server which is provided by Udacity and front-end was created to implement the project requirements.
3) Go to the front-end folder and run npm install.
This will install all the necessary modules to run the project.
4)Run npm start to run the project in console(Start the api server as well)

Folder Structure:

src/actions
-Contains separate action files for comment post and category realted actions.

src/components
-Contains all the components relate to the Project

src/reducers
-Contains separate reducer files for comment, post and category.

src/utils
-Contains separate files for post, comment and category related api functionalities.

configureStore.js
-File containing the store configuration. Store is created using a combined reducer and thunk middleware.
