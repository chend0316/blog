import { Button } from 'antd'
import { useState } from 'react';
import { login } from './services'

function Loading() {
  const [loading, setLoading] = useState(false)
  async function handleLogin() {
    setLoading(true)
    try {
      await login()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={handleLogin} loading={loading}>Login</Button>
    </div>
  );
}

export default Loading;
