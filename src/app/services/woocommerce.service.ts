import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {


  currentUserData: any;
  currentSessionUser: any;
  isUserAthenticated: boolean = false;
  isUserPassChanged: boolean = false;
  wooComUserData: any;
  categories: any;
  products: any;
  product: any;
  paymentGateways: any;
  orderResp: any;
  customerData: any;
  allOrders: any;
  order: any;
  apiUrl: string;
  siteURL = 'https://demo.hasan.online/github';
  jwtPart = '/wp-json/jwt-auth/v1/token';
  userPart = '/wp-json/wp/v2/users/';
  woocomPart: string = '/wp-json/wc/v3/';
  //consumerKey: string = 'ck_woocoomerce_api_consumer_key';
  //consumerSecret: string = 'cs_woocoomerce_api_secret_key';

  consumerKey: string = 'ck_960b34d917a42340ea64e443e7902daee81243f2';
  consumerSecret: string = 'cs_40f62c2909d93fb0d9a5dd082a4fd95976595655';

  constructor(private http: HttpClient) { }

  getAllOrdersForAdmin(page){
      this.apiUrl = `${this.siteURL}${this.woocomPart}orders?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&page=${page}&per_page=100`;
     //console.log('API URL for all orders by vendor ID: ',this.apiUrl);
     //console.log('headers for getAllOrdersByVendor: ',headers);
      this.allOrders = this.http.get(this.apiUrl);
      return this.allOrders;
    }

    getSingleDokanOrder(orderID){
      this.apiUrl = `${this.siteURL}${this.woocomPart}orders/${orderID}?&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
      //console.log('Get Single order from dokan: ',this.apiUrl);
      //console.log('headers: ',headers);
      this.order = this.http.get(this.apiUrl);
      return this.order;
  }


    getAllOrdersByMonth(startDate,endDate,page){
      this.apiUrl = `${this.siteURL}${this.woocomPart}orders/?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&after=${startDate}&before=${endDate}&per_page=100&page=${page}`;
      //console.log('API URL for all orders by start and end date: ',this.apiUrl);
     //console.log('headers for getAllOrdersByVendor: ',headers);
      this.allOrders = this.http.get(this.apiUrl);
      return this.allOrders;
    }

    getAllOrdersByStatus(orderStatus,page){
      this.apiUrl = `${this.siteURL}${this.woocomPart}orders/?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&status=${orderStatus}&per_page=100&page=${page}`;
      //console.log('API URL for all orders by Order Status: ',this.apiUrl);
     //console.log('headers for getAllOrdersByVendor: ',headers);
      this.allOrders = this.http.get(this.apiUrl);
      return this.allOrders;
    }

  getAllOrdersByCustomer(currentUserId){
    this.apiUrl = `${this.siteURL}${this.woocomPart}orders?&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&per_page=100&customer=${currentUserId}&product=414106`;
    //console.log('Get all orders by customer API URL: ',this.apiUrl);
    this.allOrders = this.http.get(this.apiUrl);
    return this.allOrders;
  }

  getAnOrder(orderId){
    this.apiUrl = `${this.siteURL}${this.woocomPart}orders/${orderId}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    //console.log('Get all orders by customer API URL: ',this.apiUrl);
    this.allOrders = this.http.get(this.apiUrl);
    return this.allOrders;
  }

  changeOrderStatus(orderData,orderId){
    this.apiUrl = `${this.siteURL}${this.woocomPart}orders/${orderId}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    return new Promise ((resolve) => {
        this.orderResp = this.http.put(this.apiUrl, orderData);
        this.orderResp.subscribe((successResp) => {
          resolve(successResp);
        },
    
        (errorResp) =>{
          resolve(errorResp);
        }
        
        );
    });
  }

// convert javascript object to x-www-form-urlencoded format
JSON_to_URLEncoded(element, key?, list?) {
  var list = list || [];
  if (typeof element == "object") {
    for (var idx in element)
      this.JSON_to_URLEncoded(
        element[idx],
        key ? key + "[" + idx + "]" : idx,
        list
      );
  } else {
    list.push(key + "=" + encodeURIComponent(element));
  }
  return list.join("&");
}

}
