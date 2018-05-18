# crispy-meme (Leaderboard API)
## Status: In Progress

### Description:

Allows users to create their own leaderboards for their games or competitions. 

Owners of leaderboards will be able to call to the api with their private key to add, delete, and modify scores as well as interact with and obtain information about their leaderboard. Users record their scores or times (racing) and user results obtained may be sorted or limited (to show top 5, 10, etc).

The public key allows owners to safely distribute a method to fetch leaderboard information such as individual user stats or retrieval of parts or the whole leaderboard.

### To build locally:

1. Clone or download repo
2. Install dependencies
3. Run local mongo server
4. 'npm start' while in directory

### To do:
* Front end to more easily interact with API (possibly)
* More endpoints such as key regeneration, key retrieval via email
