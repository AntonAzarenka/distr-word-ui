import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WordsSettingComponent} from './ui/words-setting/words-setting.component';
import {ChooseWordsComponent} from './ui/choose-words/choose-words.component';
import {ParticipantComponent} from './ui/participant/participant.component';
import { ContributeComponent } from './ui/contribute/contribute.component';
import { PersonalContributeComponent } from './ui/contribute/personal/personal-contribute/personal-contribute.component';
import { SignUpComponent } from './ui/common/sign-up/sign-up.component';
import { MainComponent } from './ui/main/main/main.component';

const routes: Routes = [
  {path: 'words/setting', component: WordsSettingComponent},
  {path: '', redirectTo: '/words', pathMatch: 'full'},
  {path: 'words', component: MainComponent},
  {path: 'participants', component: ParticipantComponent},
  {path: 'contribute', component: ContributeComponent},
  {path: 'contribute/personal', component: PersonalContributeComponent},
  {path: 'signup', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
