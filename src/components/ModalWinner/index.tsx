import ModalCustom from 'components/ModalCustom';

export default function ModalWinner({ winner }: { winner?: string }) {
  return (
    <ModalCustom isOpen={!!winner} onClose={() => {}}>
      <div className="text-2xl font-bold bg-slate-300 rounded-lg h-40 flex justify-center items-center p-8 text-emerald-600">
        <div>{winner} has won the game!!</div>
      </div>
    </ModalCustom>
  );
}
