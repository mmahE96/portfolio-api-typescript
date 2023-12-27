# Project: Portfolio API Authentication with NodeJS
This is an Authentication API using JWT's. Email & Password is used for authentication.

The API based on Node.js, Express, Prisma & Postgres.

## End-point: Register
### Method: POST
>```
>{{baseApiUrl}}/register
>```
### Body (**raw**)

```json
{
    "email": "bob.ds@gmail.com",
    "password": "bob12345?"
}
```

### Response: 201
```json
{
    "message": "User registered successfully",
    "user": {
        "id": 20,
        "email": "bob.ds@gmail.com",
        "password": "$2b$10$7kT3i0JBAtrs4XRDPjjiMen2osSNGSybHDgN61fcMC18yaKnsOfXO",
        "role": "user"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login
### Method: POST
>```
>{{baseApiUrl}}/login
>```

### Body (**raw**)

```json
{
    "email": "joe@hotmail.com",
    "password": "joe12345?"    
}
```

### Response: 200
```json
{
    "status": "Logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haGlyLmNzQGhvdG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYzMDY5MzYxLCJleHAiOjE2NjMwNjkzOTF9.djItFHzcktpjG9-1xI2HGUBQFtTZVN-k-Mqim_-t5-o",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haGlyLmNzQGhvdG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYzMDY5MzYxLCJleHAiOjE2NjMwNzA4NjF9.QzuyASs1os69pjKIEjQoxRm8d8Teu_pD-aH3y8RUrrg"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Dashboard Protected 
### Method: GET
>```
>{{baseApiUrl}}/dashboard/12
>```
### Headers

|Content-Type|Value|
|---|---|
|access-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haGlyLmNzQGhvdG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYyNTQ0ODUxLCJleHAiOjE2NjI1NDQ4ODF9._ij5pdCbDRH_74KNIl79SGPrpRpFYXvi8LIkSkdL3pU|


### Response: 201
```json
{
    "message": "New access-token generated",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haGlyLmNzQGhvdG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYzMDY5NDA3LCJleHAiOjE2NjMwNjk0Mzd9.OBN41DfzNGCEexK_rlxRLgxU0pqI_-34uBqvsmRobtI",
    "params": "12"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Change Role
### Method: POST
>```
>{{baseApiUrl}}/changerole
>```
### Headers

|Content-Type|Value|
|---|---|
|refresh-token|{{refresh-token}}|


### Headers

|Content-Type|Value|
|---|---|
|access-token|{{access-token}}|


### Body (**raw**)

```json
{
    "role":"admin",
    "email":"mark.ds@gmail.com"
}
```

### Response: 200
```json
{
    "message": "Role changed successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get All Users
### Method: GET
>```
>{{baseApiUrl}}/getallusers
>```
### Headers

|Content-Type|Value|
|---|---|
|access-token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haGlyLmNzQGhvdG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYyNTQ0NjM2LCJleHAiOjE2NjI1NDQ2NjZ9.EXe109-64wTvHJMszLiM7FRxdTnrULqg9cZJFAyVAqw|


### Response: 200
```json
[
    {
        "id": 2,
        "email": "mark.dd@hotmail.com",
        "password": "user",
        "role": "user"
    },
    {
        "id": 4,
        "email": "jay.cs@hotmail.com",
        "password": "$2b$10$6PYqoE8V2PaDRA/1N8BhxOkT4/y0Caq3.3YHJiBhnPh6wZP4XufqW",
        "role": "user"
    },
    {
        "id": 3,
        "email": "rex.cs@hotmail.com",
        "password": "$2b$10$Eub6TY/3YaaKTFFwYEg.yuZEoUL0iP.n52gZCBXwd8zFpe8hHWASq",
        "role": "admin"
    },
    {
        "id": 6,
        "email": "macx.cs@hotmail.com"",
        "password": "$2b$10$5KdLh8fjZtwQsaZoz7D1weVbWR8vpaKno8zfUMpI57f/cWfy5PWFm",
        "role": "user"
    },
    {
        "id": 7,
        "email": "1",
        "password": "$2b$10$FTW1tkHuXhBlQe0w.HFrKeO6jEGVKX0zUzAX4Qp1eRGEg3vh0TxWG",
        "role": "user"
    },
    {
        "id": 8,
        "email": "dex.cs@hotmail.com",
        "password": "$2b$10$KzM8tiAga8DsgwM3LFjQvO7pUxrBc3NTGYQeDhVsfAPn7IfSl2H9C",
        "role": "user"
    },
    {
        "id": 10,
        "email": "ray.cs@hotmail.com",
        "password": "$2b$10$8dUPUgp6KCIgco/TJd8aR.b1s6mxtZEhlqb3j80t9deO71B1tzvBS",
        "role": "user"
    },
    {
        "id": 1,
        "email": "lex.cs@hotmail.com",
        "password": "$2b$10$Qja.X0zoINfJJvtLUwysR.c/HkRiXVCP743BLmgdnVI.4azfUTTAy",
        "role": "admin"
    },
    {
        "id": 11,
        "email": "ana.ds@gmail.com",
        "password": "$2b$10$eoVsSQBjFszjsimvVdSiPO9fddbJ0EjLRBIC/0eFbRdqYI/UQQsli",
        "role": "user"
    },
    {
        "id": 16,
        "email": "zach.ds@gmail.com",
        "password": "$2b$10$eFHG6TBauCnFufdL5HjuSu1Hvpw6vGd2x3KyPs4NdO0pv0GUF0MTO",
        "role": "user"
    },
    {
        "id": 18,
        "email": "max.ds@gmail.com",
        "password": "$2b$10$hOgEkul36nsnf3gnxjSfSe.dAouAP/cFEun4QsuntmxkHW7.piwTW",
        "role": "user"
    },
    {
        "id": 20,
        "email": "fax.ds@gmail.com",
        "password": "$2b$10$7kT3i0JBAtrs4XRDPjjiMen2osSNGSybHDgN61fcMC18yaKnsOfXO",
        "role": "user"
    },
    {
        "id": 19,
        "email": "rendo.ds@gmail.com",
        "password": "$2b$10$NhDX7oSDPxH6M.Y/Y0qg1OjpMipwC5aDUZO5DeiwRYZ93yi.Ea25K",
        "role": "admin"
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Refresh token
### Method: GET
>```
>{{baseApiUrl}}/refreshtoken
>```
### Headers

|Content-Type|Value|
|---|---|
|refresh-token|{{refresh-token}}|


### Headers

|Content-Type|Value|
|---|---|
|access-token|{{access-token}}|


### Response: 201
```json
{
    "status": "Logged in, new token generated",
    "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haGlyLmNzQGhvdG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYzMDY5NTE0LCJleHAiOjE2NjMwNjk1NDR9.dbRzXbcraV4_l3Yf6d1yI-_3EgmBVkkvUeb57SsPHm4"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Change password
### Method: POST
>```
>{{baseApiUrl}}/changepassword
>```
### Body (**raw**)

```json
{
    "email":"joe.ds@gmail.com",
    "password":"Mahir1234!"
}
```

### Response: 200
```json
{
    "message": "Password changed successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Forgot password
### Method: POST
>```
>{{baseApiUrl}}/forgotpassword
>```
### Body (**raw**)

```json
{
    "email":"joe.cs@hotmail.com"
}
```

### Response: 200
```json
{
    "message": "Email sent successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Reset password
### Method: POST
>```
>{{baseApiUrl}}/resetpassword/:userId:token
>```
### Response: 200
```json
{
    "message": "Password changed successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Pagination
### Method: GET
>```
>{{baseApiUrl}}/pagination/3/5
>```
### Response: 200
```json
[
    {
        "id": 4,
        "email": "joe.cs@hotmail.com",
        "password": "$2b$10$6PYqoE8V2PaDRA/1N8BhxOkT4/y0Caq3.3YHJiBhnPh6wZP4XufqW",
        "role": "user"
    },
    {
        "id": 6,
        "email": "",
        "password": "$2b$10$5KdLh8fjZtwQsaZoz7D1weVbWR8vpaKno8zfUMpI57f/cWfy5PWFm",
        "role": "user"
    },
    {
        "id": 7,
        "email": "1",
        "password": "$2b$10$FTW1tkHuXhBlQe0w.HFrKeO6jEGVKX0zUzAX4Qp1eRGEg3vh0TxWG",
        "role": "user"
    },
    {
        "id": 8,
        "email": "max.cshotmail.com",
        "password": "$2b$10$KzM8tiAga8DsgwM3LFjQvO7pUxrBc3NTGYQeDhVsfAPn7IfSl2H9C",
        "role": "user"
    },
    {
        "id": 10,
        "email": "rex.cs@hotmail.com",
        "password": "$2b$10$8dUPUgp6KCIgco/TJd8aR.b1s6mxtZEhlqb3j80t9deO71B1tzvBS",
        "role": "user"
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
