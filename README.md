# crispy-meme (Leaderboard Management Application)

## Built with React, Redux, Express, Mongo(ose), Node

### Description:

This is a full stack Leaderboard Management application with it's own fully functional RESTful API that allows users to create their own leaderboards for their games/competitions.

Users may create a leaderboard (and save the private key) to fully interact with their leaderboard via the online web application. With their private key, owners of leaderboards may manage their leaderboard by adding, delete and modify score submissions. Non-owners of the leaderboard may be given a public key which can only fetch leaderboard information (no adding,removing or modifying scores).

Ideally game developers do not share their private key in any way (ignore in source control if open source), allowing for safe use of their private key within their game to fully handle any interactions with the API. For non-gaming competitions the owner shall be able to interact with the web application to add, modify and delete scores.

### Endpoints

#### Leaderboards
* POST '/lb' | Body or query parameters necessary: gameName, ownerName, email. Returns newly generated leaderboard.
* GET '/lb/:key' | Can use query parameter 'limit' to fetch specified number of users as JSON. 'order' query parameter is for score ordering and is default 'des' but 'asc' can be used. Finally, the query parameter 'key' is necessary (private or public) for fetching. Returns users within specified leaderboard.
* GET '/lb/:key/info' | The private key is required as query parameter 'key'. Returns leaderboard information object.
* PUT '/:key' | Clears leaderboard for specified private key.
* DELETE '/:key' | Removes leaderboard for specified key.

#### Users
* GET '/lb/:key/user/:userID' | Fetches single user using given key and userID.
* DELETE '/lb/:key/user/:userID' | Deletes single user using given key and userID.
* POST/PUT '/lb/:key/user' OR '/lb/user' | Body requires private key as 'key', 'username' and 'score' to save user's score to database.
* POST '/lb/:key/:user/:score | Uses given URL parameters to save user's score to database. Same result as previous endpoint.

### To run locally:

1.  Clone or download repo
2.  Install dependencies in root directory and in client folder
3.  Run local mongo server
4.  'npm run dev' while in root directory

### To do:

- More endpoints such as key regeneration, key retrieval via email
