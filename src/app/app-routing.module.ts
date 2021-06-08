import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteCitiesComponent } from './pages/favorite-cities/favorite-cities.component';

import { RouteConstants } from './shared/constants/route-constants';

const routes: Routes = [{
  path: RouteConstants.FAVORITE_CITIES,
  component: FavoriteCitiesComponent
}, {
  path: '**',
  redirectTo: RouteConstants.FAVORITE_CITIES
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
