import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SseServiceService } from './sse-service.service';
import { Observable } from 'rxjs';
import { TranslationItem } from '../utils/translation-item.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient, private sse: SseServiceService) {}

  getAllTasks(query?: string) {
    let params;
    if (query) {
      params = new HttpParams().set('missing', query);
    }

    return this.http.get<TranslationItem[]>('http://localhost:3000/task', {
      params,
    });
  }

  deleteItem(id: string) {
    return this.http.delete('http://localhost:3000/task/' + id);
  }

  createSingleTask(body: TranslationItem) {
    return this.http.post<TranslationItem>('http://localhost:3000/task', body);
  }

  updateTranslationObj(id: string, body: any) {
    return this.http.patch<TranslationItem>(
      'http://localhost:3000/task/' + id,
      body
    );
  }

  // getServerSideEvent(url: string) {
  //   return new Observable((observer) => {
  //     const evSource = this.sse.getEventSource(url);
  //   });
  // }
}
