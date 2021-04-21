import { FormGroup } from '@angular/forms';

export class ValidationService 
{
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) 
    {
      let config = {
        'required': 'Required',
        'invalidEmailAddress': 'Invalid email address',
        'invalidMobileNumber': 'Invalid mobile number',
        'minlength': `Should be atleast ${validatorValue.requiredLength} characters`,
        'invalidPassword': 'Password must contain atleast 1 digit and minmum length should be 8',
        'passwordNotEqual': 'Password did not match'

      };
  
      return config[validatorName];
    }
  
    static emailValidator(control) 
    {
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) 
      {
        return null;
      } 
      else 
      {
        return { 'invalidEmailAddress': true };
      }
    }

    static mobileValidator(control) 
    {
      if (control.value.match(/^([+]\d{2})?\d{10}$/))
      {
        return null;
      } 
      else 
      {
        return { 'invalidMobileNumber': true };
      }
    }

    static passwordValidator(control) 
    {
      if (control.value.match(/"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/))
      {
        return null;
      } 
      else 
      {
        return { 'invalidPassword': true };
      }
    }

    static cnfPassValidator(group: FormGroup) 
    {
      const password = group.controls.password.value;
      const passwordcnf = group.controls.cnfpassword.value;
      if (password == passwordcnf)
      {
        return null;
      } 
      else 
      {
        return { 'passwordNotEqual': true };
      }
    }

}