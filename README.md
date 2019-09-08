# contact-keeper

Contact Keeper app based on Brad Traversy's course React Front To Back 2019

## Notes

## Questions

## Outline
- Two different `package.json` files for client and server
- In dev - we'll use `concurrently` to run client and server at same time

## Log
- `npm init -y`
- edit `package.json` to set main file as `server.js`.  Why not index.js?
  - add scripts to our package.json
    - `start`: node server.js
    - `server`: nodemon server.js
- install dependencies and devDependencies
  - `npm install express bcryptjs jsonwebtoken config express-validator mongoose`
  - `npm install -D nodemon concurrently`
- Initial `server.js` and test access to it with curl or Postman
- Setup our backend routes and test them with `curl` or Postman - eg:
  - GET localhost:5000
  - PUT localhost:5000/api/contacts/1
```
curl localhost:5000
curl localhost:5000/api/contacts
curl localhost:5000/api/contacts/1 -X PUT
```
