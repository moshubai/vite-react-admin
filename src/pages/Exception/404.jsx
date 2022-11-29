import { Button, Result } from 'antd'
import React from 'react'
const Exception404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary">返回首页</Button>}
  />
)
export default Exception404
