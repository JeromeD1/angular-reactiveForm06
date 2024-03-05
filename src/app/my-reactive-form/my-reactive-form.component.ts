import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { minDateValidator } from '../validators/validators.functions';

@Component({
  selector: 'app-my-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './my-reactive-form.component.html',
  styleUrl: './my-reactive-form.component.scss'
})
export class MyReactiveFormComponent implements OnInit{

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //pour écouter les changements de orderForm à chaque fois qu'on ajoute une nouvelle donnée
    // valueChanges de orderForm est un observable auquel on peut souscrire
    //----------------------------------------------------------
      // this.orderForm.valueChanges.subscribe(value => {
      //   console.log('orderForm value change :', value);
      // })
      //----------------------------------
  }

  orderForm = this.formBuilder.group({
    title: ['', Validators.required],
    quantity: [0, Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])],
    dateOrder : [new Date(), Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    payments: this.formBuilder.array([]),
  });

  //pour pouvoir lire orderForm.payments dans le template, on est obligé d'utiliser un getter
  //qui retourne le FormArray payments.
  //on ne peut pas y accéder par orderForm.formArray !!!
  get payments(): FormArray {
    return this.orderForm.get('payments') as FormArray;
  }

  addPayment():void {
    const newPayment = this.formBuilder.group({
      date:['', [Validators.required, minDateValidator(new Date())]],
      amount: ['', Validators.required]
    })

    const payments = this.orderForm.get('payments') as FormArray;
    payments.push(newPayment)
  }

  onSubmit():void {
    console.log(this.orderForm.value);
    
  }


}
