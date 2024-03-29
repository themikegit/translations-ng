import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { SseServiceService } from './sse-service.service';
import { Observable } from 'rxjs';
import { TranslationItem } from '../utils/translation-item.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient, private sse: SseServiceService) {
    if (isDevMode()) {
      console.log('running in DEV');
    } else {
      console.log('running in PROD');
    }
  }

  getAllTasks(query?: string) {
    let params;
    if (query) {
      params = new HttpParams().set('missing', query);
    }
    return this.http.get<TranslationItem[]>(`${environment.apiUrl}/task`, {
      params,
    });
  }

  deleteItem(id: string) {
    return this.http.delete(`${environment.apiUrl}/task/${id}`);
  }

  createSingleTask(body: TranslationItem) {
    return this.http.post<TranslationItem>(`${environment.apiUrl}/task`, body);
  }

  updateTranslationObj(id: string, body: any) {
    return this.http.patch<TranslationItem>(
      `${environment.apiUrl}/task/${id}`,
      body
    );
  }

  signIn(body: { username: string; password: string }) {
    return this.http.post(`${environment.apiUrl}/auth/signin`, body);
  }

  getStructure() {
    return this.http.get(`${environment.apiUrl}/structure`);
  }

  // getServerSideEvent(url: string) {
  //   return new Observable((observer) => {
  //     const evSource = this.sse.getEventSource(url);
  //   });
  // }
}
