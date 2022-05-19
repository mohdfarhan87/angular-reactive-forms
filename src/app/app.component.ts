import { Component, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RegisterService } from './register.service';
import { FileUploadService } from './file-upload.service';

export interface Subject {
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  imageData: any;


  @ViewChild('chipList', { static: true }) chipList: any;
  GradeArray: any = ['8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
  SubjectsArray: Subject[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // myForm  = this.fb.group({
  //   firstName: [''],
  //   lastName: [''],
  //   address: this.fb.group({
  //     street: [''],
  //     city: [''],
  //     state: [''],
  //     zip: ['']
  //   }),
  // });
  
  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required,Validators.email]],
    gender: ['Male'],
    dob: ['', [Validators.required]],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
      
      
    }),
    grade: [''],
    subjects: [this.SubjectsArray],
    image:['']
  })

  constructor(private fb: FormBuilder, private reg : RegisterService,private fileupload1:FileUploadService) {}
  // ngOnInit(): void {
  //   this.reactiveForm()
  // }
  /* Reactive form */
  // reactiveForm() {
   
  // }
  /* Date */
  //  date(e) {
  //     var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  //     this.myForm.get('dob').setValue(convertDate, {
  //       onlyself: true
  //     })
  //   }
      /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.SubjectsArray.length < 5) {
      this.SubjectsArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.SubjectsArray.indexOf(subject);
    if (index >= 0) {
      this.SubjectsArray.splice(index, 1);
    }
  }  
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }
  submitForm() {
    // this.http.post<any>("http://localhost:3000/myForm",this.myForm)
    // .subscribe
    // (res=> 
    //  {
    //    alert("SignUp Successfull");
    //  } )
    if(this.myForm.status=='VALID'){
      this.fileupload1.addProfile( this.myForm.value.image);
     // this.myForm.reset();
      //this.imageData = null;
    
    this.reg.saveuser(this.myForm).subscribe( r=>
      {
      });
      alert("SignUp Successfull");
    }
    // console.log(this.myForm.value);
}


onFileSelect(event:any) {
  const file =  event.target.files[0]
  
  //this.myForm.patchValue({ image: file });
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (file && allowedMimeTypes.includes(file.type)) {
    const reader = new FileReader();
     reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageData = reader.result as any;
      this.myForm.patchValue({ image: this.imageData });
    };
    
    
  }
}

// onSubmit() {
//   this.profileService.addProfile(this.form.value.name, this.form.value.image);
//   this.form.reset();
//   this.imageData = null;
// }


}