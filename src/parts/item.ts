
import { MyDisplay } from "../core/myDisplay";
import { Rect } from "../libs/rect";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _blockId:number;
  private _item:Array<any> = [];
  private _posTable:Array<any> = [];
  private _sampleSize:Rect;
  private _speed:number = Util.instance.randomInt(2, 5);

  constructor(opt:{blockId:number, el:HTMLElement, sampleSize:Rect, selectClassName:Array<string>, posTable:Array<any>}) {
    super(opt)

    this._blockId = opt.blockId;
    this._sampleSize = opt.sampleSize;
    // this._selectClassNames = opt.selectClassName;
    this._posTable = opt.posTable;

    const txt = ['triangle', 'circle', 'rect'];
    const baseTxt = txt[this._blockId % 3].split('');
    this.qsAll('div').forEach((val,i) => {
      const txt = baseTxt[i % baseTxt.length].toUpperCase();
      const el = val as HTMLElement;
      el.innerHTML = txt;

      const data = this._posTable[i];
      if(data.x == this._sampleSize.width - 1) {
        el.append(document.createElement('br'))
      }

      el.classList.add(data.className)

      this._item.push({
        el:el,
        posData:data,
        now:data.className,
        cnt:0,
      });
    });
  }


  protected _update(): void {
    super._update();

   // const strW = this.getWidth(this._item[0].el)
    //const w = strW * this._sampleSize.width - strW * 3;
    // Tween.instance.set(this.getEl(), {
    //   width: w + 3,
    // })



    if(this._c % 4 == 0) {
      this._item.forEach((val) => {
        const el:HTMLElement = val.el;
        el.classList.remove(val.now);

        let x = (val.posData.x + val.cnt) % this._sampleSize.width
        let n = 'col-' + val.posData.blockId + '-' + x + '-' + val.posData.y;


        val.now = n;
        el.classList.add(val.now);

        val.cnt += this._speed;
      })
    }
  }
}