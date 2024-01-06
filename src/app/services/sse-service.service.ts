import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseServiceService {
  private eventSource!: EventSource;
  private messageSubject = new Subject<any>();

  constructor() {}

  connect(): Observable<any> {
    this.eventSource = new EventSource('http://localhost:3000/sse');

    this.eventSource.onmessage = (event) => {
      /// const eventData = JSON.parse(event.data);
      this.messageSubject.next(event);
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
    };

    return this.messageSubject.asObservable();
  }

  closeConnection() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
