import { StyleSheet, Text, View,Alert,TextInput,Button } from 'react-native'
import React,{useState} from 'react';
import axios from "axios";
const BACKEND_API_URL="https://dummyapp-9y4p.onrender.com";
import RazorpayCheckout from 'react-native-razorpay';

const Home = ({navigation})=>{

    const[loading,setLoading] = useState(false);
    const[currentOrderId,setCurrentOrderId] = useState(null);
    const[amount,setAmount] = useState(0);
  async function razorpayNowPayment(){
    console.log("payment triggered")
   
    // const body = {receiptName:}
    const currentUserName = "Goutham" //getUsername dynamically
    const body = {orderTotal:1*100,customerId:"123",notes:""};
    const config ={
      headers:{
        "Content-Type":"application/json"
      }
    }
      try {
      setLoading(true);
      const response = await axios.post(BACKEND_API_URL+"/api/razorpay/makeNewPayment",body,config);
      if(response.data){
        setLoading(false);
        async function setTimeOutFunction(){
          setTimeout(()=>{
            
            return setCurrentOrderId(response.data.id)
          },2000);
        //   await AsyncStorage.setItem("currentOrderId",response.data.id);
        //   await AsyncStorage.setItem("currentOrderId1",currentOrderId);
        }
          setTimeOutFunction();
          const thresholdAmount = 1;
          var options = {
            description: 'Medstown Payment',
            image: require("./assets/icon.png"),
            currency: 'INR',
            key: 'rzp_live_skILbMCh8fRbku',
            amount: response.data.data.amount, //response.data ,,response.data.data
            name: 'Medstwon App',
            order_id: response.data.data.id,//Replace this with an order_id created using Orders API.
            prefill: {
              email:"gouthamp0306@gmail.com",
              contact: "+911232",
              name: "Goutham",
              address : "5-3 "
            },
            theme: {color: '#004d4d'}
          }
  
          async function paymentVerify(paymentId,orderDetails,razorPayOrderId,data,lat,lng){
            const body = {
              orderId :"1234",  
              orderDetails : orderDetails, 
              orderTotal : response.data.data.amount,
              orderStatus : response.data.data.status, 
              orderNature : "razorpay",
              customerId:"123",
              mobileNumber:"+91123213",
              paymentId : paymentId,
              razorPayOrderId: razorPayOrderId,
              successData : data
            }
            const config ={
              headers:{
                "Content-Type":"application/json"
              }
            }
            try {
              
              const response = await axios.put(BACKEND_API_URL+"/api/razorpay/getData",body,config);
              if(response.data.status ==="Payment Successful"){
                Alert.alert("Success","Your Payment is Successful");
                // navigate.nav
               return navigation.navigate("OrderDetails",{data : {
                orderId : response.data.data.orderId,
                orderDetails : response.data.data.orderDetails,
                orderTotal : response.data.data.orderTotal,
                lat,lng,
                customerId:response.data.data.customerId,
                paymentId : response.data.data.paymentId,
                customerId : response.data.data.customerId
               }})
              }
            } catch (error) { 
             Alert.alert("Error",response.data.status.toString());   
            }
          }
  
          
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
           alert(`Order: ${data.razorpay_order_id}`);
            setTimeout(()=>{
              //  {"customerId": 123, "lat": 23.2053805, "lng": 80.0005622, 
      // "orderDetails": [{"medicineId": "MED44529435", "medicineName": "Dr. Willmar Schwabe Alfalfa - Diabetic Tonic 500 ml",
      //  "medicinePrice": "340", "medicineQuantity": 1}], "orderId": 579737495, "totalPrice": 340}
            // updateAuthorization(data.razorpay_payment_id,userEmail,userId,userMobile,data,userName,response.data.id,data.razorpay_order_id)
        //paymentId,
            },2000);
            //request to backend
  
            //getData
            const orderDetails =  [{"medicineId": "MED44529435", "medicineName": "Dr. Willmar Schwabe Alfalfa - Diabetic Tonic 500 ml","medicinePrice": "340", "medicineQuantity": 1}];
  
            paymentVerify(data.razorpay_payment_id,orderDetails,data.razorpay_order_id,data,"23.2053805","80.0005622");
          }).catch((error) => {
            setLoading(false);
            Alert.alert("Error ",error.description)
        
          });
  
          
      }
      else{
        return Alert.alert("Error Occurred","Error occurred while creating payment order");
      }
      } catch (error) {
        return Alert.alert("Error Occurred",error.message)
      }
  
  
  }
  return(<>
  
    <View style={styles.container}>
        <Text>App</Text>
  
        {/* <TextInput
          placeholder='Enter amount'
          onChange={(e)=>{setAmount(e)}}
        /> */}
        {loading ? <Text>Loading</Text> : <Text></Text>}
        <Button onPress={()=>razorpayNowPayment()} title="Pay now"/>
      </View>
      </>)
  }

export default Home

const styles = StyleSheet.create({
    container:{
        marginTop:100
    }
})