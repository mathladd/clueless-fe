import { useState } from 'react';
import ModalCustom from 'components/ModalCustom';
import useAuthentication from 'hooks/useAuthentication';

export default function ModalCreateLobby({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: ({ lobbyName, username }: { lobbyName: string; username: string | undefined }) => void;
}) {
  const { user } = useAuthentication({});
  const [lobbyName, setLobbyName] = useState('');

  const onModalClose = () => {
    setLobbyName('');
    onClose();
  };

  return (
    <ModalCustom isOpen={isOpen} onClose={onModalClose} cssButtonClose="text-white">
      <div className="bg-slate-800 w-[340px] rounded-lg h-full flex flex-col space-y-3 items-center">
        <div className="flex justify-center items-center text-bold text-lg text-white px-3 pt-3">
          Create lobby
        </div>
        <div className="border-t border-slate-700 w-full" />
        <div className="flex flex-col justify-center items-center text-bold text-lg text-white px-3 py-4 space-y-10">
          <div className="flex space-x-3 text-sm h-fit items-center">
            <div className="h-fit">Lobby name</div>
            <input
              className="w-40 rounded-md p-2 block bg-slate-600 focus:outline-none"
              onChange={(e) => setLobbyName(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="border border-slate-200 w-fit p-2 rounded-lg text-sm text-slate-100 hover:bg-slate-900 transition"
            onClick={() => {
              onSubmit({ lobbyName, username: user?.name ?? undefined });
              onClose();
            }}
            disabled={!user}
          >
            Create
          </button>
        </div>
      </div>
    </ModalCustom>
  );
}
