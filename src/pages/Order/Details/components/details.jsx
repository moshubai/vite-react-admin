import { render } from 'less'
import React, { useMemo, useRef, useState } from 'react'
import {Card,Form,Row,Col} from 'antd'
import TableView from '@/components/table-view/index.jsx'
import styles from "../components/index.module.less"



const Details = (props) => {
    const {detailsData={}} = props
    const formList = [
        {
            label: '订单编号',
            value: detailsData.number
        },
        {
            label: '订单创建日期',
            value: detailsData.createDate
        },
        {
            label: '客户名称',
            value: detailsData.memberName
        },
        {
            label: '订单状态',
            value: detailsData.status
        },
        {
            label: '订单总金额',
            value: detailsData.lineAmount
        },
        {
            label: '收货地址',
            value: detailsData.receiverAddress
        },
        {
            label: '订单类型',
            value: detailsData.orderType
        },
        {
            label: '订单备注',
            value: detailsData.remark
        },
    ]
    const columns = [
        {
            title: '商品',
            dataIndex: 'commodity',
            key: 'commodity',
            render: (text, record, index) => {
              return <><p>{record.name}</p><p>{record.number}</p></>
            },
        },
        {
            title: '单价',
            dataIndex: 'originalPrice',
            key: 'originalPrice',
            render: (text, record, index) => {
              return <>{record.originalPrice}</>
            },
        },
        {
            title: '数量',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record, index) => {
              return <>{record.quantity}</>
            },
        },
        {
            title: '折扣金额',
            dataIndex: 'promotionPrice',
            key: 'promotionPrice',
            render: (text, record, index) => {
              return <>{record.promotionPrice}</>
            },
        },
        {
            title: '应付小计',
            dataIndex: 'lineAmount',
            key: 'lineAmount',
            render: (text, record, index) => {
              return <>{record.lineAmount}</>
            },
        },
    ]
    const dataSource = [
        {
            name: detailsData.name,
            number:detailsData.name,
            originalPrice:detailsData.name,
            quantit:detailsData.name,
            promotionPrice:detailsData.name,
            lineAmount:detailsData.name,
            id:1
        }
    ]
  return(
    <>
        <Card 
            title="订单信息"
            style={{ border: "none" }}
            className={styles["details_container"]}
        >
            <Form
                  layout="inline"
            >
                <Row>
                    {
                        formList.map((item,index)=>{
                        return <Col span={12} className={styles['col']} key={index}>
                            <Form.Item
                                label={item.label}
                            >
                                {item.value}
                            </Form.Item>
                        </Col>
                        })
                    }
                </Row>
                
            </Form>
        </Card>
        <div>
            <TableView 
                columnsFields={columns}
                dataSource={dataSource}
                usePagination={false}
            />
        </div>
    </>
  )
}
export default Details