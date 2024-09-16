import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private messageService: MessageService) {}

  handleError(error: any, customMessage: string = 'An error occurred') {
    if (error.status === 404) {
      this.messageService.add({
        severity: 'error',
        summary: 'Not Found',
        detail: customMessage
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: customMessage
      });
    }
  }
}