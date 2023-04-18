
import { Component, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Card } from '../card';
import { MatTableDataSource } from '@angular/material/table';
import { CARDS } from '../mock-cards';
import { User } from '../User';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder , FormControl, Validators} from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { CardsComponent } from '../cards/cards.component';
import { Brand } from '../brand';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
interface c {
  cardID: number;
  company: string;
  username: string;
  expirationDate: string;
  amount: number;
}

@Component({
  selector: 'app-dialogoption',
  templateUrl: './dialogoption.component.html',
  styleUrls: ['./dialogoption.component.css']
})

export class DialogoptionComponent {

user: User

cardID: number

displayedColumns = ['c', 'cn','am','ac'];


myCardd: any[] = []


@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
 


constructor(public dialogRef: MatDialogRef<DialogoptionComponent>,
  private formBuilder:FormBuilder,private AuthService: AuthService, private router: Router, 
  @Inject(MAT_DIALOG_DATA) public data: {cardID:number}) {
    this.cardID = data.cardID;
    console.log(this.cardID)
  AuthService.user$.subscribe(
    (user) =>
    (this.user = user ?? {
      email: '',
      firstname: '',
      lastname: '',
      passWord: '',
      username: '',
    })
  );



  this.AuthService.userCards(this.user).subscribe(
    (res) => {
      this.myCardd = res;
    console.log('list of my card', this.myCardd)
    }
  )
}



cardRequestFrom = this.formBuilder.group({
  company: ['', [Validators.required]],
  cardnumber: ['', [Validators.required]],
  amount: ['', [Validators.required]],
})

//first Card is my card, and second one is other card
onSubmitted(){
  console.log(this.cardRequestFrom.get('cardnumber')?.value)
  const myIDCARD: any = {
    cardID : this.cardRequestFrom.get('cardnumber')?.value
  }
  console.log(this.cardID)
this.AuthService.sendRequest(myIDCARD.cardID, this.cardID).subscribe(
  (res) => {
    alert('Request submitted successfully');
  },
  (err) => alert('hmmhmm something wrong')
  );

}

onCloseClick(): void {
  this.dialogRef.close();
}

}



