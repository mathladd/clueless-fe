import { useState } from 'react';
import useAuthentication from 'hooks/useAuthentication';

export default function Login() {
  const { login } = useAuthentication();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => login({ username, password });

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-900">
      <div className="flex flex-col items-center space-y-5 w-fit h-fit bg-white rounded-lg overflow-hidden p-4">
        <div className="text-slate-900 font-bold">Login</div>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2 h-fit items-center justify-between text-sm">
            <div className="text-sm text-slate-500">Username</div>
            <input
              className="w-40 border border-slate-600 rounded-md p-2"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 h-fit items-center justify-between text-sm">
            <div className="text-sm text-slate-500">Password</div>
            <input
              className="w-40 border border-slate-600 rounded-md p-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          className="bg-slate-600 px-4 py-2 rounded-lg text-white text-sm cursor-pointer hover:bg-slate-700 transition"
          onClick={onLogin}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
