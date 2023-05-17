/* `This library is used to save files from the browser to the user's device. */
import FileSaver from "file-saver";

import { surpriseMePrompts, bgColors } from '../constants';

export const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  /* This code is checking if the randomly generated prompt is the same as the prompt passed as an
  argument to the function. If they are the same, it recursively calls the `getRandomPrompt`
  function again with the same prompt argument until a different prompt is generated. This ensures
  that the returned prompt is always different from the one passed as an argument. */
  if(randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * bgColors.length);
  const randomColor = bgColors[randomIndex];
  return randomColor;
}

export async function downloadImage(_id, photo) {
  /* Using the `FileSaver` library to save the `photo` file as a JPEG image with the filename
  `download-.jpg`. The `_id` variable is used to create a unique filename for each downloaded
  image. */
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}