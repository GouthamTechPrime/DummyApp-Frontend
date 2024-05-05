import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderDetails = ({route}) => { 
    const {data} = route.params;
    console.log("data - ",data)
  return (
    <View style={{marginTop:100}}>

    <Text>Order Details Page</Text>
      <Text> 
        Your Order Details - 
        { data && (<View>
        <Text>{data.customerId}</Text>
            <Text>{data.orderId}</Text>
            <Text>{data.paymentId}</Text>
            <Text>{data.orderTotal}</Text>
            <Text>{data.lat}</Text>
            <Text>{data.lng}</Text>
            <Text>Order Details - {data.OrderDetails.length}</Text>
            {
                data.OrderDetails && data.OrderDetails.map((order,index)=>{
                  return(<>
                    <View key={index}>
                        <Text>Name - {order.medicineName}</Text>
                        <Text>Name - {order.medicinePrice}</Text>
                        <Text>Your Id - {data.customerId}</Text>
                        <Text>{order.medicineName}</Text>
                  <Text>{order.medicineId}</Text>
                  <Text>{order.medicinePrice}</Text>
                  <Text>{order.medicineQuantity}</Text>
                        
                    </View>
                  </>)
                })
            }

            <Text>SFSFF</Text>
            {
                data.OrderDetails && data.OrderDetails.map((x) => (<>
                  <Text>{x.medicineName}</Text>
                  <Text>{x.medicineId}</Text>
                  <Text>{x.medicinePrice}</Text>
                  <Text>{x.medicineQuantity}</Text>
                </>))
            }
        </View>)}
      </Text>
    </View>
  )
}

export default OrderDetails

const styles = StyleSheet.create({})