import './style.css'
import { Block } from './parts/block';
import { Color } from "three/src/math/Color";
import { Util } from './libs/util';
import { Param } from './core/param';
import { HSL } from './libs/hsl';

const line = 10;
const num = line * line;

for(let i = 0; i < num * 0.75; i++) {
  const hsl = new HSL();
  hsl.h = Util.instance.map(i, 0, 1, 0, 200);
  hsl.s = 1;
  hsl.l = 0.5;

  let col = new Color();
  col = col.setHSL(hsl.h, hsl.s, hsl.l);
  Param.instance.colors.push(col);
}

const wrapper:HTMLElement = document.querySelector('.l-main-wrapper') as HTMLElement;

for(let i = 0; i < num; i++) {
  const el = document.createElement('div');
  el.classList.add('l-main');
  el.classList.add('js-block');
  wrapper.append(el);
}

document.querySelectorAll('.js-block').forEach((val,i) => {
  new Block({
    el:val,
    id:i
  })
});



