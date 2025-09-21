import { Component, OnInit, ViewChild} from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  
  
  @ViewChild(IonContent,{static: false}) content: IonContent;

  allOrders: any = [];
  scrolledOrders: any = [];
  noOrders: boolean = false;
  dsableBtn: boolean = false;
  spinner: boolean = true;
  // hide date filter
  hideDateFilter: boolean = false;
  //filter blocks hidden at beginning
  isHiddenFilter: boolean = false;
  currentUserId: any;

  
  selectedOrderStatus:any;
  currentYear: any;
  selectedMonth: any
  startDate: any;
  endDate: any;
  allOrderPage = 1;
  orderByStausPage = 1;
  orderByDatePage = 1;


  loadMoreAll: boolean = false;
  loadMoreAllSpinner: boolean = false;
  loadMoreStatus: boolean = false;
  loadMoreStatusSpinner: boolean = false;
  loadMoreDate: boolean = false;
  loadMoreDateSpinner: boolean = false;


  
  constructor(
    private WC: WoocommerceService,
    private CFS: CommonfunctionService
    ) {

     // localStorage.clear();
     // this.storage.clear();
       this.currentYear = new Date().getFullYear();
       
    }

    ngOnInit(){
      this.allOrdersForAdmin();
    }

  allOrdersForAdmin(){

    this.WC.getAllOrdersForAdmin(this.allOrderPage).subscribe((data) => {
      this.allOrders = [];
      this.scrolledOrders = [];
      this.allOrders = data;
      if(this.allOrders.length == 0){
        this.spinner = false;
        this.noOrders = true;
      } else {
        this.spinner = false;
        this.noOrders = false;
        this.loadMoreAll = true;
        this.loadMoreStatus = false;
        this.loadMoreDate = false;
      }
      //console.log('All orders for current vendor: ', this.allOrders);
    });
  }



  loadMoreOrderForAllOrders(){
    this.allOrderPage++;
    this.loadMoreAllSpinner = true;
    this.WC.getAllOrdersForAdmin(this.allOrderPage).subscribe((data) => {
      this.scrolledOrders = data;
      if(this.scrolledOrders.length > 0){
        for(let order of this.scrolledOrders){
          this.allOrders.push(order);
        }
        this.loadMoreAllSpinner = false;
        //console.log('loadMoreOrderForAllOrders: ', this.allOrders);
      } else {
        this.loadMoreAllSpinner = false;
        this.CFS.presentToast('No more orders to load','bottom',5000);
      }
    });
  }


// filter by status
  getOrderStatus(){
    this.selectedOrderStatus;
  }

  filterOrderStatus(){
    this.selectedMonth = null;
    this.allOrders = [];
    this.scrolledOrders = [];

    if(this.selectedOrderStatus) {;
        this.spinner = true;
        this.dsableBtn = true;
        //console.log('Form Value/Order Status: ', this.orderStatus);
          this.WC.getAllOrdersByStatus(this.selectedOrderStatus,this.orderByStausPage).subscribe((data) => {
            this.allOrders = data;
            if(this.allOrders.length == 0){
              this.spinner = false;
              this.noOrders = true;
              this.dsableBtn = false;
            } else {
              this.spinner = false;
              this.noOrders = false;
              this.dsableBtn = false;
              this.loadMoreAll = false;
              this.loadMoreStatus = true;
              this.loadMoreDate = false;
            }
            //console.log('All order with status:',this.orderStatus);
            //console.log(this.allOrders);
          });
    } else {
        this.CFS.presentAlert('Oops!', 'Please select an order status first!');
    }
  }


    loadMoreOrderForOrderByStatus(){
      this.orderByStausPage++;
      this.loadMoreStatusSpinner = true;
       this.WC.getAllOrdersByStatus(this.selectedOrderStatus,this.orderByStausPage).subscribe((data) => {
        this.scrolledOrders = data;
        if(this.scrolledOrders.length > 0){
          for(let order of this.scrolledOrders){
            this.allOrders.push(order);
          }
          this.loadMoreStatusSpinner = false;
          //console.log('loadMoreOrderForOrderByStatus: ', this.allOrders);
        } else {
          this.loadMoreStatusSpinner = false;
          this.CFS.presentToast('No more orders to load','bottom',5000);
        }
      });
  }

  // order by status ends

  // filter by date
  getOrderDate(){
    this.selectedMonth;
    if(this.selectedMonth === "1"){
      this.startDate = `${this.currentYear}-01-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-01-31T23:59:59Z`;
    }

    if(this.selectedMonth === "2"){
      this.startDate = `${this.currentYear}-02-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-02-28T23:59:59Z`;
    }

    if(this.selectedMonth === "3"){
      this.startDate = `${this.currentYear}-03-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-03-31T23:59:59Z`;
    }

    if(this.selectedMonth === "4"){
      this.startDate = `${this.currentYear}-04-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-04-30T23:59:59Z`;
    }

    if(this.selectedMonth === "5"){
      this.startDate = `${this.currentYear}-05-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-05-31T23:59:59Z`;
    }

    if(this.selectedMonth === "6"){
      this.startDate = `${this.currentYear}-06-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-06-30T23:59:59Z`;
    }

    if(this.selectedMonth === "7"){
      this.startDate = `${this.currentYear}-07-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-07-31T23:59:59Z`;
    }

    if(this.selectedMonth === "8"){
      this.startDate = `${this.currentYear}-08-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-08-31T23:59:59Z`;
    }

    if(this.selectedMonth === "9"){
      this.startDate = `${this.currentYear}-09-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-09-30T23:59:59Z`;
    }

    if(this.selectedMonth === "10"){
      this.startDate = `${this.currentYear}-10-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-10-31T23:59:59Z`;
    }

    if(this.selectedMonth === "11"){
      this.startDate = `${this.currentYear}-10-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-10-30T23:59:59Z`;
    }

    if(this.selectedMonth === "12"){
      this.startDate = `${this.currentYear}-12-01T00:00:00Z`;
      this.endDate = `${this.currentYear}-12-31T23:59:59Z`;
    }

  }

  filterOrderByDate(){
    this.selectedOrderStatus = null;
    this.allOrders = [];
    this.scrolledOrders = [];

      if(this.selectedMonth) {
        // set global infinite scroll status false
        //console.log('Infinite scroll status in filterOrderByDate: ',this.infiniteScrollStatus);
        this.spinner = true;
        this.dsableBtn = true;
        //console.log('Current Year: ',this.currentYear);
        //console.log('Form Value/Order date: ', this.orderStatus);
        //console.log('Start Date: ',this.startDate);
        //console.log('End Date: ',this.endDate);
          this.WC.getAllOrdersByMonth(this.startDate,this.endDate,this.orderByDatePage).subscribe((data) => {
            this.allOrders = data;
            if(this.allOrders.length == 0){
              this.spinner = false;
              this.noOrders = true;
              this.dsableBtn = false;
            } else {
              this.spinner = false;
              this.noOrders = false;
              this.dsableBtn = false;
              this.loadMoreAll = false;
              this.loadMoreStatus = false;
              this.loadMoreDate = true;
            }
            //console.log('All orders in month:',this.selectedMonth);
            //console.log(this.allOrders);
          });
      } else {
         this.CFS.presentAlert('Oops!', 'Please select a month first!');
      }
  }

  loadMoreOrderForOrderByDate(){
    this.orderByDatePage++;
    this.loadMoreDateSpinner = true;
    this.WC.getAllOrdersByMonth(this.startDate,this.endDate,this.orderByDatePage).subscribe((data) => {
      this.scrolledOrders = data;
      if(this.scrolledOrders.length > 0){
        for(let order of this.scrolledOrders){
          this.allOrders.push(order);
        }
        this.loadMoreDateSpinner = false;
        //console.log('loadMoreOrderForOrderByDate: ', this.allOrders);
      } else {
        this.loadMoreDateSpinner = false;
        this.CFS.presentToast('No more orders to load','bottom',5000);
      }
    });
  }
  // order by date ends

  // show filter
  showFilter(){
    this.scrollToTop();
    this.isHiddenFilter = !this.isHiddenFilter;
    //console.log('Filter Status: ',this.isHiddenFilter);
  }
  

  doRefresh(event) {
    // enable infinite scroll on pull to refresh to load all original orders with infinite scroll
    // hide filter when pull to refresh to original orders
    this.isHiddenFilter = false;
    //console.log('Begin async operation');
    this.allOrdersForAdmin();
    setTimeout(() => {
    //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  filterOrdersPage(){
    this.CFS.filterOrders();
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
    //console.log('Tapped');
  }
  
  ionViewDidEnter(){
    this.scrollToTop();
  }

  reloadPWA(){
    window.location.reload();
  }
}
