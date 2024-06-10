const bcrypt = require('bcrypt');
const database = require('../dbConfig');

// Función para agregar un nuevo usuario
const addUser = async (email, password, rol, lenguage) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const consulta = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [email, passwordHash, rol, lenguage];
        const { rows } = await database.query(consulta, values);
        return { msg: 'Usuario registrado con éxito', user: rows[0] };
    } catch (error) {
        throw new Error('Error al registrar el usuario');
    }
};

// Función para obtener un usuario por email
const getUserByEmail = async (email) => {
    try {
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        const { rows } = await database.query(consulta, [email]);
        return rows[0] || null;
    } catch (error) {
        throw new Error('Error al obtener el usuario por email');
    }
};

// Función para obtener la contraseña de un usuario por email
const getPasswordUserByEmail = async (email) => {
    try {
        const consulta = "SELECT password FROM usuarios WHERE email = $1";
        const { rows } = await database.query(consulta, [email]);
        if (rows.length === 0) {
            throw new Error('El correo electrónico no está registrado.');
        }
        return rows[0].password;
    } catch (error) {
        throw new Error('Error al obtener la contraseña del usuario');
    }
};

const UsersCollection = {
    addUser,
    getUserByEmail,
    getPasswordUserByEmail
};

module.exports = {
    UsersCollection
};