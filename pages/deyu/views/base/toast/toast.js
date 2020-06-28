import Instance from './instance.js';

let toastInstance;

function getToastInstance () {
  toastInstance = toastInstance || Instance.newInstance();
  return toastInstance;
}

function notice(options) {
  let curInstance = getToastInstance();
  curInstance.show(options);
}

export default {
  info (options) {
    if(typeof options == 'string') { 
      options = {txt:options}
    }
    return notice(options);
  }
}