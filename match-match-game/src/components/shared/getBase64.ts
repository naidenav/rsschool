export async function getBase64Image(inputFile: HTMLInputElement):Promise<void> {
  let file: any;
  if (inputFile.files !== null) {
    file = inputFile.files[0];
  }
  var reader = new FileReader();
  reader.onloadend = function() {
    //console.log('RESULT', reader.result);
    return reader.result;

  }
  if (file !==undefined) {
    console.log(typeof reader.readAsDataURL(file));

    //return reader.readAsDataURL(file);
  }
  // if (inputFile.files !== null) {
  //   const file = inputFile.files[0];
  // }
  // const reader = new FileReader();
  // reader.onload = () => {
  //   const img: HTMLImageElement = new Image();
  //   img.src = reader.result;
  //   image.src = reader.result;
  // }
  // reader.readAsDataURL(file);
  // fileInput.value = null;

  // function getBase64Image(url) {
  //   var promise = new Promise(function(resolve, reject) {

  //     var img = new Image();
  //     // To prevent: "Uncaught SecurityError: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported."
  //     img.crossOrigin = "Anonymous";
  //     img.onload = function() {
  //       var canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       var ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);
  //       var dataURL = canvas.toDataURL("image/png");
  //       resolve(dataURL.replace(/^data:image\/(png|jpg|jpeg|pdf);base64,/, ""));
  //     };
  //     img.src = url;
  //   });

  //   return promise;
  // };


  // // CORS (Cross-Origin Resource Sharing) is enabled for Facebook images; but that's not true for
  // // all images out there!
  // // var url = "https://scontent.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/12294845_10153267425828951_7985428593018522641_n.jpg?oh=2bb55736fce035311c3d60a1ca559426&oe=57210504";
  // // var promise = getBase64Image(url);

  // promise.then(function (dataURL) {
  //   console.log(dataURL);
  // });
}

