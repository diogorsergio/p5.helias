const palette = require('nice-color-palettes');
console.log(palette);

const s = ( sketch ) => { 

	sketch.setup = () => { 
		card = sketch.createCanvas(400, 400);
		sketch.background('white');
		sketch.angleMode(sketch.DEGREES)

		const createGrid = () => {
			const count = 30;
			const points = [];
			c = sketch.width/count;
		
			for (let i = 0; i < count; i++) {
				for (let j = 0; j < count; j++) {
		
					const x = sketch.width / (count * 2) + c * i
					const y = sketch.width / (count * 2) + c * j
		
					points.push({ 
						position: [x, y],
						rotation: sketch.random(0, 360),
						color: ["#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900"],
						scale: sketch.randomGaussian(12, 5)		
					});
					
				}
			}
			return points;
	
		};

		const points = createGrid();

		points.forEach(data => { 
	
			const { 
				position,
				rotation,
				color,
				scale,
			} = data;
			
			const [x,y] = position;
	
			sketch.push();
			sketch.translate(x, y)
			sketch.rotate(rotation)
			sketch.rectMode(sketch.CENTER);
			sketch.fill(sketch.random(color));
			sketch.noStroke();
			sketch.rect(0,0,scale,scale);
			sketch.pop();
	
		})

	};

	sketch.draw = () => { 

	};

};

let mySketch = new p5(s);