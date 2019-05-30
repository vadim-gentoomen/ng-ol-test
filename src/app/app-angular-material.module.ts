import {NgModule} from '@angular/core';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatDividerModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatTabsModule,
  MatSnackBarModule,
  MatRadioModule, MatPaginatorModule
} from '@angular/material';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';

/*Нужные модули Material Design добавлять сюда*/
export const MATERIAL_MODULES = [
  // MatAutocompleteModule,
  // MatButtonModule,
  // MatMenuModule,
  // MatIconModule,
  // MatListModule,
  // MatCardModule,
  // MatDividerModule,
  MatTooltipModule,
  // MatSlideToggleModule,
  MatProgressSpinnerModule,
  // MatProgressBarModule,
  // MatDialogModule,
  // MatInputModule,
  // MatTabsModule,
  // MatSnackBarModule,
  // MatRadioModule,
  MatPaginatorModule,
  // NoopAnimationsModule,
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
