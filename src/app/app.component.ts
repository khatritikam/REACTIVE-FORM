import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'reactiveforms';
  reactiveForm: FormGroup;
  formStatus;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      personalDetails:new FormGroup({
      firstname:new FormControl(null, [Validators.required, this.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email], this.emailNotAllowed),
      }),
      gender: new FormControl('male'),
      country: new FormControl('india'),
      hobbies: new FormControl(null),
      skills: new FormArray([
        new FormControl(null, Validators.required)
      ])
    })
    // this.reactiveForm.get('personalDetails.firstname').valueChanges.subscribe((value) =>{
    //   console.log(value);
    // })

    // this.reactiveForm.valueChanges.subscribe((value)=>{
    //   console.log(value)
    // })

    this.reactiveForm.statusChanges.subscribe((value)=>{
      console.log(value)
      this.formStatus = value;
    })
    // setTimeout(() => {
    //   this.reactiveForm.setValue({
    //     personalDetails:{
    //       firstname:'',
    //       lastname:'',
    //       email:'abc@exampale.com'
    //     },
    //     gender:'',
    //     country:'',
    //     hobbies:'',
    //     skills: []
    //   })
    // },4000)

    setTimeout(() => {
      this.reactiveForm.patchValue({
        personalDetails:{
          email:'abc@exampale.com'
        }
       })
    },4000)

    
    
  }

  onSubmit(){
    console.log(this.reactiveForm)
    this.reactiveForm.reset({
     gender: 'male',
     country:'india'
        
       })
      }

  addSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required))
  }

  noSpaceAllowed(control:FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1 ){
      return {noSpaceAllowed:true}
    }
    return null
  }

  emailNotAllowed(control:FormControl):Promise<any> | Observable<any>{
    const response = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value === 'mihir2597@gmail.com'){
          resolve({emailNotAllowed:true})
        }else{
          resolve (null)
        }
      },5000)
    })
    return response;
  }
}
