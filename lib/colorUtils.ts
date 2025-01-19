export function getBorderColor(backgroundColor: string): string {
    const rgb = parseInt(backgroundColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma < 128 ? '#ffffff' : '#000000';
  }
  
  export function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
  
  export function hexToRgba(hex: string, opacity: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return hex;
  }
  
  export function rgbaToHex(rgba: string): { hex: string; opacity: number } {
    const parts = rgba.match(/^rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?$$$/);
    if (parts) {
      const r = parseInt(parts[1]);
      const g = parseInt(parts[2]);
      const b = parseInt(parts[3]);
      const a = parts[4] ? parseFloat(parts[4]) : 1;
      const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      return { hex, opacity: a };
    }
    return { hex: rgba, opacity: 1 };
  }
  
  