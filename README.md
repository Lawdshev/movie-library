To ssetup the application:
-clone the application
-run npm install
-get an api key from tmdb and put it in an .env file
API_KEY
API_URL
-run npm start

Design Explanation:
The movie app has a navbar to enable easy navigation from the home page to the favorite page.
The movie card has a visibly big poster for attraction and a favourite button at the bottom, red when a movie has been made favourite and white when not.
Thesame card was used for the favourite page to avoid too many components.
The home page use pagination instead of infinite scroll because pagination is serverside implemented but infinite scroll would have forced a client side implementation.
