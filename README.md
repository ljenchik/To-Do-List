# To-Do-List

# Live at <a src="https://vast-pink-kangaroo-cuff.cyclic.app"> https://vast-pink-kangaroo-cuff.cyclic.app </a>

## Description

To-Do-List application allows users to create, organize, and manage their tasks and activities in a simple and efficient way. 
The application has a user-friendly interface that enables users to easily add new tasks, delete completed ones and add customised to do lists.

## Technologies used 

Node.js, Express, body-parser, MongoDB, mongoose, ejs, Docker, Cyclic



## Required software

- Docker
- Node.js

## To run the application

From command line
 
```bash
 git clone https://github.com/ljenchik/To-Do-List.git
 docker run -d -p 27017:27017 --name test-mongo mongo:latest
 npm install
 nodemon app.js
```

## Usage

- The default list allows a user to add tasks under a current date
- Clicking on the checkbox enables a user to delete a task
- In order to create a custom list, such as "Shopping," a user must add the corresponding name to the URL localhost:3000/Shopping


## Acnowledgements

This project is based on the guidance and steps provided by Angela Yu's Udemy <a href="https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125215#questions/18744410"> 
"The Complete 2023 Web Development Bootcamp"</a>. 



<img src="https://github.com/ljenchik/To-Do-List/assets/84686704/97c6945e-22fc-4a41-8dee-9fc06dd37ac5" width="300px">
<img src="https://github.com/ljenchik/To-Do-List/assets/84686704/c483abfc-b506-4af1-b82c-e583bb1acab2" width="300px">
