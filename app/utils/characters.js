/*
 * CHARACTERS UTILS
 */
export function validateCharacter(list, name) {
  if(name) {
    toastr.info('Checking character is valid');
    if(list.indexOf(name) != -1) {
      toastr.success('Character valid');
      return name;
    } else {
      toastr.error('Character invalid');
    }
  }
  return null;
}