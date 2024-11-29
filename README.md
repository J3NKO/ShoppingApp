# ShoppingApp
This App allows you to browse healthy recipes and cuts out the time needed to put a shopping list together manually!

I am starting this application using a NRDBMS (MongoDB to be specific) for faster scaling and initial development time required to get my MVP up and running, plus I dont think my MVP will have to complex of querying in its infancy but I may have to move to a move hybrid set up if this becomes this case. I believe that Express should be able to handle most of server set up and requests so i will be going with this minimalist framework for now. Then my Frontend will be what I am familiar with which is the REACT Library, all on the Node.js Environment.

This app will have user authentication though I think I may apply this to application level for added security and exposure to JSON web tokens, MongoDB's built in authentication will probably used alongside this anyway!

Authentication/security will be seperated by a few technologies I think (client side/stateless for now):

1) Bycrpt for password hasing
2) JsonWebTokens for auth (need to settle on expiration timeframe) 
3) Protected middleware
