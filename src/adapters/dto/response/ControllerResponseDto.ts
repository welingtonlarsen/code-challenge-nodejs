import { ValidationError } from "class-validator";

export default class ControllerResponseDto<T> {
  constructor(readonly errors?: ValidationError[], readonly responseBody?: T) {}

  static ofErrors(type: any, errors?: ValidationError[]) {
    return new ControllerResponseDto<typeof type>(errors, undefined)
  }

  static ofSuccess(responseBody: any) {
    return new ControllerResponseDto<typeof responseBody>(undefined, responseBody)
  }
}
