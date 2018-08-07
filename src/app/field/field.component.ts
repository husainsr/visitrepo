import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AmazingTimePickerService } from 'amazing-time-picker-angular6'
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import {MatSort, MatTableDataSource} from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

//<<----- For Date Change Format ------>>
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};  
//<---------------------------------------


@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  providers: [ {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}, 
               {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]           
})
export class FieldComponent implements OnInit {
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // isEditable = false;
  // ngOnInit() {
  //   this.firstFormGroup = this._formBuilder.group({
  //     firstCtrl: ['', Validators.required]
  //   });
  //   this.secondFormGroup = this._formBuilder.group({
  //     secondCtrl: ['', Validators.required]
  //   });
  // }

   fileText: any;
   hotelstartdate: any = null;
   hotelenddate: any = null;
   mindate: any;

 
  //date = new FormControl(moment()); //<<----- For Date Change Format ------>>
  matcher = new MyErrorStateMatcher();//<<----- For Validation  ------>>
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  outstationexpense_subform: FormGroup;
  localstationexpense_subform: FormGroup;
  hotelstay_subform: FormGroup;
  options: FormGroup;

  outstation: Array<{
    date: any,
    location: any,
    deptime: any,
    tolocation: any,
    arrtime: any,
    travelby: any,
    compexpense: any,
    selfexpense: any
  }> = [];

  local: Array<{
    date: any,
    location: any,
    startkm: any,
    tolocation: any,
    endkm: any,
    totalkm: any,
    rate: any,
    total: any
  }> = [];

  hotel: Array<{
    location: any,
    fromdate: any,
    todate: any,
    noofdays: any,
    chargeperdays: any,
    total: any
  }> = [];


  displayedColumns: string[] = ['date', 'location', 'deptime', 'tolocation', 'arrtime', 'travelby', 'compexpense', 'selfexpense' ];
  localColumns: string[] = ['date', 'location', 'startkm', 'tolocation', 'endkm', 'totalkm', 'rate', 'total' ];
  hotelColumns: string[] = [ 'location', 'fromdate', 'todate','noofdays','chargeperdays','total'];
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource(); 
  localdataSource = new MatTableDataSource();
  hotelSource = new MatTableDataSource();

  constructor(private _formBuilder: FormBuilder, 
    private atp: AmazingTimePickerService) {}
  ngOnInit(){
  
    this.outstationexpense_subform = new FormGroup({
      date: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      deptime: new FormControl('', Validators.required),
      tolocation: new FormControl('', Validators.required),
      arrtime: new FormControl('', Validators.required),
      travelby: new FormControl('', Validators.required),
      compexpense: new FormControl('', Validators.required),
      selfexpense: new FormControl('', Validators.required)
    });

    this.localstationexpense_subform = new FormGroup({
      date: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      startkm: new FormControl('', Validators.required),
      tolocation: new FormControl('', Validators.required),
      endkm: new FormControl('', Validators.required),
      totalkm: new FormControl('0', Validators.required),
      rate: new FormControl('5', Validators.required),
      total: new FormControl('0', Validators.required)
    });

    this.hotelstay_subform = new FormGroup({
      location: new FormControl('', Validators.required),
      fromdate: new FormControl('', Validators.required),
      todate: new FormControl('', Validators.required),
      noofdays: new FormControl('', Validators.required),
      chargeperdays: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required)
    });


    this.options = new FormGroup({
    
      eligibility: new FormControl(15, Validators.min(15)),
      withbill: new FormControl(),
      withoutbill: new FormControl(),
      grandtotal: new FormControl(),
    })
  }
  
  open(type) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log("--- Time Picker ---"+time);
      if(type == 0){
        this.outstationexpense_subform.patchValue({deptime: time})
     }
     else if(type == 1){
       this.outstationexpense_subform.patchValue({arrtime: time})
     }
     else{
       
     }
    });
  }


  onSubmit(){
    
    this.outstation.push(
      {date: this.outstationexpense_subform.get('date').value,
      location: this.outstationexpense_subform.get('location').value,
      deptime: this.outstationexpense_subform.get('deptime').value,
      tolocation: this.outstationexpense_subform.get('tolocation').value,
      arrtime: this.outstationexpense_subform.get('arrtime').value,
      travelby: this.outstationexpense_subform.get('travelby').value,
      compexpense: this.outstationexpense_subform.get('compexpense').value,
      selfexpense: this.outstationexpense_subform.get('selfexpense').value}
    )
    this.dataSource = new MatTableDataSource(this.outstation);
    this.dataSource.sort = this.sort;
  }

  onSubmitLocal(){
    console.log("------Form Value------"+JSON.stringify(this.localstationexpense_subform.value));
    this.localdataSource = new MatTableDataSource(this.local)
  }

  onSubmitHotel(){}

  totalkm(){
    
    
    if( (this.localstationexpense_subform.get('startkm').value != "" && this.localstationexpense_subform.get('startkm').value != null)
        && (this.localstationexpense_subform.get('endkm').value != "" && this.localstationexpense_subform.get('endkm').value != null )){
      
      const totalkm = this.localstationexpense_subform.get('endkm').value - this.localstationexpense_subform.get('startkm').value; 
      const total = this.localstationexpense_subform.get('rate').value * totalkm;
      this.localstationexpense_subform.patchValue({
        totalkm: totalkm,
        total: total
      });
    }
    else{
      this.localstationexpense_subform.patchValue({
        totalkm: 0,
        total: 0
      });
    }
  }

 


  chargeperdays(){
    
    const days = this.hotelstay_subform.get('noofdays').value;
    const charge = this.hotelstay_subform.get('chargeperdays').value;
    const total = days * charge;
    if(total > 0){
      this.hotelstay_subform.patchValue({total: total});
    }
    else{
      this.hotelstay_subform.patchValue({total: ''});
    }
  }

  submitFromDate(event: MatDatepickerInputEvent<Date>) {
        
    this.hotelstartdate = event.value;
 
    this.mindate = new Date(event.value);
    
    if(this.hotelenddate != null)
    {
      var duration = moment.duration(this.hotelenddate.diff(this.hotelstartdate));
      var days = duration.asDays();
      
      if(days == 0){
        this.hotelstay_subform.patchValue({
          noofdays: 1
        });
        this.chargeperdays();
      }
      else if(days > 0){
        this.hotelstay_subform.patchValue({
          noofdays: days+1
        });
        this.chargeperdays();
      }
      else{
        console.log("---- Select Proper Date Range ----");
        this.hotelstay_subform.patchValue({
          noofdays: ''
        });
        this.chargeperdays();
      }
    }
    
  }
  submitToDate(type: string, event: MatDatepickerInputEvent<Date>) {
    
    this.hotelenddate = event.value;
    if(this.hotelstartdate != null)
    {
      var duration = moment.duration(this.hotelenddate.diff(this.hotelstartdate));
      var days = duration.asDays();
      
      if(days == 0){
        this.hotelstay_subform.patchValue({
          noofdays: 1
        });
        this.chargeperdays();
      }
      else if(days > 0){
        this.hotelstay_subform.patchValue({
          noofdays: days+1
        });
        this.chargeperdays();
      }
      else{
        console.log("---- Select Proper Date Range ----");
        this.hotelstay_subform.patchValue({
          noofdays: ''
        });
        this.chargeperdays();
      }
    }
    

  }

  fileUpload(event) {
    var reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.fileText = reader.result;
    }
  }


  
  

}
