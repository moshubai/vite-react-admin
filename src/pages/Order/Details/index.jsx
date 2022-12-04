import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button,message } from 'antd'
import styles from "../Details/index.module.less"
import Details from '../Details/components/details'
import DeliveryLogistics from "../Details/components/deliveryLogistics"
import Invoice from "../Details/components/invoice"
import { useNavigate,useLocation } from 'react-router-dom'
import backOrderApi from '@/api/backOrder'

const OrderDetails = () => {
    const navigate = useNavigate()
    const id = useLocation().state?.approvalId
    const [stateSwitch,setStateSwitch] = useState('details')
    //订单详情data
    const [detailsData,setDetailsData] = useState({})
    //切换
    const switchComponents = (value)=>{
        setStateSwitch(value)
    }
    //返回
    const backToSuperior = ()=>{
        navigate(`/order/list`)
    }
    //查询订单详情信息
    const getOrderDetails = ()=>{
        backOrderApi.getOrderDetails({id}).then((res)=>{
            if(res.code === 200 && res.data){
                const {data} = res
                const detailsData = {
                    number: data.number,
                    createDate: data.createDate,
                    memberName: data.memberName,
                    status: data.status,
                    lineAmount: data.orderProductList[0].lineAmount,
                    orderType: data.orderType,
                    name: data.orderProductList[0].name,
                    originalPrice: data.orderProductList[0].originalPrice,
                    quantity: data.orderProductList.length && data.orderProductList[0].quantity,
                    promotionPrice: data.orderProductList.length && data.orderProductList[0].promotionPrice,
                    remark: data.remark,
                    receiverAddress: data.receiverAddress
                }
                setDetailsData(detailsData)
            }else{
                message.error(res.message)
            }

        })
        .catch(()=>{

        })
    }
    useEffect(()=>{
        id && getOrderDetails()
    },[id])
  return(
    <>
        <div className={styles['orderDetails-orderButtonlist']}>
            <div className={styles['orderDetails-orderButtonlist_order']}>
                <Button onClick={()=>{switchComponents("details")}}>订单详情</Button>
                <Button onClick={()=>{switchComponents('deliveryLogistics')}} style={{marginLeft: '15px'}}>发货物流</Button>
                <Button onClick={()=>{switchComponents('Invoice')}} style={{marginLeft: '15px'}}>发票</Button>
            </div>
        </div>
        <div className={styles['orderDetails-operationButtonlist']}>
            <div className={styles['orderDetails-operationButtonlist_operation']}>
                    <Button>关闭</Button>
                    <Button style={{marginLeft: '27px'}}>修改</Button>
                    <Button style={{marginLeft: '27px'}} onClick={backToSuperior}>返回</Button>
            </div>
        </div>
        {
            stateSwitch === 'details' && <Details detailsData={detailsData}/>
        }
        {
            stateSwitch === 'deliveryLogistics' && <DeliveryLogistics />
        }
        {
            stateSwitch === 'Invoice' && <Invoice />
        }
    </>
  )
}
export default OrderDetails
