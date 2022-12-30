export function filterSpace(name = '') {
  return name.replace(/\s+/g, '').replace(/[<>,]/g, '');
}
