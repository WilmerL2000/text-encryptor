const boxContent = document.getElementById('box-content');
const textBox = document.getElementById('text-box');
const messageBox = document.getElementById('message-box');
const keysEncrypt = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
};

/**
 * The function encodes or decodes text using a set of key-value pairs.
 * @param text - The text that needs to be encoded or decoded.
 * @param type - The `type` parameter is a string that specifies whether the text should be encrypted
 * or decrypted.
 * @returns Returns the encoded or decoded value of the input text based on the `type` parameter.
 */
export const encodeText = (text, type) => {
  for (const key in keysEncrypt) {
    if (type === 'encrypt') {
      const regex = new RegExp(key, 'g');
      text = text.replace(regex, keysEncrypt[key]);
    } else {
      const regex = new RegExp(keysEncrypt[key], 'g');
      text = text.replace(regex, key);
    }
  }
  return text;
};

/**
 * The function creates a toast notification with a given message
 */
export const toastNotification = (message) => {
  Toastify({
    text: message,
    duration: 2500,
  }).showToast();
};

/**
 * The function changes the styles of certain elements based on a given option.
 * @param option - The parameter `option` is a boolean value that determines whether to change the
 * styles of the elements to show the text or the encrypted message.
 */
export const changeStyles = (option) => {
  if (option) {
    boxContent.classList.remove('message-container');
    textBox.classList.remove('hidden-content');
    messageBox.classList.remove('message-content');

    boxContent.classList.add('text-container');
    textBox.classList.add('text-encrypt');
    messageBox.classList.add('hidden-content');
  } else {
    boxContent.classList.add('message-container');
    textBox.classList.add('hidden-content');
    messageBox.classList.add('message-content');

    boxContent.classList.remove('text-container');
    textBox.classList.remove('text-encrypt');
    messageBox.classList.remove('hidden-content');
  }
};
