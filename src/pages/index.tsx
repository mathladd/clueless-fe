import BaseLayout from 'layout';
import Wrapper from 'layout/Wrapper';
import Home from 'modules/Home';
import { WS } from 'types/common';

function HomePage({ ws }: { ws: WS }) {
  return (
    <Wrapper>
      <BaseLayout>
        <Home ws={ws} />
      </BaseLayout>
    </Wrapper>
  );
}

export default HomePage;
