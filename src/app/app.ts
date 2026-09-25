import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GnsThemeProvider } from './design-system/infrastructure/index';

@Component({
  imports: [RouterOutlet, GnsThemeProvider],
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
