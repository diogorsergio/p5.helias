const palettes = require('nice-color-palettes/1000');
const {SimplexNoise} = require('simplex-noise');

const s = ( sketch ) => {
	
	sketch.randomSeed();

	const createGrid = () => { 
		const points = [];
		const count = 60;

		const palette = sketch.random(palettes)
		const simplex = new SimplexNoise(sketch.random());


		for (let x = 0; x < count; x++){ 
			for (let y = 0; y < count; y++){ 
				const u = count <= 1 ? 0.5 : x / (count - 1);
				const v = count <= 1 ? 0.5 : y / (count - 1);

				zoom = .6; 
				factor = 200;

				const scale1 = Math.abs(simplex.noise2D(u * zoom,v * zoom)) * factor
				const scale2 = Math.abs(simplex.noise2D(u * zoom,v * zoom)) * factor / sketch.random(1,3)
				const scale3 = Math.abs(sketch.randomGaussian(1,3))

				points.push({
					color1: sketch.random(palette),
					color2: sketch.random(palette),
					rotation: simplex.noise2D(u,v) * 50,
					position: [u, v],
					scale1,
					scale2,
					scale3
				});
			}
		}
		return points;
	};


	sketch.setup = () => { 
		card = sketch.createCanvas(1600, 1600);
		sketch.background('white');
		
		const points = createGrid().filter(() => sketch.random() > 0.5);
		const margin = 100;

		points.forEach(data => {

			const {
				color1,
				color2,
				rotation,
				position,
				scale1,
				scale2,
				scale3,
			} = data;

			const [ u, v ] = position;
			const x = sketch.lerp(margin, sketch.width - margin, u);
			const y = sketch.lerp(margin, sketch.height - margin, v);

			sketch.fill(color1)
			sketch.ellipse(x,y,scale1,scale1)

			sketch.noStroke();
			sketch.fill(color2)
			sketch.ellipse(x,y,scale2,scale2)

			sketch.push();
			sketch.translate(x,y)
			sketch.rotate(rotation)
			sketch.textSize(scale2/3)
			sketch.textAlign(sketch.CENTER, sketch.CENTER);
			sketch.fill(color1)
			sketch.textSize(scale2/2)
			sketch.text('×', 0,0)
			sketch.pop();

		});
	};

	sketch.draw = () => { 

	};

};

let mySketch = new p5(s);