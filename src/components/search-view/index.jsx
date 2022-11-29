import { Col, Form, Row } from 'antd'
import React, { memo } from 'react'
import style from './index.module.less'
/**
 * 搜索高阶组件
 * @param {*} props
 * @returns
 */

const isFunc = (type) => type instanceof Function

const SearchForm = (props) => {
  const { children, onFinish, form } = props
  const ChildList = (flag) => {
    return React.Children.map(children, (child) => {
      // console.log("child", child); //log-xu
      if (!child) return false
      if (!React.isValidElement(child)) return null
      if (+flag === 1 && isFunc(child.type)) {
        return React.cloneElement(
          <Col />,
          {
            span: 6,
          },
          child,
        )
      }
      if (+flag === 2 && !isFunc(child.type)) {
        return React.cloneElement(child, {})
      }
    })
  }
  return (
    <>
      <div className={style['platform_search_warp']}>
        <Form form={form} onFinish={onFinish} autoComplete="off">
          {/* <ul className={style['platform_search_warp_ul']}>{ChildList(1)}</ul> */}

          <Row gutter={16}>
            {ChildList(1)}
            {/* <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col> */}
          </Row>

          <div>{ChildList(2)}</div>
        </Form>
      </div>
    </>
  )
}

export default memo(SearchForm)
