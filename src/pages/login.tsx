import Login from 'modules/Login';
import { WS } from 'types/common';

export default function LoginPage({ ws }: { ws: WS }) {
  return <Login ws={ws} />;
}
