import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github/github.service';
import { IGithubUserInfo } from '../../../@types/interface/IGithubUserInfo';

@Component({
  selector: 'app-main-title',
  standalone: true,
  templateUrl: './main-title.component.html',
  styleUrls: ['./main-title.component.scss'],
})
export class MainTitleComponent {
  bio: string = '';
  name: string = '';

  constructor(private githubService: GithubService) {
    this.githubService.getUserInfo('strkalec').subscribe({
      next: (data: IGithubUserInfo) => {
        this.bio = data.bio;
        this.name = data.name;

        console.log('Informações do GitHub obtidas com sucesso:', data);
      },
      error: (error) => {
        this.bio =
          'Sou um engenheiro de software experiente, especializado no desenvolvimento, dimensionamento, arquitetura, segurança e manutenção de aplicativos web e mobile.';
        console.error('Erro ao obter informações do GitHub:', error);
      },
    });
  }
}
