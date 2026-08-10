export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function getCroppedImage(
  imageSrc: string,
  crop: PixelCrop,
  fileName: string,
): Promise<File> {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create image canvas");
  }

  canvas.width = crop.width;
  canvas.height = crop.height;

  context.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Could not create cropped image"));
        }
      },
      "image/jpeg",
      0.9,
    );
  });

  return new File([blob], fileName, {
    type: "image/jpeg",
  });
}

function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load image"));

    image.src = src;
  });
}
