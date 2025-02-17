export class Text {
    constructor(){
        this.canvas = document.createElement('canvas');
       // this.canvas.style.position = 'absolute';
       // this.canvas.style.left = '0';
       // this.canvas.style.top = '0';
       // document.body.appendChild(this.canvas);
  
      // willReadFrequently 속성 추가
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    }
  
    setText(str, density, stageWidth, stageHeight) {
        this. canvas.width =stageWidth;
        this. canvas.height = stageHeight;

        const myText = str;
        const fontWidth = 600;
        //const fontSize = 600;
        const fontSize = 700;
        const fontName = 'Hind';

        this.ctx.clearRect(0,0,stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = `rgba(0,0,0,0.5)`;
        this.ctx.textBaseline =`middle`;
        const fontPos =this.ctx.measureText(myText);
        this.ctx.fillText(
            myText,
            (stageWidth -fontPos.width) /2,
            fontPos.actualBoundingBoxAscent +
            fontPos.actualBoundingBoxDescent +
            ((stageHeight-fontSize)/2)
        ) ;

        return this.dotPos(density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight) {
        // 빈번한 픽셀 데이터 읽기를 위한 최적화
        const imageData = this.ctx.getImageData(
            0, 0,
            stageWidth, stageHeight
        ).data;

        const particles = [];
        let i = 0;
        let width = 0;
        let pixel;

        for (let height = 0; height < stageHeight; height += density) {
            ++i;
            const slide = (i %2) == 0;
            width = 0;
            if (slide == 1){
                width += 6;
            }

            for (width; width < stageWidth; width +=density){
                pixel = imageData[((width + (height*stageWidth))*4)-1];
                if (pixel !=0 &&
                    width>0 &&
                    width< stageWidth &&
                    height > 0 &&
                    height < stageHeight)  {
                        particles.push({
                            x:width,
                            y:height,
                        });
                    }
            
            }
        }

        return particles;
    }
}
