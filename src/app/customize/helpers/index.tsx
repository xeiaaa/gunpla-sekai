export const handleSaveImage = async (modelViewerRef: any) => {
  const blob = await modelViewerRef?.current?.toBlob({
    mimeType: "image/webp",
  });

  if (!blob) return;

  const a = document.createElement("a");
  a.style.display = "none";
  document.body.append(a);

  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = "sazabi.webp";
  a.click();
};

export const invertColor = (hex: string) => {
  hex = hex.replace(/^#/, "");

  let rNum = parseInt(hex.slice(0, 2), 16);
  let gNum = parseInt(hex.slice(2, 4), 16);
  let bNum = parseInt(hex.slice(4, 6), 16);

  // Invert each channel
  const brightness = (0.299 * rNum + 0.587 * gNum + 0.114 * bNum) / 255;

  return brightness > 0.5 ? "#000000" : "#FFFFFF";
};

export const hexToRgba = (hex: string, opacity?: number) => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  let r = parseInt(hex.slice(0, 2), 16) / 255;
  let g = parseInt(hex.slice(2, 4), 16) / 255;
  let b = parseInt(hex.slice(4, 6), 16) / 255;

  // Return the rgba string
  return [r, g, b, opacity || 1];
};