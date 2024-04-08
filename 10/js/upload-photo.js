import {uploadedImage} from './slider.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadedImageInput = document.querySelector('.img-upload__input');
const previewImages = document.querySelectorAll('.effects__preview');


 const onUploadFile = () => {
  const file = uploadedImageInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  console.log(file);
  if (matches) {
    uploadedImage.src = URL.createObjectURL(file);
    previewImages.forEach((image) => {
      image.style.backgroundImage = `url(${uploadedImage.src})`;
    });
  }
};

export {onUploadFile, uploadedImageInput}
