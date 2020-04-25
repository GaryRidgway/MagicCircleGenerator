let cbackground = '#333';
let cstroke = '#fafafa';
let cheight = 600;
let cwidth = 600;
let spellName = 'shield';
let spellArr = spellName.split("");
let spellLen = spellName.split("").length;
let drawCycle = [];
let cycleNo = 0;
let progressiveDraw = false;
let atlantean;

function preload() {
  atlantean = loadFont('fonts/Atlantean.ttf');
}

function setup() {
  createCanvas(cwidth, cheight);
  background(cbackground);
  settings();

  // Add Circles.
  drawCycle.push(function(){circle(0, 0, cwidth * 0.83)});
  drawCycle.push(function(){circle(0, 0, cwidth * 0.8)});

  // Add lines.
  let points = [];
  for (let i = 0; i < spellLen * 2; i++) {
    x = cwidth * 0.8 / 2 * cos(i * PI / spellLen);
    y = cwidth * 0.8 / 2 * sin(i * PI / spellLen);
    points.push([x, y]);
  }
  for (let i = 0; i < points.length; i++) {
    drawCycle.push(function(){
      line(
        points[i][0],
        points[i][1],
        points[(i + 3) % (spellLen * 2)][0],
        points[(i + 3) % (spellLen * 2)][1]
      );
    });
  }

  // Add lettered circles.

    drawCycle.push(function() {
      push();
      for (let i = 0; i < spellLen; i++) {
        push();
          rotate(TAU/spellLen * i);
          let smallcw = cwidth * 0.15;
          let innersmallcw = cwidth * 0.12;
          circle(0, ((-cwidth * 0.83 / 2) - (smallcw / 2)) + smallcw, smallcw);
          circle(0, ((-cwidth * 0.83 / 2) - (innersmallcw / 2)) + innersmallcw + (cwidth * 0.015), innersmallcw);

          push();
            textFont(atlantean);
            textSize(cwidth/40);
            textAlign(CENTER, CENTER);
            fill(cstroke);
            text(spellArr[i], 0, ((-cwidth * 0.83 / 2) - (innersmallcw / 2)) + innersmallcw + (cwidth * 0.015));
          pop();
        pop();
      }
      pop();
    });

}

function draw() {
  settings();
  background('rgba(51, 51, 51, 0.05)');
  drawCycle[cycleNo]();
  cycleNo = (cycleNo + 1) % (drawCycle.length);
  if(progressiveDraw) {
    background('rgba(51, 51, 51, 0.05)');
    drawCycle[cycleNo]();
    cycleNo = (cycleNo + 1) % (drawCycle.length);
  } else {
    background('rgba(51, 51, 51, 1)');
    for(let i = 0; i < drawCycle.length; i++) {
      drawCycle[i]();
    }
  }
}

function settings() {
  translate(cwidth / 2, cheight / 2);
  stroke(cstroke);
  strokeWeight(1);
  fill(cbackground);
}
