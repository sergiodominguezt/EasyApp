import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})



export class CreateComponent implements OnInit {

  @ViewChild('card', { static: false})
  card!: CardComponent;

  characterCount = 0;
 

  ngOnInit(): void {
    this.postForm.controls.title.valueChanges.subscribe(value => {
      this.characterCount = value.length;
      this.card.title = value;
      
    });
    this.postForm.controls.messages.valueChanges.subscribe(value => {
      this.card.message = value;
    });
    
  }

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.postForm = this.formBuilder.group({
      title: [null, { validators: [Validators.required, this.maxLengthValidator(30)], updateOn: 'change' }],
      messages: [null, { validators: [Validators.required, this.maxLengthValidator(300)], updateOn: 'change' }]
    });
  }

  get title(): AbstractControl {
    return this.postForm.get('title')!;
  }

  get messages(): AbstractControl {
    return this.postForm.get('message')!;
  }


  onSubmit(): void {
    this.postForm.markAllAsTouched();
  
  }

  maxLengthValidator(maxLength: number) {
    return (control: AbstractControl) => {
      const value: string = control.value || '';
      if (value.length > maxLength) {
        control.setValue(value.substring(0, maxLength));
      }
      return null;
    };
  }

 



}
