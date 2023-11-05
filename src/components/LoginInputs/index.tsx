import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';

export default function LoginInputs({
  setUsernameInput,
  setPasswordInput,
}: {
  setUsernameInput: Dispatch<SetStateAction<string>>;
  setPasswordInput: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2 h-fit items-center justify-between text-sm">
        <div className="text-sm text-slate-500">Username</div>
        <input
          className="w-40 border border-slate-600 rounded-md p-2"
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </div>
      <div className="flex space-x-2 h-fit items-center justify-between text-sm">
        <div className="text-sm text-slate-500">Password</div>
        <input
          type="password"
          className="w-40 border border-slate-600 rounded-md p-2"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </div>
    </div>
  );
}
