# Node-Microservice-
A microservice in Nodejs, with major functionalities; Authentication and Image Thumbnail Generation

Here we have 2 servers to cross check Jsonwebtoken security,if a valid token authenticate user on other server as both the servers shares common 
access token.(Secret key)


A simple stateless microservice in Nodejs, with two major functionalities;

- Authentication
- Image Thumbnail Generation.

Start up app:
-npm start(This will start server.js file)
-npm run devStart(This will start app.js file)which consists all user functionalites such as login,logout.

Special functionality added:
-DELETE token-Authenticated user can delete a token which further cannot be used to login


## Poject setup;

- Install all dependencies with “npm install”,
- Start the server with “npm start”,
- Run the test suite with “npm test”

# Allowed HTTPs requests:

- POST : To create thumbnail and json patching.
- GET : To get the Authentication token.

# Description Of Usual Server Responses:

- 200 OK - the request was successful (some API calls may return 201 instead).
- 401 Unauthorized - authentication failed or user doesn't have permissions for requested operation.
- 404 Not Found - resource was not found.

# Endpoints

##### /token

This is a POST request the passes the username  and on success it returns a **json web token (jwt)** that grants permissions for other requested endpoints or which can be used to validate future requests.
-Pass the username in the body as JSON and token for specified user will be generated.

##### /image (Protected Endpoints)

This is a post request for the image url : for a public image url.
this requires the user to be authenticated with the jwt [ you can pass this as an Authorization header ].
**Post body should be like this**

```javascript
    {
        "url":"http://xample.com/wp-content/uploads/2018/05/icon.png"
    }
```


##### /login
This is a post request which on success returns users corresponding to access token.
-Pass authorization to the header with corresponding value 'Bearer token"




