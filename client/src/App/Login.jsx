import { useState } from 'react'
import axios from 'axios';

import Footer from './Footer';
import BacktoHome from './BacktoHome';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3001/api/login', { username, password });
          const { token } = response.data;
          console.log('Login successful. Token:', token);
          setLoggedIn(true);
        } catch (error) {
          console.error('Error logging in', error);
        }
      };

  return (
    <div>
        <h1 className='text-center text-blue-500 text-3xl p-10'>
            Login
        </h1>
            <div className='flex justify-center'>
                <div>
                    <h2 className='text-orange-500 pb-5'>Login</h2>
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
                        <button onClick={handleLogin} className='shadow-sm bg-green-200 text-green-500 rounded-full px-5'>Login</button>
                    </div>
                </div>      
            </div>

            <BacktoHome />
            <Footer />

    </div>
  )
}

export default Login