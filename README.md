# crispy-meme (Leaderboard Management Application)
## Built with React, Redux, Express, Mongo(ose), Node

## Status: In Progress

### Description:

This is a full stack Leaderboard Management application with it's own fully functional RESTful API that allows users to create their own leaderboards for their games/competitions. 

Users may create a leaderboard (and save the private key) to fully interact with their leaderboard via HTTP requests or via the online web application. With their private key, owners of leaderboards may manage their leaderboard by adding, delete and modify score submissions. Non-owners of the leaderboard may be given a public key which can only fetch leaderboard information (no adding,removing or modifying scores).

Ideally game developers encapsulate the private key within game logic to fully handle any interactions with the API. For non-gaming competitions the owner shall be able to interact with the web application to add, modify and delete scores.

### To run locally:

1. Clone or download repo
2. Install dependencies
3. Run local mongo server
4. 'npm start' while in directory

### To do:
* Add About page
* Clean up backend
* More endpoints such as key regeneration, key retrieval via email

