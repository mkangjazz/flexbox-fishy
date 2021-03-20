export default function focusFirstEnabledInput(form) {
  try {
    form.querySelectorAll('input[type="text"]:not([disabled])')[0].focus();
  } catch(e) {
    console.log('caught exception', e);
  }  
};
