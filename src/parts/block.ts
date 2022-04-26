
import { MyDisplay } from "../core/myDisplay";
import { Rect } from "../libs/rect";
import { Item } from './item';
import { Color } from "three/src/math/Color";
import { Conf } from "../core/conf";
import { Param } from "../core/param";

// -----------------------------------------
//
// -----------------------------------------
export class Block extends MyDisplay {

  constructor(opt:any) {
    super(opt)

    const selectClassNames:Array<string> = [];
    const posTable:Array<any> = [];
    const sampleImgSize:Rect = new Rect();

    const color:Color = Param.instance.colors[opt.id % (Param.instance.colors.length - 1)];
    const bgColor:Color = new Color(1 - color.r, 1 - color.g, 1 - color.b);

    // 画像解析して選択したとき用のクラスを作っておく
    const img:HTMLImageElement = new Image();
    img.onload = () => {
      const cvs:any = document.createElement('canvas');
      cvs.width = img.width;
      cvs.height = img.height;
      sampleImgSize.width = img.width;
      sampleImgSize.height = cvs.height;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);
      img.style.display = 'none';

      const imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const key = ~~(i / 4)
        const ix = ~~(key % cvs.width)
        const iy = ~~(key / cvs.height)

        if(iy % 4 == 0) {
          let r = data[i + 0] // 0 ~ 255
          let g = data[i + 1] // 0 ~ 255
          let b = data[i + 2] // 0 ~ 255
          const a = data[i + 3] // 0 ~ 255

          // 白だと反映されないので調整
          if(r >= 250 && g >= 250 && b >= 250) {
            r -= 10
            g -= 10
            b -= 10
          }

          let col:Color = color.clone();
          if(a <= 0) col = bgColor.clone();

          const sheets = document.styleSheets
          const sheet = sheets[sheets.length - 1];
          const name = 'col-' + opt.id + '-' + ix + '-' + iy
          sheet.insertRule(
            '.' + name + '::selection { background: ' + col.getStyle() + '; color: #000; }',
            // '.' + name + '::selection { color: ' + col.getStyle() + '; }',
            sheet.cssRules.length
          );
          selectClassNames.push(name);

          posTable.push({
            className:name,
            x:ix,
            y:iy,
            blockId:opt.id,
          })
        }
      }
      console.log(posTable.length);

      const num = posTable.length;
      for(let i = 0; i < num; i++) {
        const item = document.createElement('div');
        this.getEl().append(item);
      }

      new Item({
        blockId:opt.id,
        el:this.getEl(),
        sampleSize:sampleImgSize,
        selectClassName:selectClassNames,
        posTable:posTable,
      })
    }

    // img.src = Conf.instance.PATH_IMG + 'sample-' + (opt.id % 6) + '.png';
    img.src = Conf.instance.PATH_IMG + 'sample-3.png';
  }


  protected _update(): void {
    super._update();
  }
}