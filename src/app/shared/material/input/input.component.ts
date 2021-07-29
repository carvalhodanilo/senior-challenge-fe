import { ChangeDetectorRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() type: string = 'text';
  @Input() field: string = 'a';
  @Input() label: string= 'a';
  @Input() form!: FormGroup;
  @Input() placeholder: string= 'a';
  @Input() classList: string = '';

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.ref.detectChanges();
    console.log(this.form)
  }

}
