# Book Sharing RESTful API DOCUMENT
## Getting Started
---
### Prerequisites
You need git to clone the Book Sharing Backend repository. You can get git from http://git-scm.com/.  
You also must have node.js and its package manager (npm) installed. You can get them from http://nodejs.org/.
### Clone directory from Git
Clone the Book-Sharing-Backend using Git
```
https://github.com/vanhtuan0409/Book-Sharing-Backend.git
cd Book-Sharing-Backend
```
### Install Dependencies
Run this command to install dependencies using node.js tool npm
```
npm install
```
### Running the server
Run this command to start the server
```
sails start
```

## Directory Layout
---
This directory layout is based on SailsJS framework. For more information please visit http://sailsjs.org/documentation/
```
api/              <--- all source file location
   controllers/   <--- controllers location
   models/        <--- app data models location
   policies/      <--- custom security policies implement
   responses/     <--- custom http response
   services/      <--- app custom service such as Array Manipulation, Email sending
config/           <--- sails config files, visit sails document for more detail
```

## RESTful API detail
---
All of the models consists of pre-defined API from sailsJS blueprint which include:
* find
* findOne
* create
* update
* destroy
* populate
* add
* remove

For more details on blueprint api please visit http://sailsjs.org/documentation/reference/blueprint-api  
**Important:** all blueprint api started with `/api` in the URL. For example: the find Book Model will have URL as `/api/book/:id`
### Custom API
### Get authentication information
* Url: `/api/auth`
* Method: `GET`
* Response: `User models`
    * Success:
    ```
    {
        error: false,
        content: 'User Model'
    }
    ```
    * Error:
    ```
    {
        error: true,
        content: 'error message'
    }
    ```
### Login
* Url: `/api/auth`
* Method: `POST`
* Data:
    ```
    {
        token: ... <--- facebook access token
    }
    ```
### Logout
* Url: `/api/auth/logout`
* Method: `GET`
* Response:
    ```
    {
        error: false,
        content: 'Logged out'
    }
    ```
### Borrow book from User
* Url: `api/user/:userId/borrow`
* Method: `POST`
* Data:
    ```
    {
        requestToUser: ...,         <--- toUser id
        bookId: ...,                <--- requested book id
        startDate: ..., (optional)  <--- start date
        returnDate: ..., (optional) <--- return date
        message: ... (optional)     <--- borrow message
    }
    ```
* Response:
    * Success:
    ```
    {
        error: false,
        content: 'Borrow Model'
    }
    ```
    * Error:
    ```
    {
        error: true,
        content: 'error message'
    }
    ```
### Add book to profile
* Url: `api/user/:userId/addBook`,
* Method: `POST`,
* Data:
    ```
    {
        bookname: ...,
        author: ...,
        url: ...,
        description: ...,
        type: ...,
        isBook: true/false  <--- true if add to book list, false if add to recommendation list
    }
    ```
* Response:
    * Success:
    ```
    {
        error: false,
        content: 'User Model'
    }
    ```
    * Error:
    ```
    {
        error: true,
        content: 'error message'
    }
    ```