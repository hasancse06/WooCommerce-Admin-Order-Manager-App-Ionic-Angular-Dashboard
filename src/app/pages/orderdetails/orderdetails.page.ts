import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {

  order: any;

  spinner: boolean = false;
  disableBtn: boolean = false;
  orderID: any;
  orderStatus: any;

  orderData = {
    status: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private WC: WoocommerceService,
    private CFS: CommonfunctionService,

    ) {
      
    }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      let orderId = paramMap.get('orderId');
      this.orderID = orderId;
      this.WC.getAnOrder(orderId).subscribe((data) => {
        this.order = data;
        //console.log('Order details: ', this.order);
      });
    });
  }

// handle special character in title
 decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

  getOrderStatus(orderStatus){
    this.orderStatus = orderStatus.detail.value;
    //console.log('orderStatus: ',this.orderStatus);
  }

  updateOrderStatus(){
    if(this.orderStatus){
      this.spinner = true;
      this.disableBtn = true;
      this.orderData = {
        status: this.orderStatus
      }
      this.WC.changeOrderStatus(this.orderData,this.orderID ).then((orderRespData) => {
        //console.log('orderRespData: ', orderRespData);
        if(orderRespData['error']){
          this.CFS.presentToast('Oops, There was problem with order!','bottom',2000);
          this.disableBtn = false;
          this.spinner = false;
        } else {
          this.disableBtn = false;
          this.spinner = false;
          this.CFS.presentToast('Order status changed','bottom',2000);
          setTimeout(() => {
            window.location.reload();
          },1500);
        }
      });
    } else {
      this.CFS.presentAlert('Oops!','Please select order status first');
      this.disableBtn = false;
      this.spinner = false;
    }
  }

}
