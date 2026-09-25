import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Simple 404 page. Mirrors Blazor NotFound.razor / Routes.razor NotFound.
 */
@Component({
  selector: 'gns-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="padding: var(--gns-space-16); text-align: center;">
      <h1
        style="
          font-size: var(--gns-text-4xl);
          font-weight: var(--gns-font-weight-bold);
          margin-bottom: var(--gns-space-4);
        "
      >
        404
      </h1>
      <p style="color: var(--gns-color-text-secondary);">Page not found</p>
    </div>
  `,
})
export class NotFound {}
