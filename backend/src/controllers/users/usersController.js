const { UsersCollection } = require('../../database/models/usersModel');
const jwt = require('jsonwebtoken');

// Controlador para registrar un nuevo usuario
const add_user_controller = async (req, res, next) => {
    try {
        const { email, password, rol, lenguage } = req.body;

        const existingUser = await UsersCollection.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        const response = await UsersCollection.addUser(email, password, rol, lenguage);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

// Controlador para obtener el perfil del usuario
const get_profile_controller = async (req, res, next) => {
    try {
        const { email } = req.user;
        const user = await UsersCollection.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ user });
    } catch (error) {
        next(error);
    }
};

// Controlador para manejar el inicio de sesión
const login_controller = async (req, res, next) => {
    try {
        const token = req.token;
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    add_user_controller,
    login_controller,
    get_profile_controller
};