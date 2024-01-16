import { useState } from 'react'
import axios from 'axios';

import Footer from './Footer';
import BacktoHome from './BacktoHome';

function ResetPassword() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        try {
        await axios.post('http://localhost:3001/api/reset-password', {
            username,
            oldPassword,
            newPassword,
        });
        console.log('Password reset successful');
        } catch (error) {
        console.error('Error resetting password', error);
        }
    };

  return (
    <div>
        <div className='flex justify-center'>
            <div className='p-10'>
                <h1 className='text-blue-500 text-center text-3xl'>
                    Reset <span className='text-orange-500'>Password</span>
                </h1>
                <div className='bg-orange-500 rounded-full w-5 h-1'></div>
            </div>
        </div>
        <div className='flex justify-center'>
            <div>
                <h2 className='text-rose-500 pb-5'>Reset Password</h2>
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className='border border-blue-500 rounded-full pl-2 mb-4'
                />
                <br />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='border border-rose-500 rounded-full pl-2'
                />
                <div className='pt-5'>
                    <button onClick={handleResetPassword} className='text-rose-500 bg-rose-200 rounded-full px-5'>Reset Password</button>
                </div>
            </div>
        </div>
        <BacktoHome />
        <Footer />
    </div>
  )
}

export default ResetPassword