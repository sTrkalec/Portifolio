import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() scrollToProjects = new EventEmitter<void>();
  @Output() scrollToContact = new EventEmitter<void>();

  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
    this.themeService.isDarkMode;
  }

  onProjectsButtonClick() {
    this.scrollToProjects.emit();
  }

  onContactButtonClick() {
    this.scrollToContact.emit();
  }
}
