const palettes = require('nice-color-palettes/1000');
const {SimplexNoise} = require('simplex-noise');

const s = ( sketch ) => {
	
	sketch.randomSeed();

	const createGrid = () => { 
		const points = [];
		const count = 20;

		const palette = sketch.random(palettes)
		const simplex = new SimplexNoise(sketch.random());


		for (let x = 0; x < count; x++){ 
			for (let y = 0; y < count; y++){ 
				const u = count <= 1 ? 0.5 : x / (count - 1);
				const v = count <= 1 ? 0.5 : y / (count - 1);

				points.push({
					color: sketch.random(palette),
					position: [u, v],
				});
			}
		}
		
		return points;
	};


	sketch.setup = () => { 
		card = sketch.createCanvas(600, 600);
		sketch.background('white');
		
		const points = createGrid().filter(() => sketch.random() > 0.5);
		const margin = 20;

		points.forEach(data => {

			const {
				position,
				color,
			} = data;

			const [ u, v ] = position;
			const x = sketch.lerp(margin, sketch.width - margin, u);
			const y = sketch.lerp(margin, sketch.height - margin, v);

			sketch.strokeWeight(4)			
			sketch.ellipse(x,y,20,20)



		});
	};

	sketch.draw = () => { 

	};

};

let mySketch = new p5(s);