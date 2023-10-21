export default function Login() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-900">
      <div className="flex flex-col items-center space-y-5 w-fit h-fit bg-white rounded-lg overflow-hidden p-4">
        <div className="text-slate-900 font-bold">Login</div>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2 h-fit items-center justify-between text-sm">
            <div className="text-sm text-slate-500">Username</div>
            <input className="w-40 border border-slate-600 rounded-md p-2" />
          </div>
          <div className="flex space-x-2 h-fit items-center justify-between text-sm">
            <div className="text-sm text-slate-500">Password</div>
            <input className="w-40 border border-slate-600 rounded-md p-2" />
          </div>
        </div>
        <button
          type="button"
          className="bg-slate-600 px-4 py-2 rounded-lg text-white text-sm cursor-pointer hover:bg-slate-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
