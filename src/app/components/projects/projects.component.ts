import { Component } from '@angular/core';
import { GithubService } from '../../services/github/github.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  repositories: any[] = []; // Array para armazenar os repositórios

  constructor(githubService: GithubService) {
    const repoNames = ['AI-oZo', 'ozo-money', 'Fueltrack-API', 'FuelTrack-App'];
    githubService.getFilteredRepositories('strkalec', repoNames).subscribe({
      next: (data) => {
        this.repositories = data;
      },
      error: (error) => {
        console.error('Erro ao obter repositórios:', error);
      },
    });

    console.log(
      'Informações do GitHub obtidas com sucesso:',
      this.repositories.map((repo) => repo.name)
    );
  }
}
