import {
  encodeText,
  toastNotification,
  changeStyles,
} from './utils/helpers.js';

document
  .getElementById('encrypt')
  .addEventListener('click', encodeTextThroughButtonTarget);
document
  .getElementById('desencrypt')
  .addEventListener('click', encodeTextThroughButtonTarget);
document.getElementById('copy').addEventListener('click', copy);
const input = document.getElementById('textArea');
const textResult = document.getElementById('messageEncrypt');

/* A self-invoking function that checks if there is a value stored in the browser's `localStorage`
under the key 'text'. If there is a value, it sets the text content of the `textResult` element to
that value and changes the styles of the element using the `changeStyles` function. This allows the
user to see the last encoded message even after refreshing the page. */
(function () {
  const text = localStorage.getItem('text');
  if (text) {
    changeStyles(true);
    textResult.textContent = text;
  }
})();

/**
 * The function encodes text input based on a specified type.
 */
function encodeTextThroughButtonTarget({ target: { id: type } }) {
  if (!checkEmpty(input.value)) {
    let messageEncrypt = input.value.toLowerCase();
    showTextResult(encodeText(messageEncrypt, type));
  }
}

/**
 * This function copies the text in the "textResult" variable to the clipboard and displays a
 * notification.
 */
function copy() {
  textResult &&
    navigator.clipboard.writeText(textResult.textContent).then(() => {
      toastNotification('Texto copiado en portapapeles✌️!');
      changeCopyBtnStyles();
      localStorage.removeItem('text');
    });
}

/**
 * The function changes the styles of two elements and then reverts them after a set time.
 */
const changeCopyBtnStyles = () => {
  document.getElementById('copy-text').classList.add('hidden-content');
  document.getElementById('checked').classList.remove('hidden-content');
  setTimeout(() => {
    changeStyles(false);
    document.getElementById('copy-text').classList.remove('hidden-content');
    document.getElementById('checked').classList.add('hidden-content');
  }, 2500);
};

/**
 * The function checks if a value is empty and displays a notification if it is.
 */
const checkEmpty = (value) => {
  if (!value) {
    toastNotification('Debe añadir un texto');
    return true;
  }
  return false;
};

/**
 * The function sets a given text in the local storage and displays it in a text element.
 * @param text Is a string that represents the text to be displayed in the
 * `textResult` element and stored in the browser's `localStorage`.
 */
const showTextResult = (text) => {
  localStorage.setItem('text', text);
  changeStyles(true);
  input.value = '';
  textResult.textContent = text;
};
