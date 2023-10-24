import { useAtomValue } from 'jotai';
import { toastAtom } from 'helper/atoms';

export default function Wrapper({ children }: { children: React.ReactElement }) {
  // const toast = useAtomValue(toastAtom);
  return (
    <div className="w-full h-full">
      <div />
      <div>{children}</div>
    </div>
  );
}
