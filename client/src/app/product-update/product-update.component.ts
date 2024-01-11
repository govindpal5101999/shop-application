import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../service/http.service';
import { Products } from '../products';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {


  SalePurchasetatus: string[] = ['Sale', 'Purchase'];
  default: string = 'Sale';
  unitPrice: any;
  totalAmount: any;
  quantity: any;
  image: any;
  currentImg:any;

  stationeryForm = new FormGroup({
    name: new FormControl(''),
    unitprice: new FormControl(''),
    quantity: new FormControl(''),
    totalamount: new FormControl(''),
    date: new FormControl(''),
    image: new FormControl(''),
    status: new FormControl('')
  })
  dataList: any = [];
  imageUrl:any;


  constructor(private _postService: PostService, private route: ActivatedRoute, private router: Router) {

    this.stationeryForm.controls['status'].setValue(this.default, { onlySelf: true });
  }

  ngOnInit(): void {

    document.getElementById('TA').addEventListener('click', () => {
      this.totalAmount = this.quantity * this.unitPrice
    })

    this.getUpdate();
  }


  unitPriceChange() {
    var UP = this.stationeryForm.get('unitprice').value;
    var Q = this.stationeryForm.get('quantity').value;
    var UPQ = UP * Q;

    this.stationeryForm.get('totalamount').setValue(UPQ);
  }

  quantityChange() {
    var UP = this.stationeryForm.get('unitprice').value;
    var Q = this.stationeryForm.get('quantity').value;
    var UPQ = UP * Q;

    this.stationeryForm.get('totalamount').setValue(UPQ);
  }

  getUpdate() {
    this._postService.getDataById(this.route.snapshot.params.id).subscribe(res => {
      this.dataList = res;
      const currentDate = this.dataList.date.slice(0,10)
      this.stationeryForm = new FormGroup({
        name: new FormControl(this.dataList['name']),
        unitprice: new FormControl(this.dataList['unitprice']),
        quantity: new FormControl(this.dataList['quantity']),
        totalamount: new FormControl(this.dataList['totalamount']),
        date: new FormControl(this.dataList['date']),
       // image: new FormControl(this.dataList['image']),
        status: new FormControl(this.dataList['status'])
      })
      this.stationeryForm.controls['status'].setValue(this.dataList.status, { onlySelf: true });
     this.stationeryForm.get('date').setValue(currentDate);
      // this.stationeryForm.get('image').setValue(this.dataList.image);
      // console.info('data:image/jpeg;base64,'+ this.dataList.picByte);
      // this.currentImg = 'data:image/jpeg;base64,'+ this.dataList.picByte;
    })
  }

  //For Post Method---->
  selectFile(event) {
    //for selecting multiple files---->
    this.image = event.target.files[0];

    if (this.image) {
      for (let i = 0; i < this.image.length; i++) {
        this.checktype(this.image);
      }
    }

    const reader = new FileReader();

    // this.imageUrl = this.image;
    reader.readAsDataURL(this.image);
    reader.onload = (_event)=>{
      this.imageUrl = reader.result;
      console.warn(this.imageUrl)
      
    }
  }


  checktype(file: File) {
    if (file.type === "image/jpeg" || file.type === 'image/jpg' || file.type === 'image/png') {
      (document.getElementById('subBtn') as HTMLButtonElement).disabled = false;
    } else {
      alert('Please choose jpeg, png, jpg file');
      (document.getElementById('subBtn') as HTMLButtonElement).disabled = true;
    }
  }

  onUpdate() {

    const formData = new FormData();
    formData.append('file', this.image);
    const datalist = this.stationeryForm.value;
    formData.append('datalist',JSON.stringify(datalist));
    //formData.append('name',  this.stationeryForm.get('name').value)
    //formData.append('unitprice',  this.stationeryForm.get('unitprice').value)
    //formData.append('quantity',  this.stationeryForm.get('quantity').value)
    //formData.append('totalamount',  this.stationeryForm.get('totalamount').value)
    //formData.append('date',  this.stationeryForm.get('date').value)
    //formData.append('status',  this.stationeryForm.get('status').value)


    if(this.image){
      this._postService.update(this.route.snapshot.params.id, formData).subscribe(res => {
        this.router.navigate(['/productList'])
      }), (err) => {
        alert('error in updating')
      };

    }else{
      alert('select image');
    }
 

  }

}
