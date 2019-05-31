import {InjectionToken, Injector} from '@angular/core';
import {PortalInjector} from '@angular/cdk/portal';

export const PORTAL_DATA = new InjectionToken<any>('PortalData');

export function createInjector(injector: Injector, data: any): PortalInjector {
  const injectorTokens = new WeakMap<any, any>([[PORTAL_DATA, data]]);
  return new PortalInjector(injector, injectorTokens);
}
