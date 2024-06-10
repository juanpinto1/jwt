import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans'; // Asegúrate de que esta importación está definida y apunta al archivo correcto

const Profile = () => {
  const [developer, setDeveloper] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDeveloperData = async () => {
      const token = window.sessionStorage.getItem('token');

      if (!token) {
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión si no hay token
        return;
      }

      try {
        const response = await axios.get(ENDPOINT.perfil, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = response.data.user; // Asegúrate de que la estructura del response sea correcta
        setDeveloper(user);
      } catch (error) {
        console.log('Error fetching developer data:', error);
        window.sessionStorage.removeItem('token');
        setDeveloper(null);
        navigate('/'); // Redirige al usuario a la página de inicio si hay un error
      }
    };

    getDeveloperData();
  }, [navigate]);

  // Función auxiliar para obtener los datos del desarrollador
  const getDeveloper = () => developer;

  return (
    <div className='py-5'>
      {getDeveloper() ? (
        <>
          <h1>
            Bienvenido <span className='fw-bold'>{getDeveloper().email}</span>
          </h1>
          <h3>
            {getDeveloper().rol} en {getDeveloper().lenguage}
          </h3>
        </>
      ) : (
        <p>Cargando datos del perfil...</p>
      )}
    </div>
  );
};

export default Profile;
