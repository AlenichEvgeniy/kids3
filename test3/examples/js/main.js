import test from "./test.js";
import randomInt from "./randomInt.js";


//Create a Pixi Application
let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialiasing: true,
    transparent: false,
    resolution: 1
});

document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0xffffff;

let points, maks, line, buf, state;
export let mouseposition = app.renderer.plugins.interaction.mouse.global;

points = new PIXI.Graphics();
line = new PIXI.Graphics();
maks = new PIXI.Text();

for (let i = 0; i < 5; i++) {

    points[i] = new PIXI.Graphics();
    points[i].beginFill(0x000000);
    points[i].drawCircle(0, 0, 8);
    points[i].endFill();
    points[i].x = randomInt(40, window.innerWidth - 40);
    points[i].y = randomInt(40, window.innerHeight - 40);
    points[0].interactive = true;
    points[0].buttonMode = true;
    app.stage.addChild(points[i]);

    maks[i] = new PIXI.Text(i, {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x000000
    });
    maks[i].x = points[i].x - 7;
    maks[i].y = points[i].y - 33;
    app.stage.addChild(maks[i]);

    line[i] = new PIXI.Graphics();
    line[i].x = points[i].x;
    line[i].y = points[i].y;

}

state = play;

//Start the game loop 
app.ticker.add(delta => gameLoop(delta));

function gameLoop(delta) {

    //Update the current game state:
    state(delta);
}

function play(delta) {

    for (let i = 0; i < 5; i++) {
        if (i != 4) {
            drow(
                points[i],
                points[i + 1], i, line[i]);
        } else {
            drow(
                points[i],
                points[0], i, line[i]);
            state = end;
        }
    }

    function drow(element, element1, i, line) {

        let buferline = new PIXI.Graphics();
        const ondragstart = event => {
            element.data = event.data;
            element.dragging = true;
        };

        const ondragend = event => {
            delete element.data;
            element.dragging = false;
            if ((Math.abs(mouseposition.x - element1.x) < 10 && Math.abs(mouseposition.y - element1.y)) && buf == 0) {
                line.lineStyle(4, 0x000000, 1);
                line.moveTo(0, 0);
                line.lineTo(element1.x - element.x, element1.y - element.y);
                app.stage.addChild(line);
                app.stage.removeChild(buferline);

                element.interactive = false;
                element.buttonMode = false;
                element1.interactive = true;
                element1.buttonMode = true;
            } else {
                app.stage.removeChild(buferline);
            }
        };

        const ondragMove = event => {
            if (element.dragging === true) {
                if (test(element, element1) == true) {

                    buferline.clear();
                    buferline.x = element.x;
                    buferline.y = element.y;
                    buferline.lineStyle(4, 0x000000, 1);
                    buferline.moveTo(0, 0);
                    buferline.lineTo(mouseposition.x - element.x, mouseposition.y - element.y);
                    app.stage.addChild(buferline);
                    buf = 0;
                } else {
                    buferline.clear();
                    element.dragging = false;
                    buf = 1;
                }
            }

        };

        element.on('pointerdown', ondragstart);
        element.on('pointerup', ondragend);
        element.on('pointerupoutside', ondragend);
        element.on('pointermove', ondragMove);

    }

}


function end() {}
