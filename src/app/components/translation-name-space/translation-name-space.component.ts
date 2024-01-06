import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-translation-name-space',
  template: `
    <p *ngIf="nameSpace; else missing">{{ nameSpace }}</p>

    <ng-template #missing>
      <div class="tag">MISSING</div>
    </ng-template>
  `,
  styles: [
    `
      .tag {
        background-color: red;
        text-align: center;
        padding: 5px;
        color: white;
        width: 70px;
        border-radius: 5px;
      }
    `,
  ],
})
export class TranslationNameSpaceComponent {
  @Input() nameSpace!: string;
}
