import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../service/http.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  stationeryForm!: FormGroup;

  image: File | null = null;
  imageUrl: any = null;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private _postService: PostService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.stationeryForm = this.formBuilder.group({
      name: ['', Validators.required],
      unitprice: ['', Validators.required],
      quantity: ['', Validators.required],
      totalamount: ['', Validators.required],
      date: ['']
    });

  }

  // -----------------------------
  // File Selection
  // -----------------------------
  selectFile(event: any) {

    const file = event.target.files[0];
    if (!file) return;

    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png'
    ) {
      this.image = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    } else {
      alert('Please choose jpeg, png, jpg file');
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  // -----------------------------
  // Auto Calculate Total
  // -----------------------------
  calculateTotal() {
    const unitPrice = this.stationeryForm.get('unitprice')?.value || 0;
    const quantity = this.stationeryForm.get('quantity')?.value || 0;
    const total = unitPrice * quantity;

    this.stationeryForm.get('totalamount')?.setValue(total);
  }

  // -----------------------------
  // Normalize Name
  // -----------------------------
  capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  normalizeName() {
    let name = this.stationeryForm.get('name')?.value;

    if (name) {
      name = this.capitalizeFirstLetter(name.toLowerCase());
      this.stationeryForm.get('name')?.setValue(name);
    }
  }

  // -----------------------------
  // Submit
  // -----------------------------
  onSubmit() {

    if (!this.stationeryForm.valid) {
      alert('All fields are mandatory');
      return;
    }

    this.normalizeName();

    const formData = new FormData();

    if (this.image) {
      formData.append('file', this.image);
    }

    formData.append(
      'datalist',
      JSON.stringify(this.stationeryForm.value)
    );

    this._postService.postImg(formData).subscribe({

      next: (response: any) => {

        this.errorMessage = '';
        this.successMessage = response.message;;

        this.stationeryForm.reset();
        this.image = null;
        this.imageUrl = null;

        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },

      error: (error) => {

        this.successMessage = '';

        this.errorMessage = 'Something went wrong!';
        console.error(error);


        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }

    });
  }

}