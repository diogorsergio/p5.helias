const palettes = require('nice-color-palettes/1000');

const s = ( sketch ) => {

	let theseed = sketch.int(sketch.random(0,10000));
	sketch.randomSeed(theseed);
	sketch.noiseSeed(theseed);
	console.log('Seed:'+theseed)

	sketch.randomizePoints = () => { 	
		theseed = sketch.int(sketch.random(0,10000));
		sketch.randomSeed(theseed);
		sketch.noiseSeed(theseed);
		console.log('Seed:' +theseed)
		sketch.setup();
	}

	let randomPalette = sketch.random(palettes)
	console.log(randomPalette)

	sketch.randomizePalette = () => {
		randomPalette = sketch.random(palettes);
		theseed = sketch.int(sketch.random(0,10000));
		sketch.randomSeed(theseed);
		sketch.noiseSeed(theseed);
		sketch.setup();
	}

	// Start of Setup   
	sketch.setup = () => { 
		card = sketch.createCanvas(1600, 1600);
		sketch.background(sketch.random(randomPalette));
		sketch.circles()
	}
	// End of Setup   


	// Start of Circles  
	sketch.circles = () => { 
	
		// Create grid system
		const createGrid = () => { 
			const points = [];
			const count = 10;
	
			for (let x = 0; x < count; x++){ 
				for (let y = 0; y < count; y++){ 
					const u = count <= 1 ? 0.5 : x / (count - 1);
					const v = count <= 1 ? 0.5 : y / (count - 1);
	
					points.push({
						position: [u, v],
					});
				}
			}
			return points;
			
		};
		// End of creat grid system
			
		// Randomize grid 
		const points = createGrid().filter(() => sketch.random() > 0.5);

		// Setup Margin
		const margin = 20;

		// Drawing Start
		points.forEach(data => {
			const {
				position,
			} = data;

			sketch.shuffle(points, true)
			const [ u, v ] = position;
			const x = sketch.lerp(margin, sketch.width - margin, u);
			const y = sketch.lerp(margin, sketch.height - margin, v);

			let noiseMax = 0.8;
			let yoof = 0
			let xoff = 0
			let zoff = 0;

			for (let i = 0; i < 3; i+=1) {
				sketch.push();
				sketch.stroke(sketch.random(randomPalette));
				sketch.translate(x,y)
				sketch.fill(sketch.random(randomPalette))
				sketch.beginShape();
				for (let a = 0; a < sketch.TWO_PI; a+=0.1) { 
					let xoff = sketch.map(sketch.cos(a), -1, 1, 0, noiseMax);
					let yoff = sketch.map(sketch.cos(a), -1, 1, 0, noiseMax);
					let r = sketch.map(sketch.noise(xoff, yoff, zoff), 0, 1, 200, 300);
					let x = r * sketch.cos(a);
					let y = r * sketch.sin(a);
					sketch.vertex(x,y)
				}
				sketch.endShape(sketch.CLOSE);
				zoff += 1
				sketch.pop();
			}

			for (let i = 0; i < 3; i+=1) {
				sketch.push();
				sketch.stroke(sketch.random(randomPalette));
				sketch.translate(x,y)
				sketch.fill(sketch.random(randomPalette))
				sketch.beginShape();
				for (let a = 0; a < sketch.TWO_PI; a+=0.1) { 
					let xoff = sketch.map(sketch.cos(a), -1, 1, 0, noiseMax);
					let yoff = sketch.map(sketch.cos(a), -1, 1, 0, noiseMax);
					let r = sketch.map(sketch.noise(xoff, yoff, zoff), 0, 1, 100, 200);
					let x = r * sketch.cos(a);
					let y = r * sketch.sin(a);
					sketch.vertex(x,y)
				}
				sketch.endShape(sketch.CLOSE);
				zoff += 1
				sketch.pop();
			} 
		});
		// Drawing Start

	};
	// End of Circles   

	sketch.draw = () => { 

	};

	// Shortcuts
	sketch.keyPressed = () => { 
		if (sketch.keyIsDown(83)) { 
			sketch.saveCanvas(card, 'Circles'+theseed, 'png');
		} else if (sketch.keyIsDown(79)) { 
			sketch.randomizePoints();
		} else if (sketch.keyIsDown(78)) { 
			sketch.exportN();
		} else if (sketch.keyIsDown(80)) { 
			sketch.randomizePalette();
		} else if (sketch.keyIsDown(77)) { 
			sketch.exportM();
		}
	}

	// Export Both Random
	sketch.exportM = () => { 
		for (let i = 0; i < 10; i+=1) { 
			sketch.randomizePoints();
			sketch.randomizePalette();
			sketch.saveCanvas(card, 'Circles'+theseed, 'png');
		}
	}

	// Export Current Palette
	sketch.exportN = () => { 
		for (let i = 0; i < 10; i+=1) { 
			sketch.randomizePoints();
			sketch.saveCanvas(card, 'Circles'+theseed, 'png');
		}
	}

	
};

let mySketch = new p5(s);