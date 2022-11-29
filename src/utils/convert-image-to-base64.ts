export async function convertImageToBase64(url: string) {
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        // Read the Blob as DataURL using the FileReader API
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
          // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...
        };
        reader.readAsDataURL(blob);
      });
  });
}
