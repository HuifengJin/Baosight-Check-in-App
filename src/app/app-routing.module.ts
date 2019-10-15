import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
   { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
   { path: 'check', loadChildren: './tab1/check/check.module#CheckPageModule' },
  //  外协管理模块
  { path: 'manager', loadChildren: './tab1/waixie/manager/manager.module#ManagerPageModule' },
  { path: 'assess', loadChildren: './tab1/waixie/assess/assess.module#AssessPageModule' },
  { path: 'assessquery', loadChildren: './tab1/waixie/assessquery/assessquery.module#AssessqueryPageModule' },
  { path: 'messquery', loadChildren: './tab1/waixie/messquery/messquery.module#MessqueryPageModule' },
  { path: 'mess-content', loadChildren: './tab1/waixie/mess-content/mess-content.module#MessContentPageModule' },
  { path: 'affirm-check', loadChildren: './tab1/affirm-check/affirm-check.module#AffirmCheckPageModule' },
  { path: 'affirm-detail', loadChildren: './tab1/affirm-detail/affirm-detail.module#AffirmDetailPageModule' },
  { path: 'inquire', loadChildren: './tab1/inquire/inquire.module#InquirePageModule' },
  { path: 'inquire-detail', loadChildren: './tab1/inquire-detail/inquire-detail.module#InquireDetailPageModule' },
  { path: 'export', loadChildren: './tab1/export/export.module#ExportPageModule' },
  { path: 'assessquery-content', loadChildren: './tab1/waixie/assessquery-content/assessquery-content.module#AssessqueryContentPageModule' }
  ]
;
@NgModule({
  imports: [
    // 初始化路由器并开始监听浏览器位置更改
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules
    } )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
