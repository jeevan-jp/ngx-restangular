/* tslint:disable:member-ordering no-unused-variable */
import {ModuleWithProviders, NgModule, Optional, SkipSelf, InjectionToken} from '@angular/core';
import {HttpModule} from "@angular/http";
import {RESTANGULAR, RestangularFactory} from './ngx-restangular.config';
import {Restangular} from './ngx-restangular';
import {RestangularHttp} from './ngx-restangular-http';

export const CONFIG_OBJ = new InjectionToken<string>('configObj');

@NgModule({
  imports: [HttpModule],
  providers: [RestangularHttp, Restangular]
})
export class RestangularModule {

  constructor(@Optional() @SkipSelf() parentModule: RestangularModule) {
    if (parentModule) {
      throw new Error(
        'RestangularModule is already loaded. Import it in the AppModule only');
    }
  }
  
  static forRoot(config1?, config2?): ModuleWithProviders {
    return {
      ngModule: RestangularModule,
      providers: [
        {provide: CONFIG_OBJ, useValue: [config1,config2]},
        {provide: RESTANGULAR, useFactory: RestangularFactory, deps: [CONFIG_OBJ]},
      ]
    }
  }

}