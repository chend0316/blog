import { Button } from 'antd'
import { useState } from 'react';

function AsyncButton({ onClick, children }) {
  const [loading, setLoading] = useState(false)
  async function handleClick() {
    setLoading(true)
    try {
      await onClick()
    } finally {
      setLoading(false)
    }
  }
  return <Button onClick={handleClick} loading={loading}>
    {children}
  </Button>
}

export default AsyncButton
