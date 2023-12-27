import { TPasswordArrayElement } from "../user/user.interface";

export function passwordArrayTracker(
  passwordArr: TPasswordArrayElement[],
  newPasswordToSet: string
) {
  const newPasswordObject: TPasswordArrayElement = {
    password: newPasswordToSet,
    passwordIssuingTime: new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
  };

  passwordArr.push(newPasswordObject);

  if (passwordArr.length > 3) {
    // When the password array length exceeds 3, the oldest password will be removed, and the new password will be pushed
    // Exactly 3 password objects will be stored in this array with the previous two and the current one
    passwordArr.shift();
  }
}
