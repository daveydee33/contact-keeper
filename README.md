# contact-keeper

Contact Keeper app based on Brad Traversy's course React Front To Back 2019

## Get Started
- copy `.env.example` to `.env`, and set the values as needed
- If problem connecting to MongoDB -- probably need to whitelist IP again -- https://cloud.mongodb.com/v2/5d74a6c8d5ec13d54791e858#security/network/whitelist

## Notes
- Brad uses `config` package allows us to create a `config/default.json` file.  Anything we put here will be available in all our app. https://github.com/lorenwest/node-config -- but then Brad commits this to GitHub :/
- I'm using `dotenv` to put the MongoDB user/password into `.env` file and not publish to GH.  Not sure why Brad shows his followers to publish things like passwords and secret keys.

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
  - ** but we should probably replace `config` with `dotenv` instead.
- Initial `server.js` and test access to it with curl or Postman
- Setup our backend routes and test them with `curl` or Postman - eg:
  - GET localhost:5000
  - PUT localhost:5000/api/contacts/1
```
curl localhost:5000
curl localhost:5000/api/contacts
curl localhost:5000/api/contacts/1 -X PUT
```
- uninstall `config` and install `dotenv`.  set the DB user/pass in `.env` and test DB connection to MongoDB.
- Add `User` mongoose model.
- Add validation for name, email, password using `express-validator`.  I'm using v6 so I had to make some changes from Brad's using v5.  