interface fileType {
    imgFile: File;
}
declare const imageCompress: (imageFile: fileType) => Promise<unknown>;
export default imageCompress;
