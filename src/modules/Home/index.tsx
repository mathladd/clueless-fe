import GameList from 'components/GameList';
import { RESPONSIVE_PADDING_X } from 'constants/stylings';

export default function Home() {
  return (
    <div className={`${RESPONSIVE_PADDING_X} py-10`}>
      <GameList games={[]} />
    </div>
  );
}
