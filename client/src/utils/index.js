import { surpriseMePrompts } from '../constants';

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