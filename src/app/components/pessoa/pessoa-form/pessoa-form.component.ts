import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TableComponent } from 'src/app/shared/material/table/table.component';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { GenericService } from 'src/app/shared/services/generic.service';

import { mappingUrls } from './../../../shared/constants/constants';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  @ViewChild('personForm') personForm!: FormGroup;
  form!: FormGroup;
  public submitted = false;
  public currentAction!: string;
  public pessoa!: Pessoa;
  public service = mappingUrls.pessoaService.context;
  public actions!: any[];
  public pageTitle!: any;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private genericService: GenericService) { }

  ngOnInit(): void {
    this.currentAction = this.route.snapshot.url[0].path;
    this.buildForm();
    this.loadData();
  }

  public buildForm():void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]]
    });

    switch (this.currentAction) {
      case 'novo':
        this.pageTitle = 'Cadastro de nova pessoa';
        break;
      case 'visualizar':
        this.actions = [{action: 'edit', icon: 'edit' }]
        this.form.disable(); 
        break;
      case 'editar':
        this.actions = [{action: 'edit', icon: 'edit' }, {action: 'delete', icon: 'delete' }]
        break;
    }
  }

  public loadData(): void {
    if (this.currentAction == 'editar' || this.currentAction == 'visualizar') {
			this.route.paramMap.pipe(
				switchMap(params => this.genericService.getById(this.service, params.get('id')))
			).subscribe(
				(res) => {
          this.pessoa = new Pessoa(res);
          this.pageTitle = `${this.pessoa.nome}`;
					this.form.patchValue(res);
				}
			);
		}
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.form.valid) { 
      this.pessoa = {...this.pessoa, ...new Pessoa(this.form.value)};
      this.saveOrEdit(this.pessoa);
    }else {
      this.markFormGroupTouched(this.form); 
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
		(<any>Object).values(formGroup.controls).forEach((control: FormGroup) => {
			control.markAsTouched()
			if (control.controls) {
				this.markFormGroupTouched(control);
			}
		});
	}

  public onClickAction(event: any): void {
    switch (event.action){
      case 'edit':
        this.router.navigate([`/pessoas/editar/${this.pessoa.id}`]);
        break;
      case 'delete':
        this.delete();
        break;
    }
  }

  public saveOrEdit(p: Pessoa) {
    const action = this.currentAction == 'novo' ? 'save' : 'edit';
    this.genericService[action](p, this.service).subscribe(res => {
      this.openSnackBar('Registro salvo.', 'Sucesso!');
      this.router.navigate([`/pessoas`]);
    })
  }

  public delete():void {
    this.genericService.delete(this.service, this.pessoa.id).subscribe(res => {
      console.log(res)
    })
  }

  public openSnackBar(message: string, status: string): void {
    this._snackBar.open(message, status, {
      horizontalPosition: 'end', 
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
