import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WordsSettingComponent} from './ui/words-setting/words-setting.component';
import {ChooseWordsComponent} from './ui/choose-words/choose-words.component';
import {ParticipantComponent} from './ui/participant/participant.component';

const routes: Routes = [
  {path: 'words/setting', component: WordsSettingComponent},
  {path: '', redirectTo: '/words', pathMatch: 'full'},
  {path: 'words', component: ChooseWordsComponent},
  {path: 'participants', component: ParticipantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
