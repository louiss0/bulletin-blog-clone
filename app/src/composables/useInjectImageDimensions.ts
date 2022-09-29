import { Ref, watch } from "vue";




export default function useInjectImageDimensions( imageRef:Ref<HTMLImageElement|null>, imageSrc:string) {

const imageWrapper = new Image();

imageWrapper.src = imageSrc;

watch(imageRef, (image) => {
  if (image) {
    imageWrapper.onload = (event) => {
      if (event.target instanceof HTMLImageElement) {
        image.src = event.target.src;
        image.width = event.target.naturalWidth;
        image.height = event.target.naturalHeight;
      }
    };
  }
});

return imageWrapper;

}