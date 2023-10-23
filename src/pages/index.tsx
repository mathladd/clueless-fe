import BaseLayout from 'layout';
import Home from 'modules/Home';
import { WS } from 'types/common';

function HomePage({ ws }: { ws: WS }) {
  return (
    <BaseLayout>
      <Home ws={ws} />
    </BaseLayout>
  );
}

export default HomePage;
