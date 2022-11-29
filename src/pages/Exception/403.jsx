import { Button, Result } from 'antd'
import React from 'react'
const Exception403 = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary">返回首页</Button>}
  />
)
export default Exception403
