import {AbstractControl, ValidationErrors} from "@angular/forms";

export class DateValidator {
   static validateDate(start: string, end: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate1 = new Date(control.get(start)?.value).getTime()
      const endDate1 = new Date(control.get(end)?.value).getTime()
      if (startDate1 > endDate1) {
        return {validateDate: true}
      }
      return null
    }
  }

}
