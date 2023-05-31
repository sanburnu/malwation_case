# Malwation Case Study

## Summary
This demo includes index, projects and users routes besides register, login and logout authorization routes. Used technologies are MongoDB for database, Nodejs for JavaScript runtime environment, Express.js for backend and for frontend dynamic website design nunjucks templating language is used.


## Error Handling
The user might face error for several reasons but the main reason would be trying to access a page they don't have access to. In that case they are redirected to login page with an alert with an explanation. Other errors may include trying to acccess a page that doesn't exist or the jwt token the user is assigned to expiring, in both cases the user is again, redirected with correct status code and read what is the problem on the page.

## Database
This website is using MongoDB for database and mongoose package for accessing it. MongoDB being a lightweight NoSQL database helped me build a solid database in short amount of time. For projects I stored the everyone's info in that project as an array because I assumed this database is not going to be used for millions of people and accessing the users in the project is faster this way. But if that is the case instead of storing the users in the project, just storing their id and accessing the user with that id would be a better choice.

### Database Validation
For schema validation Joi package is used.  

## Authentication and Authorization
The user have to login to access the projects or the users pages and of course to create, update or delete anything from the database. I used JWT and cookies to authenticate the user.

