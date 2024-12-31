class ApiError extends Error {
  constructor(
    StatusCode, 
    message = "Somthing went wrong", 
    errors = [],
    Stack = ""
) {
  super(message);
  this.StatusCode = StatusCode
  this.data = null
  // this.message = message
  this.errors = errors
  this.success = false
  if(Stack){
  this.stack = Stack
  } else {
  Error.captureStackTrace(this, this.constructor)
}
}
}


export {ApiError}
