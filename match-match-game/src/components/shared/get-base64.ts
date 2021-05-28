export function getBase64(fileInput: HTMLInputElement): Promise<string> | undefined {
  let dataUrl: string;
  if (fileInput.files !== null) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    const promise = new Promise<string>((res) => {
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          dataUrl = reader.result;
        }
        fileInput.files = null;
        res(dataUrl);
      };
    });

    return promise;
  }
  return undefined;
}
