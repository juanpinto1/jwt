.env

PORT = 3000
DB_HOST = localhost
DB_USER = postgres
DB_PASSWORD = 12345
DB_NAME = softjobs
JWT_SECRET = jwt_secret



POST http://127.0.0.1:3000/api/users/registrarse
Content-Type: application/json

{
    "email": "Juan.pinto7@gmail.com", 
    "password": "12345", 
    "rol": "Full Stack Developer",
    "lenguage": "Javascript"
}

###
POST http://127.0.0.1:3000/api/users/registrarse
Content-Type: application/json
{
    "email": "docente1@desafiolatam.com", 
    "password": "12345", 
    "rol": "Backend Developer",
    "lenguage": "Python"
}
###
POST http://127.0.0.1:3000/api/users/login
Content-Type: application/json

{
    "email": "Juan.pinto7@gmail.com", 
    "password": "12345", 
    "rol": "Full Stack Developer",
    "lenguage": "Javascript"
}
###
GET http://127.0.0.1:3000/api/users/perfil
Content-Type: application/json
Authorization: Bearer 'Ingresar codigo de token'
