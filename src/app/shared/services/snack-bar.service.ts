import { inject, Injectable, signal } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  public message = signal('');

  private _snackBar = inject(MatSnackBar);

  public durationInMilliseconds = 3000;

  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';

  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  public showSnackBar(
    message: string,
    duration: number,
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition
  ): void {
    this.message.set(message);
    this.durationInMilliseconds = duration;
    this.horizontalPosition = horizontalPosition;
    this.verticalPosition = verticalPosition;

    this._openSnackBar();
  }

  public _openSnackBar(): void {
    this._snackBar.open(this.message(), '❌', {
      duration: this.durationInMilliseconds,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
