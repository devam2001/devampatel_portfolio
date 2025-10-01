import { $ } from './utils.js';

export function initResume(){

    const DEFAULT_ID = "1Aml3ASuLJz9I979sLEAKHSkWPr9Iz7yH";
  
    function extractDriveId(linkOrId) {
      if (!linkOrId) return null;
      if (!linkOrId.includes('/')) return linkOrId;
      const patterns = [
        /\/d\/([a-zA-Z0-9_-]{10,})/,                // /d/FILE_ID/
        /id=([a-zA-Z0-9_-]{10,})/,                  // id=FILE_ID
        /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{10,})/,
        /drive\.google\.com\/open\?id=([^\&]+)/,
      ];
      for (const rx of patterns) {
        const m = linkOrId.match(rx);
        if (m && m[1]) return m[1];
      }
      return null;
    }
  
    function openResume(e){
      const btn = e.currentTarget;
      const src = btn?.dataset?.driveLink || btn?.getAttribute('href') || '';
      const id = extractDriveId(src) || DEFAULT_ID;
      const previewUrl = `https://drive.google.com/file/d/${id}/preview`;
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${id}`;
  
      // Normal click: open Drive preview in new tab.
      // Ctrl/Cmd+click (or Meta/Ctrl) -> attempt direct download.
      if (e.ctrlKey || e.metaKey) {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.setAttribute('download','');
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        window.open(previewUrl, '_blank', 'noopener');
      }
    }
  
    $('#resumeBtn')?.addEventListener('click', openResume);
    $('#resumeBtn2')?.addEventListener('click', openResume);
}