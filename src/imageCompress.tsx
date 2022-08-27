const imageCompress = async (imageFile: File) => {
  const customQuality = 0.8;

  const image = document.createElement("img");
  return await new Promise(async (resolve) => {
    image.src = URL.createObjectURL(imageFile);
    image.onload = async () => {
      await URL.revokeObjectURL(image.src);
      const canvas = document.createElement("canvas");
      const { width, height } = calcTargetSize(image.width, image.height);
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context?.drawImage(image, 0, 0, width, height);
      context?.canvas.toBlob(
        (newImageBlob) => {
          if (newImageBlob) {
            resolve(new File([newImageBlob], imageFile.name));
          }
        },
        imageFile.type,
        customQuality
      );
    };
  });
};

const calcTargetSize = (
  width: number,
  height: number
): { width: number; height: number } => {
  if (width > 4000 || height > 4000) {
    return calcTargetSize(width / 10, height / 10);
  } else if (width > 800 || height > 800) {
    return calcTargetSize(width / 2, height / 2);
  }
  return { width: width, height: height };
};

export default imageCompress;
