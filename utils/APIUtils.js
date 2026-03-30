// Author: Ghada Trabelsi
class APiUtils
{

    constructor(apiContext,loginPayLoad)
    {
        this.apiContext =apiContext; 
        this.loginPayLoad = loginPayLoad;
        
    }

    async getToken()
     {
        const loginResponse =  await  this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
         } )//200,201,
        const loginResponseJson = await loginResponse.json();
        const token =loginResponseJson.token;
        console.log(token);
        return token;

    }

    async getProducts()
    {
        const token = await this.getToken();
        const response = await this.apiContext.get("https://rahulshettyacademy.com/api/ecom/product/get-all-products",
        {
            headers:{
                'Authorization' :token,
                'Content-Type'  : 'application/json'
            },

        })
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    }

    async createOrder(orderPayLoad)
    {
        let response = {};
       response.token = await this.getToken();
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
   {
    data : orderPayLoad,
    headers:{
                'Authorization' :response.token,
                'Content-Type'  : 'application/json'
            },

   })
   const orderResponseJson =await orderResponse.json();
   console.log(orderResponseJson);
  const orderId = orderResponseJson.orders[0];
   response.orderId = orderId;

   return response;
}

    }
module.exports = {APiUtils};





