import { useState } from 'react'
import axios from 'axios';

import BacktoHome from './BacktoHome';
import Footer from './Footer';

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3001/api/register', { username, password });
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user', error);
    }
    };

  return (
    <div>
        <h1 className='text-center text-orange-500 text-3xl p-10'>
            Register
        </h1>
        <div className='flex justify-center'>
              <div>
                <h2 className='text-orange-500 pb-5'>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='border border-orange-500 rounded-full pl-2 mb-4'
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-blue-500 rounded-full pl-2'
                />
                <div className='pt-5'>
                    <button onClick={handleRegister} className='bg-orange-200 text-orange-500 px-5 rounded-full'>Register</button>
                </div>
              </div>
        </div>

        <BacktoHome />
        <Footer />
    </div>
  )
}

export default Register