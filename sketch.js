const palette = require('nice-color-palettes');
console.log(palette);

function setup() {
	card = createCanvas(400, 400);
	background('white');
	angleMode(DEGREES)
	
	const createGrid = () => {
		const count = 20;
		const points = [];
		c = width/count;
	
		for (let i = 0; i < count; i++) {
			for (let j = 0; j < count; j++) {
	
				const x = width / (count * 2) + c * i
				const y = width / (count * 2) + c * j
	
				points.push({ 
					position: [x, y],
					rotation: random(0, 360),
					color: ["#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900"],
					scale: randomGaussian(12, 5)		
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

		push();
		translate(x, y)
		rotate(rotation)
		rectMode(CENTER);
		fill(random(color));
		noStroke();
		rect(0,0,scale,scale);
		pop();

	})


};

function draw() {

}