import GifEncoder from "gif-encoder-2";

export class Giffer {
  canvas: any;
  ctx: any;
  fileName: any;
  repeat: any;
  quality: any;
  delay: any;
  gifEncoder: any;
  constructor(
    _canvas: any,
    _ctx: any,
    _fileName: any,
    _repeat: any,
    _quality: any,
    _delay: any
  ) {
    this.canvas = _canvas;
    this.ctx = _ctx;
    this.fileName = _fileName;
    this.repeat = _repeat;
    this.quality = _quality;
    this.delay = _delay;
    this.initGifEncoder();
  }

  initGifEncoder = () => {
    this.gifEncoder = new GifEncoder(this.canvas.width, this.canvas.height);
    this.gifEncoder.setQuality(this.quality);
    this.gifEncoder.setRepeat(this.repeat);
    this.gifEncoder.setDelay(this.delay);
  };

  start = () => {
    console.log("starting");

    this.gifEncoder.start();
  };

  add = () => {
    console.log("adding");

    this.gifEncoder.addFrame(this.ctx);
    console.log("added");
  };

  stop = () => {
    console.log("stopping");

    this.gifEncoder.finish();
    const buffer = this.gifEncoder.out.getData();
    console.log(`Created gif at ${this.fileName}`);
    return buffer;
  };
}
