# goldenRules-server

Server node.js with express for my golden rules app in React

Run `npm i` then `npm run serv` to start the api

### Available routes

GET `/rules`

*return =>* Array of the rules :Array
```
[
    {
        "_id": UID,
        "title": STRING,
        "description": STRING,
        "likes": INT,
        "dislikes": INT,
        "__v": VERSION_KEY
    }
]
```

---

POST `/rules/new-rule`

*Parmeters => rule:json*
```
{
    "title": STRING, (required)
    "description": STRING,
}
```
*return =>* The new rule :Rule

---

PATCH `/rules/:id`

*Parmeters => rule:json*
```
{
    "title": STRING, (required)
    "description": STRING,
}
```
*return =>* The updated rule :Rule

---

DELETE `/rules/:id`

*return =>* Array of the rules :Array

