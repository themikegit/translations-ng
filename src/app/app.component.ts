import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ApiServiceService } from './services/api-service.service';
import { SseServiceService } from './services/sse-service.service';
import { TranslationItem } from './utils/translation-item.interface';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  private apiService = inject(ApiServiceService);
  private sse = inject(SseServiceService);
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

  ngOnInit() {
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
    this.sse.connect().subscribe((data) => {
      // this.dataSource.push(data);
    });
  }
  showFiller = false;

  addKey() {
    this.editMode = false;
    this.drawer.toggle();
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
    this.description = element.rs;
  }

  deleteKey(element: any) {
    this.apiService.deleteItem(element.id).subscribe((r) => {
      this.dataSource.update((items) =>
        items.filter((item: any) => item.id !== element.id)
      );
    });
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
          description: this.description,
        })
        .subscribe((r: TranslationItem) => {
          // this.dataSource.set([...this.dataSource(), r]);
          this.editMode = false;
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
          description: this.description,
        })
        .subscribe((r: TranslationItem) => {
          this.dataSource.set([...this.dataSource(), r]);
        });
    }
    this.drawer.toggle();
  }
}
