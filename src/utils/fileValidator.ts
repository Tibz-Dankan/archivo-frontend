export class FileValidator {
  private file: any;

  constructor(file: any) {
    this.file = file;
    console.log(file);
  }

  private validSize() {
    const validSize = 1024 * 1024 * 50; // 50mb
    if (this.file.size >= validSize) {
      throw new Error("File must be less than 50mb");
    }
    return true;
  }

  isImage() {
    const type = {
      jpeg: "image/jpeg",
      png: "image/png",
      jpg: "image/jpg",
    };
    const isJPEG = type.jpeg === this.file.type;
    const isJPG = type.jpg === this.file.type;
    const isPNG = type.png === this.file.type;

    if (isJPEG || isJPG || isPNG) {
      return this.valid();
    }
    throw new Error(
      "File chosen must be an image of type .png or .jpeg or .jpg"
    );
  }

  valid() {
    return this.validSize();
  }
}
