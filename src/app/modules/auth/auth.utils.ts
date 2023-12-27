export function passwordArrayTracker(
  passwordArr: string[],
  newPasswordToSet: string
) {
  passwordArr.push(newPasswordToSet);

  if (passwordArr.length > 3) {
    // When the password array length exceeds 3, the oldest password will be removed, and the new password will be pushed
    //exactly 3 password will be stored in this array with previous two and current one
    passwordArr.shift();
  }
}
