# ShoppingApp
This App allows you to browse healthy recipes and cuts out the time needed to put a shopping list together manually!

I am starting this application using a NRDBMS (MongoDB to be specific) for faster scaling and initial development time required to get my MVP up and running, plus I dont think my MVP will have to complex of querying in its infancy but I may have to move to a move hybrid set up if this becomes this case. I believe that Express should be able to handle most of server set up and requests so i will be going with this minimalist framework for now. Then my Frontend will be what I am familiar with which is the REACT Library, all on the Node.js Environment.

This app will have user authentication though I think I may apply this to application level for added security and exposure to JSON web tokens, MongoDB's built in authentication will probably used alongside this anyway!

Authentication/security will be seperated by a few technologies I think (client side/stateless for now):

1) Bycrpt for password hasing
2) JsonWebTokens for auth (need to settle on expiration timeframe) 
3) Protected middleware

TODO:

1) Style App - Done
2) Add in forgotten Password feature - Done
3) Add in remove button to both saved recipes and shopping list page - Done

--
4) Add in a recipe search feature *
5) Add in a shopping list search feature *

I need to create search bar component in my react front end and then add it to the recipe and shopping list pages, ensuring correct state management and data flow. Then I need to add the search functionality to the backend, by adding a search route to the express server (API endpoint) and then adding the search functionality to the MongoDB queries. For optimal performance I will need to create a search index on the MongoDB collection to avoid full collection scans.
--

6) Add in a recipe and shopping list filter feature 
7) Add in a recipe and shopping list sort feature
8) Add in a recipe and shopping list pagination feature 
9) Add in a recipe and shopping list recommendation feature 

