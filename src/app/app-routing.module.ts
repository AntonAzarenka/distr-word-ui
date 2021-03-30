import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WordsSettingComponent} from './ui/words-setting/words-setting.component';
import {ChooseWordsComponent} from './ui/choose-words/choose-words.component';

const routes: Routes = [
  {path: 'words/setting', component: WordsSettingComponent},
  {path: '', redirectTo: '/words', pathMatch: 'full'},
  {path: 'words', component: ChooseWordsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
