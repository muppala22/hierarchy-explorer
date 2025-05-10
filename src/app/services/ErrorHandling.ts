// Add error handling service
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any): void {
    let message = 'An error occurred';

    if (error.status === 404) {
      message = 'Resource not found';
    } else if (error.status === 401) {
      message = 'Unauthorized access';
    } else if (error.status === 403) {
      message = 'Access forbidden';
    }

    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
