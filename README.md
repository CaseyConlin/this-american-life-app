See the app live here [https://www.thisamericanlifeapp.parkcrest.dev/](https://www.thisamericanlifeapp.parkcrest.dev/)

This app's React frontend is built with TypeScript to play HTML5 audio with MUI-based components, fetching a list of episodes with basic info and data to play each episode. The backend is Python Django with a SQLite database for development with PostgreSQL for production as deployed to a Digital Ocean droplet running a Linux Ubuntu environment. The backend also includes a multithreaded rotating API proxy to scrape the necessary data from target URLs using BeautifulSoup to parse HTML, CSS, and JavaScript data.
