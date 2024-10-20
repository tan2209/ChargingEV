import { prop,index, modelOptions, Severity,  } from '@typegoose/typegoose';

@index({ phoneNumber: 1 })
@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})


export class User {
  
}



