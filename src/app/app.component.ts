import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ThemeService } from './services/theme.service';
import { MainTitleComponent } from './components/main-title/main-title.component';
import { GithubService } from './services/github/github.service';
import { HttpClientModule } from '@angular/common/http';
import { MainAboutMeComponent } from './components/main-about-me/main-about-me.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ThemeService, GithubService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    MainTitleComponent,
    MainAboutMeComponent,
    HttpClientModule,
    ProjectsComponent,
    ContactComponent,
  ],
})
export class AppComponent {
  public title = 'Gabriel Miranda - CV';

  scrollToProjects() {
    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact() {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
