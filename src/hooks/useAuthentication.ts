import { useState } from 'react';

export default function useAuthentication() {
  const [user, setUser] = useState();
  return { user };
}
