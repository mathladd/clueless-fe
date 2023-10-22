import clsx from 'clsx';
import IClose from 'components/icons/IClose';

export default function ModalCustom({
  isOpen,
  onClose,
  children,
  cssButtonClose = '',
}: {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  cssButtonClose?: string;
}) {
  return (
    <div
      className={clsx(
        'w-screen h-screen absolute top-0 left-0 mt-0 transition overflow-hidden z-50',
        isOpen ? 'opacity-1 h-screen visible' : 'opacity-0 h-0 invisible',
      )}
    >
      <div className="relative w-full h-full">
        <div className="absolute w-full h-full bg-black opacity-70" />
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-fit h-fit max-w-screen max-h-screen">
          <div className="relative w-full h-full">
            {children}
            <button
              type="button"
              className="absolute top-4 right-4 w-5 h-5 cursor-pointer hover:scale-125 active:scale-100 transition"
              onClick={onClose}
            >
              <IClose className={`text-primary ${cssButtonClose}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
