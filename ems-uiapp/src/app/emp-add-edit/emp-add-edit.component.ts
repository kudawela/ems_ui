import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent {
  empForm: FormGroup;
  education: string[] = [
    'Diploma',
    'Graduate',
    'Post Graduate',
  ];
  constructor(private _formBuilder: FormBuilder, private _empService: EmployeeService, private _dialogRef:DialogRef<EmpAddEditComponent>){
    this.empForm = this._formBuilder.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })
  }

  onFormSubmit(){
    if(this.empForm.valid){
     // console.log(this.empForm.value); // print to the console
     this._empService.addEmployee(this.empForm.value).subscribe({
      next: (val:any) => {
        alert("Employee Added Successfully");
        this._dialogRef.close();
      },
      error: (err:any) => {
        console.error(err);
      }
     })
    }
  }
}
