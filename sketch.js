const palettes = require('nice-color-palettes/1000');

const s = ( sketch ) => {

	let sX = 0.5
	let vH = 0.5
	let randomPalette = sketch.random(palettes)

	sketch.randomizeSeed = () => { 
		let theseed = sketch.int(sketch.random(0,10000));
		sketch.randomSeed(theseed);
		sketch.noiseSeed(theseed);
		sketch.random(theseed)
	}

	sketch.randomizePoints = () => { 	
		vH = sketch.random(0.4, 0.9)
	}

	sketch.randomizePalette = () => {
		randomPalette = sketch.random(palettes);
	}

	sketch.randomizeScale = () => { 
		sX = sketch.random()
	}

	// Start of Setup   
	sketch.setup = () => { 

		card = sketch.createCanvas(1600, 1600);
		sketch.background(sketch.random(randomPalette));
		sketch.circles()

		card.parent('sketch-box');
	}

	sketch.reloadSketch = () => {
		sketch.circles()
	}

	// Start of Circles  
	sketch.circles = () => { 
	
		// Create grid system
		const createGrid = () => { 
			let points = [];
			const count = 6 / sX;
	
			for (let x = 0; x < count; x++){ 
				for (let y = 0; y < count; y++){ 
					let u = count <= 1 ? 0.5 : x / (count - 1);
					let v = count <= 1 ? 0.5 : y / (count - 1);

					u = u += sketch.random(-0.02, 0.02)
					v = v += sketch.random(-0.02, 0.02)
	
					points.push({
						position: [u, v],
					});
				}
			}
			return points;
			
		};
		// End of creat grid system
			
		// Randomize grid 
		const points = createGrid().filter(() => sketch.random() > vH);

		// Setup Margin
		const margin = 10;

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
			let zoff = 0;

			for (let i = 0; i < 3; i+=1) {
				sketch.push();
				sketch.stroke(sketch.random(randomPalette));
				sketch.translate(x,y)
				sketch.rotate(sketch.random(360))
				sketch.fill(sketch.random(randomPalette))
				sketch.beginShape();
				for (let a = 0; a < sketch.TWO_PI; a+=0.1) { 
					let xoff = sketch.map(sketch.cos(a), -1, 1, 0, noiseMax);
					let yoff = sketch.map(sketch.cos(a), -1, 1, 0, noiseMax);
					let r = sketch.map(sketch.noise(xoff, yoff, zoff), 0, 1, 200 * sX, 300 * sX);
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
				sketch.rotate(sketch.random(360))
				sketch.fill(sketch.random(randomPalette))
				sketch.beginShape();
				for (let a = 0; a < sketch.TWO_PI; a+=0.1) { 
					let xoff = sketch.map(sketch.cos(a), -1, 1, 0, noiseMax);
					let yoff = sketch.map(sketch.cos(a), -1, 1, 0, noiseMax);
					let r = sketch.map(sketch.noise(xoff, yoff, zoff), 0, 1, 100 * sX, 150 * sX);
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

	let counter = 1;
	// Shortcuts
	sketch.keyPressed = () => {
		if (sketch.keyIsDown(80)) {  // P - Random Palette
			sketch.randomizePalette();
			sketch.setup();
		} else if (sketch.keyIsDown(79)) { // O - Cycle Palette
			sketch.randomizeSeed();
			sketch.setup();
		} else if (sketch.keyIsDown(76)) { // L - Increase Points
			vH += 0.05
			console.log('Visibility:'+vH)
			sketch.setup();
		} else if (sketch.keyIsDown(75)) { // K - Decrease Points
			vH -= 0.05
			console.log('Visibility:'+vH)
			sketch.setup();
		} else if (sketch.keyIsDown(85)) { // U - Random Scale
			sX = sketch.random()
			sketch.setup();
		} else if (sketch.keyIsDown(74)) { // J - Increase Scale
			sX += 0.05
			console.log('Scale:'+sX)
			sketch.setup();
		} else if (sketch.keyIsDown(72)) { // H - Decrease Scale
			sX -= 0.05
			console.log('Scale:'+sX)
			sketch.setup();
		} else if (sketch.keyIsDown(82)) { // R - Randomize All
			sketch.randomizePalette();
			sketch.randomizePoints();
			sketch.randomizeScale();
			sketch.setup();
		} else if (sketch.keyIsDown(83)) { // S - Save Canvas
			sketch.saveCanvas(card, 'Circles'+counter, 'png')
			counter += 1;
		}
	}


	
};

let mySketch = new p5(s);