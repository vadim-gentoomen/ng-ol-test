import {Type} from '@angular/core';

/**
 * Модель конфигурации кнопки сайдбара.
 * Задает внешний вид кнопки и тип компонента (в портале) по клику.
 */
export interface SidebarButtonConfig {
  id: number;
  iconId: string;
  active: boolean;
  disabled: boolean;
  description: string;
  viewerComponent: Type<any>;
  close?: () => void;
}
