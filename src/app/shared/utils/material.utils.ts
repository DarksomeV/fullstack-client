import { ElementRef } from '@angular/core';

declare var M

export class MaterialUtils {
  public static toast(message: string) {
    M.toast(({ html: message }))
  }

  public static initializeFloatingButton(element: ElementRef) {
    M.FloatingActionButton.init(element.nativeElement);
  }

  public static updateInputs(): void {
    M.updateTextFields();
  }
}
