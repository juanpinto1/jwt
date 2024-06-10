import { useContext, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';
import Context from '../contexts/Context';

const Home = () => {
  const { setDeveloper } = useContext(Context);

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      axios.get(ENDPOINT.perfil, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => setDeveloper(data.user))
        .catch(() => {
          window.sessionStorage.removeItem('token');
          setDeveloper(null);
        });
    }
  };

  useEffect(getDeveloperData, []);

  return (
    <div className='py-5'>
      <h1>
        Bienvenido a <span className='fw-bold'>Soft Jobs</span>
      </h1>
      <h4>
        El lugar donde todos los Juniors Developer podrán obtener experiencia.
      </h4>
    </div>
  );
};

export default Home;
