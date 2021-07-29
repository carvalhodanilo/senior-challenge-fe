import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Components
import { ToolbarComponent } from './material/toolbar/toolbar.component';
import { ButtonComponent } from './material/button/button.component';
import { SidebarComponent } from './material/sidebar/sidebar.component';
import { PageTitleComponent } from './material/page-title/page-title.component';
import { InputComponent } from './material/input/input.component';
import { TableComponent } from './material/table/table.component';
import { QuartoCardComponent } from './material/quarto-card/quarto-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
     ],
    declarations: [
        ToolbarComponent,
        ButtonComponent,
        SidebarComponent,
        PageTitleComponent,
        InputComponent,
        TableComponent,
        QuartoCardComponent
    ],
    exports: [
        ToolbarComponent,
        SidebarComponent,
        InputComponent,
        ButtonComponent,
        PageTitleComponent,
        TableComponent,
        QuartoCardComponent
    ]
})
export class SharedModule {}