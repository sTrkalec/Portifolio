// theme.service.ts
import { Injectable, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDarkMode: boolean;

  constructor(private rendererFactory: RendererFactory2) {
    this.isDarkMode = this.loadThemePreference() ?? this.detectSystemTheme();
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.saveThemePreference();
    this.updateTheme();
  }

  private detectSystemTheme(): boolean {
    try {
      // Verificar se estamos em um ambiente com window e window.matchMedia
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    } catch (e) {
      console.error('Error detecting system theme:', e);
    }
    return false;
  }

  private updateTheme() {
    try {
      // Verificar se estamos em um ambiente com document
      if (typeof document !== 'undefined') {
        const renderer = this.rendererFactory.createRenderer(null, null);
        const theme = this.isDarkMode ? 'dark-theme' : 'light-theme';

        renderer.removeClass(document.body, 'light-theme');
        renderer.removeClass(document.body, 'dark-theme');
        renderer.addClass(document.body, theme);
      }
    } catch (e) {
      console.error('Error updating theme:', e);
    }
  }

  private loadThemePreference(): boolean | null {
    try {
      // Verificar se estamos em um ambiente com localStorage
      if (typeof localStorage !== 'undefined') {
        const savedThemePreference = localStorage.getItem('isDarkMode');
        return savedThemePreference !== null
          ? savedThemePreference === 'true'
          : null;
      }
    } catch (e) {
      console.error('Error loading theme preference from localStorage:', e);
    }
    return false;
  }

  private saveThemePreference() {
    try {
      // Verificar se estamos em um ambiente com localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('isDarkMode', this.isDarkMode.toString());
      }
    } catch (e) {
      console.error('Error saving theme preference to localStorage:', e);
    }
  }
}
