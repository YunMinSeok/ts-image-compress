"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImageCompress = (imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    const customQuality = 0.8;
    const image = document.createElement("img");
    const resizeImage = yield new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        image.src = URL.createObjectURL(imageFile);
        image.onload = () => __awaiter(void 0, void 0, void 0, function* () {
            yield URL.revokeObjectURL(image.src);
            const canvas = document.createElement("canvas");
            const { width, height } = calcTargetSize(image.width, image.height);
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
            context === null || context === void 0 ? void 0 : context.drawImage(image, 0, 0, width, height);
            context === null || context === void 0 ? void 0 : context.canvas.toBlob((newImageBlob) => {
                if (newImageBlob) {
                    resolve(new File([newImageBlob], imageFile.name));
                }
            }, imageFile.type, customQuality);
        });
    }));
    return resizeImage;
});
const calcTargetSize = (width, height) => {
    if (width > 4000 || height > 4000) {
        return calcTargetSize(width / 10, height / 10);
    }
    else if (width > 800 || height > 800) {
        return calcTargetSize(width / 2, height / 2);
    }
    return { width: width, height: height };
};
exports.default = ImageCompress;
