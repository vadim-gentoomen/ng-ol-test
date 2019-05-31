import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';

/*Нужные модули Material Design добавлять сюда*/
export const MATERIAL_MODULES = [
  // MatAutocompleteModule,
  MatButtonModule,
  // MatMenuModule,
  MatIconModule,
  // MatListModule,
  // MatCardModule,
  // MatDividerModule,
  MatTooltipModule,
  // MatSlideToggleModule,
  MatProgressSpinnerModule,
  // MatProgressBarModule,
  // MatDialogModule,
  MatInputModule,
  // MatTabsModule,
  // MatSnackBarModule,
  // MatRadioModule,
  MatFormFieldModule,
  // MatPaginatorModule,
  MatCheckboxModule,
];

@NgModule({
  imports: [
    ...MATERIAL_MODULES
  ],
  exports: [
    ...MATERIAL_MODULES
  ]
})
export class MaterialModule {
}
