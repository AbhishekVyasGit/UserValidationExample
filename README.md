## UserValidationExample =>
In this project directory, you can run :

### `npm run start`

It runs the server on port 5000 and connect successfully our server to databse.\

### `checking post form`

- We used predefined middleware express-validatior that provides validator and sanitizer functions.

### `Why is validation needed?`

- validation checks guarantees that any kind of malicious request has the chance to be re-checked in an environment 
  you control. 

- validations are used to validate post form fields to ensure that whatever we need is present in the way we want it 
  to be present
  and even though you guys are used to doing frontend validations but still validations must be performed on 
  backend also as frontend code is available inside browser
  and user might modify it to bypass our validations hence backend validation is required.


### `Express-Validator`

- express-validator is a set of express.js middlewares that wraps the extensive collection of validator and
 It allows you to combine them in many ways so that you can validate and sanitize your express requests, and 
 offers tools to determine if the request is valid or not, which data was matched according to your validators.
