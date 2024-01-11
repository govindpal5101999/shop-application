import { Component, OnInit, Type } from '@angular/core';
import { PostService } from '../service/http.service';
import { FormControl,FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  stationeryForm: FormGroup;
  SalePurchasetatus: string[] = ['Sale', 'Purchase'];
  default: string = 'Sale';
  imageUrl:any;

  constructor(private _postService: PostService,  public formBuilder: FormBuilder) {
    this.stationeryForm= this.formBuilder.group({
      name: ['', Validators.required],
      unitprice: ['', Validators.required],
      quantity: ['', Validators.required],
      totalamount: ['', Validators.required],
      date: [''],
      // image: ['', Validators.required],
      status: new FormControl(null)
    })

    this.stationeryForm.controls['status'].setValue(this.default, {onlySelf: true});
   }

   unitPrice:any;
   totalAmount:any;
   quantity:any;
   image:any;



  ngOnInit(): void {


    document.getElementById('TA').addEventListener('mouseenter', () =>{
      this.totalAmount = this.quantity * this.unitPrice
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

      console.log(this.image)
    }
  
    checktype(file: File){
          if(file.type === "image/jpeg" || file.type === 'image/jpg' || file.type === 'image/png'){
            (document.getElementById('subBtn')as HTMLButtonElement).disabled = false;
          }else{
            alert('Please choose jpeg, png, jpg file');
            (document.getElementById('subBtn')as HTMLButtonElement).disabled = true;
          }
    }

    unitPriceChange(){
        var UP = this.stationeryForm.get('unitprice').value;
        var Q = this.stationeryForm.get('quantity').value;
        var UPQ = UP*Q;

        this.stationeryForm.get('totalamount').setValue(UPQ);
    }

    quantityChange(){
      var UP = this.stationeryForm.get('unitprice').value;
      var Q = this.stationeryForm.get('quantity').value;
      var UPQ = UP*Q;

      this.stationeryForm.get('totalamount').setValue(UPQ);
    }


  onSubmit(){


    const formData = new FormData();
    formData.append('file',  this.image);
    const datalist = this.stationeryForm.value;
    formData.append('datalist',JSON.stringify(datalist));

    if(this.stationeryForm.valid){
      this._postService.postImg(formData).subscribe({
        next: (res)=>{
          alert('Data Saved Successfully');
          this.stationeryForm.get('name').setValue('');
          this.stationeryForm.get('quantity').setValue('');
          this.stationeryForm.get('unitprice').setValue('');
          this.stationeryForm.get('totalamount').setValue('');
          this.stationeryForm.get('date').setValue('');
          this.imageUrl = false;
          this.stationeryForm.get('status').setValue('');
          var file:any = document.querySelector('#imagefile');
          const emptyFile = document.createElement('input');
          emptyFile.type = 'file';
          file.files = emptyFile.files;
        }
      }), (error) =>{ alert('error in saving data')}
    }else{
      alert('All fields are mendatory');
    }

    
 
  }

}
