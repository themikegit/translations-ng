import { Component, ViewChild, inject, signal } from '@angular/core';
import { TranslationItem } from 'src/app/utils/translation-item.interface';
import { ModalComponent } from '../modal/modal.component';
import { MatDrawer } from '@angular/material/sidenav';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { SseServiceService } from 'src/app/services/sse-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-core',
  template: `
    <div id="wrap">
      <mat-toolbar>
        <button
          mat-icon-button
          class="example-icon"
          aria-label="Example icon-button with menu icon"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span>i18n mgm</span>
        <span class="example-spacer"></span>
        <button
          mat-icon-button
          class="example-icon favorite-icon"
          aria-label="Example icon-button with heart icon"
          (click)="addKey()"
          [disabled]="!user"
        >
          <mat-icon>add</mat-icon>
        </button>
        <div class="profile" *ngIf="user; else login">
          <div class="avatar">{{ 'T' }}</div>
          <button
            mat-icon-button
            class="example-icon"
            aria-label="Example icon-button with share icon"
            (click)="logOut()"
          >
            <mat-icon>logout</mat-icon>
          </button>
        </div>
        <ng-template #login>
          <button
            mat-icon-button
            class="example-icon"
            aria-label="Example icon-button with share icon"
            [routerLink]="'/login'"
          >
            <mat-icon>login</mat-icon>
          </button>
        </ng-template>
      </mat-toolbar>
      <mat-drawer-container class="example-container" autosize>
        <mat-drawer #drawer class="example-sidenav" mode="side">
          <div id="form">
            <mat-form-field appearance="outline">
              <mat-label>App</mat-label>
              <mat-select [required]="true" [(value)]="app">
                <mat-option [value]="opt.value" *ngFor="let opt of options">
                  {{ opt.viewValue }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Component</mat-label>
              <mat-select [required]="true" [(value)]="component">
                <mat-option *ngFor="let opt of components" [value]="opt.value">
                  {{ opt.viewValue }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="field">
              <mat-label>Key</mat-label>
              <input
                [required]="true"
                matInput
                placeholder="Label key vale"
                [(ngModel)]="key"
              />
            </mat-form-field>

            <mat-form-field appearance="outline" class="field">
              <mat-label>EN</mat-label>
              <input matInput placeholder="Ex. Pizza" [(ngModel)]="en" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="field">
              <mat-label>DE</mat-label>
              <input matInput placeholder="Ex. Pizza" [(ngModel)]="de" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="field">
              <mat-label>RS</mat-label>
              <input matInput placeholder="Ex. Pizza" [(ngModel)]="rs" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="field">
              <mat-label>Description</mat-label>
              <textarea
                matInput
                placeholder="Short description about the tranlslate"
                [(ngModel)]="description"
              ></textarea>
            </mat-form-field>

            <button mat-flat-button (click)="addTask()" color="primary">
              {{ editMode ? 'Update' : 'Add' }}
            </button>
            <button mat-flat-button (click)="drawer.toggle()" color="secondary">
              Cancel
            </button>
          </div>
          <!-- <p>Auto-resizing sidenav</p>
      <p *ngIf="showFiller">Lorem, ipsum dolor sit amet consectetur.</p>
      <button (click)="showFiller = !showFiller" mat-raised-button>
        Toggle extra text
      </button> -->
        </mat-drawer>

        <div class="example-sidenav-content">
          <mat-tab-group>
            <mat-tab label="Missing Translations">
              <h4>Find missing in</h4>
              <section class="example-section">
                <mat-radio-button
                  (change)="selectFilter($event)"
                  value="de"
                  class="cb"
                  >DE</mat-radio-button
                >
                <mat-radio-button
                  (change)="selectFilter($event)"
                  value="rs"
                  class="cb"
                  >RS</mat-radio-button
                >
              </section>

              <table
                mat-table
                [dataSource]="filteredDataSource()"
                class="mat-elevation-z8"
              >
                <ng-container matColumnDef="en">
                  <th mat-header-cell *matHeaderCellDef>En</th>
                  <td mat-cell *matCellDef="let element">
                    <app-translation-name-space
                      [nameSpace]="element.en"
                    ></app-translation-name-space>
                  </td>
                </ng-container>

                <ng-container matColumnDef="de">
                  <th mat-header-cell *matHeaderCellDef>De</th>
                  <td mat-cell *matCellDef="let element">
                    <app-translation-name-space
                      [nameSpace]="element.de"
                    ></app-translation-name-space>
                  </td>
                </ng-container>

                <ng-container matColumnDef="rs">
                  <th mat-header-cell *matHeaderCellDef>Rs</th>
                  <td mat-cell *matCellDef="let element">
                    <app-translation-name-space
                      [nameSpace]="element.rs"
                    ></app-translation-name-space>
                  </td>
                </ng-container>

                <ng-container matColumnDef="description">
                  <th mat-header-cell *matHeaderCellDef>Description</th>
                  <td mat-cell *matCellDef="let element">
                    {{ element.description }}
                  </td>
                </ng-container>

                <ng-container matColumnDef="key">
                  <th mat-header-cell *matHeaderCellDef>Key</th>
                  <td mat-cell *matCellDef="let element">
                    {{ element.app }}_{{ element.component }}_{{ element.key }}
                  </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let element">
                    <button
                      (click)="editKey(element)"
                      mat-icon-button
                      color="warn"
                      aria-label="Example icon button with a heart icon"
                    >
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button
                      (click)="deleteKey(element)"
                      mat-icon-button
                      color="warn"
                      aria-label="Example icon button with a heart icon"
                    >
                      <mat-icon>delete</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr
                  mat-row
                  *matRowDef="let row; columns: displayedColumns"
                ></tr>
              </table>
            </mat-tab>
            <mat-tab label="All Translations">
              <table
                mat-table
                [dataSource]="dataSource()"
                class="mat-elevation-z8"
              >
                <ng-container matColumnDef="en">
                  <th mat-header-cell *matHeaderCellDef>En</th>
                  <td mat-cell *matCellDef="let element">{{ element.en }}</td>
                </ng-container>

                <ng-container matColumnDef="de">
                  <th mat-header-cell *matHeaderCellDef>De</th>
                  <td mat-cell *matCellDef="let element">{{ element.de }}</td>
                </ng-container>

                <ng-container matColumnDef="rs">
                  <th mat-header-cell *matHeaderCellDef>Rs</th>
                  <td mat-cell *matCellDef="let element">{{ element.rs }}</td>
                </ng-container>

                <ng-container matColumnDef="description">
                  <th mat-header-cell *matHeaderCellDef>Description</th>
                  <td mat-cell *matCellDef="let element">
                    {{ element.description }}
                  </td>
                </ng-container>

                <ng-container matColumnDef="key">
                  <th mat-header-cell *matHeaderCellDef>Key</th>
                  <td mat-cell *matCellDef="let element">
                    {{ element.uniqueKey }}
                  </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let element">
                    <button
                      (click)="editKey(element)"
                      mat-icon-button
                      color="warn"
                      aria-label="Example icon button with a heart icon"
                    >
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button
                      [disabled]="!user"
                      (click)="deleteKey(element)"
                      mat-icon-button
                      color="warn"
                      aria-label="Example icon button with a heart icon"
                    >
                      <mat-icon>delete</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr
                  mat-row
                  *matRowDef="let row; columns: displayedColumns"
                ></tr>
              </table>
            </mat-tab>
            <mat-tab label="Configuration"> </mat-tab>
          </mat-tab-group>
        </div>
      </mat-drawer-container>
    </div>
  `,
  styles: [
    `
      .example-spacer {
        flex: 1 1 auto;
      }

      .mat-drawer-container {
        height: 100vh;
      }

      .cb {
        margin-right: 10px;
      }

      #form {
        display: flex;
        flex-direction: column;
        padding: 10px;
      }

      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        border-radius: 50px;
        color: white;
        background-color: blue;
        padding: 4px;
      }
      .profile {
        display: flex;
      }
    `,
  ],
})
export class CoreComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  private apiService = inject(ApiServiceService);
  private sse = inject(SseServiceService);
  private router = inject(Router);
  dataSource = signal<TranslationItem[]>([]);
  filteredDataSource = signal<TranslationItem[]>([]);
  app!: string;
  component!: string;
  key!: string;
  en!: string;
  de!: string;
  rs!: string;
  description!: string;
  displayedColumns: string[] = [];

  user: any;

  id!: string;

  editMode!: boolean;

  options = [
    { value: 'COMMON', viewValue: 'COMMON' },
    { value: 'ISMS', viewValue: 'ISMS' },
    { value: 'BCMS', viewValue: 'BCMS' },
    { value: 'IAM', viewValue: 'IAM' },
  ];

  components = [
    { value: 'GENERAL', viewValue: 'General' },
    { value: 'TAB', viewValue: 'Tab' },
    { value: 'MODAL', viewValue: 'Modal' },
    { value: 'FORM', viewValue: 'Form' },
  ];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    const ls = localStorage.getItem('user');
    this.user = ls ? JSON.parse(ls) : null;

    this.apiService.getAllTasks().subscribe((r: TranslationItem[]) => {
      this.dataSource.set(r);

      this.displayedColumns = [
        'en',
        'de',
        'rs',
        'key',
        'description',
        'actions',
      ];
    });
    // this.sse.connect().subscribe((data) => {
    //    this.dataSource.push(data);
    // });
  }
  showFiller = false;

  animal!: string;
  name!: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  editKey(element: any) {
    this.editMode = true;
    this.id = element.id;
    this.drawer.toggle();
    this.app = element.app;
    this.component = element.component;
    this.key = element.key;
    this.en = element.en;
    this.de = element.de;
    this.rs = element.rs;
    this.description = element.description;
  }

  deleteKey(element: any) {
    this.apiService.deleteItem(element.id).subscribe({
      next: (v) => {
        this.dataSource.update((items: TranslationItem[]) =>
          items.filter((item: any) => item.id !== element.id)
        );
        this._snackBar.open('Deleted', 'close');
      },
      error: (e) => {
        this._snackBar.open(e.error.message, 'close');
      },
      complete: () => console.info('complete'),
    });
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }

  addKey() {
    this.editMode = false;
    this.drawer.toggle();
  }

  selectFilter($event: any) {
    this.apiService.getAllTasks($event.value).subscribe((r) => {
      this.filteredDataSource.set(r);
    });
  }

  addTask() {
    if (this.editMode) {
      this.apiService
        .updateTranslationObj(this.id, {
          id: this.id,
          app: this.app,
          component: this.component,
          key: this.key,
          en: this.en,
          de: this.de,
          rs: this.rs,
          uniqueKey: `${this.app}_${this.component}_${this.key}`,
          description: this.description,
        })
        .subscribe({
          next: (element) => {
            this.dataSource.update((items: TranslationItem[]) => {
              return items.map((item: any) => {
                if (item.id === this.id) {
                  return element;
                } else {
                  return item;
                }
              });
            });
            this._snackBar.open('Updated', 'close');
            this.editMode = false;
          },
          error: (e) => {
            this._snackBar.open(e.error.message, 'close');
          },
          complete: () => {},
        });
    } else {
      this.apiService
        .createSingleTask({
          app: this.app,
          component: this.component,
          key: this.key,
          en: this.en,
          de: this.de,
          rs: this.rs,
          uniqueKey: `${this.app}_${this.component}_${this.key}`,
          description: this.description,
        })
        .subscribe({
          next: (ti: TranslationItem) => {
            this.dataSource.set([...this.dataSource(), ti]);
            this.drawer.toggle();
            this._snackBar.open('Created', 'close');
          },
          error: (e) => {
            this._snackBar.open(e.error.message, 'close');
          },
          complete: () => {},
        });
    }
  }
}
