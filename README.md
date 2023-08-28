#How to use the project

## run this command

```bs
node app.js
```

## use these endpoints

> for login use as `POST` verb

with one of these payloads:

```json
{ username: 'admin', password: 'adminpassword' }
```

```json
{ username: 'user', password: 'userpassword' }
```

```
http://localhost:3000/login
```

> for login use as `GET` verb
> and put the token on header as `Bearer`

```
http://localhost:3000/protected
```
