## Docker Compose *Golden Rules* application

### Use with Docker Development Environments

You can work with this project in the Dev Environments feature of Docker Desktop version 4.12 or later.

### React application with a NodeJS backend and a MongoDB database

Project structure:
```
.
├── golden-rules (frontend)
│   ├── Dockerfile
│   ...
│
├── golden-rules-server (backend)
│   ├── Dockerfile
│   ...
│
├── nginx 
│   ├── nginx.conf
│
├── compose.yaml
└── README.md
```

## How to work with it

### Build the project

This project has 5 containers: 

- **nginx** : Provide an HTTP server for the frontend app but also work as a reverse proxy between the frontend app and the backend api.
- **front** : Will only build our frontend app and share a *volume* with the nginx container so that it can serve the app
- **back** : Will serve a REST api for the frontend to interact with the database
- **mongo** : The mongo database in question.
- **mongo-express** : Will serve an Admin interface for the mongo db

The only accessible containers are the **nginx** and the **mongo-express**, the others only interact with each other ont the environment.

To build the project you can run:
```bash
docker compose up -d
```
It will build the app following the directives in the `compose.yml` file.

You can also add the flag `--build` to force the rebuild of all the containers

When the build is done and you run 
```bash
docker ps
```

you should see this
```
CONTAINER ID   IMAGE                   COMMAND                  CREATED         STATUS         PORTS                    NAMES
32a9bba40923   nginx                   "/docker-entrypoint.…"   7 seconds ago   Up 5 seconds   0.0.0.0:8080->80/tcp     nginx
c85e1b367ae6   projet_final-backend    "docker-entrypoint.s…"   7 seconds ago   Up 6 seconds   3000/tcp                 back
33370cf5a39a   mongo-express           "/sbin/tini -- /dock…"   7 seconds ago   Up 5 seconds   0.0.0.0:8081->8081/tcp   mongo-express
0dbca6ed6fbe   mongo:4.2.0             "docker-entrypoint.s…"   7 seconds ago   Up 6 seconds   27017/tcp                mongodb
62a9de6c6562   projet_final-frontend   "docker-entrypoint.s…"   7 seconds ago   Up 6 seconds                            front
```

Note that after a few moment the container `front` will stop because it's only here to build the app

You should now be able to see the app at the address : <a href="http://localhost:8080">http://localhost:8080</a>
And you can check the state of your database following : <a href="http://localhost:8081">http://localhost:8081</a>

### ⚠️ You will need to create the database named `rules` manually...
To do that go to <a href="http://localhost:8081">http://localhost:8081</a> and create the database with the button on the top-right corner.
<img width="874" alt="Screenshot 2023-10-20 at 19 58 44" src="https://github.com/Boyadjie/docker-environment/assets/72607059/37cb3f26-80a8-4f71-b18e-b5e342a8f07a">


You may need to run again `docker compose up -d --build`

After that you sould be good to go !

### How to fill the database
When you run the app by default you may not have any rules. To add one you can simply build the project with ```docker compose up -d``` and go to <a href="http://localhost:8080">http://localhost:8080</a>. Then click on `new` and add your rule, it will be pushed to the database and redirect you to the home page.

### Changes made on the Backend API and Frontend app
The default project was working with a json, so i had to update my routes to make them interact with the mongo db instead.
I also had to update my app after the migration because some stuff had changed like return values and urls.

- Remove CORS. Not required anymore since the api is only expose inside the docker environment
- Install `mongoose` dependency to work with the db
- Connect to db (inspired from docker awesome react-express-mongo)
- Create data model
- Update api routes with mongoose methods
- Update front to manage the mongodb migration
