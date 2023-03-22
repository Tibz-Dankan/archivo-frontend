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

  size() {
    const kb = 1024;
    const mb = kb * kb;
    const gb = mb * mb;
    const size = this.file.size;

    if (size < kb) {
      return `${size} byte(s)`;
    }
    if (size < mb) {
      return `${Math.floor(size / kb)} kb`;
    }
    if (size < gb) {
      return `${Math.floor(size / mb)} mb`;
    }
    if (size > gb) {
      return `${Math.floor(size / gb)} gb`;
    }
  }

  private image() {
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
  }

  isImage() {
    if (!this.image()) return false;
    return true;
  }

  mustBeImage() {
    if (!this.image()) {
      throw new Error(
        "File chosen must be an image of type .png or .jpeg or .jpg"
      );
    }
    return true;
  }

  valid() {
    return this.validSize();
  }
}
