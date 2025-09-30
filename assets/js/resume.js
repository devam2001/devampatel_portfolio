import { $ } from './utils.js';

export function initResume(){
  function downloadResume(){
    const ID = "1Aml3ASuLJz9I979sLEAKHSkWPr9Iz7yH";
    const url = "https://drive.google.com/file/d/" + ID;
    const a = document.createElement("a");
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  $('#resumeBtn')?.addEventListener('click', downloadResume);
  $('#resumeBtn2')?.addEventListener('click', downloadResume);
}