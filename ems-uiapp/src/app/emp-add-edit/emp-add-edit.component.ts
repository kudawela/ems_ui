import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { privateDecrypt } from 'node:crypto';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup;
  education: string[] = [
    'Diploma',
    'Graduate',
    'Post Graduate',
  ];
  constructor(
    private _formBuilder: FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef:MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService: CoreService
){
    this.empForm = this._formBuilder.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      salary:'',
    })
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val:any) => {
            this._coreService.openSnackBar('Employee Detail Updated!');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
         })
      }else
      {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val:any) => {
            this._coreService.openSnackBar('Employee Added Successfully');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
         })
      }
    }
  }
}
