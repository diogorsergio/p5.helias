const palettes = require('nice-color-palettes/1000');
const SimplexNoise = require('simplex-noise');

const s = ( sketch ) => {

	let theseed = 0
	let sCounter = 1

	let sX = 0.5
	let vH = 0.5
	let randomPalette = sketch.random(palettes)
	simplex = new SimplexNoise()

	sketch.simplexSeed = () => { 
		simplex = new SimplexNoise(sketch.random(0,10000))
	}

	sketch.randomizeSeed = () => { 
		theseed = sketch.int(sketch.random(0,10000));
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

					const sZ = sketch.abs(simplex.noise2D(u,v))
	
					points.push({
						sZ,
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
				sZ,
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
					let r = sketch.map(sketch.noise(xoff, yoff, zoff), 0, 1, 200 * sZ, 300 * sZ);
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
					let r = sketch.map(sketch.noise(xoff, yoff, zoff), 0, 1, 100 * sZ, 150 * sZ);
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
			sketch.simplexSeed();
			sketch.randomizeSeed();
			sketch.randomizePalette();
			sketch.setup();
		} else if (sketch.keyIsDown(79)) { // O - Cycle Palette
			sketch.randomizeSeed();
			sketch.simplexSeed();
			sketch.setup();
		} else if (sketch.keyIsDown(76)) { // L - Increase Points
			vH += 0.05
			console.log('Visibility:'+vH)
			sketch.simplexSeed();
			sketch.randomizeSeed();
			sketch.setup();
		} else if (sketch.keyIsDown(75)) { // K - Decrease Points
			vH -= 0.05
			console.log('Visibility:'+vH)
			sketch.simplexSeed();
			sketch.randomizeSeed();
			sketch.setup();
		} else if (sketch.keyIsDown(85)) { // U - Random Scale
			sX = sketch.random()
			sketch.simplexSeed();
			sketch.randomizeSeed();
			sketch.setup();
		} else if (sketch.keyIsDown(74)) { // J - Increase Scale
			sX += 0.05
			console.log('Scale:'+sX)
			sketch.simplexSeed();
			sketch.randomizeSeed();
			sketch.setup();
		} else if (sketch.keyIsDown(72)) { // H - Decrease Scale
			sX -= 0.05
			console.log('Scale:'+sX)
			sketch.simplexSeed();
			sketch.randomizeSeed();
			sketch.setup();
		} else if (sketch.keyIsDown(82)) { // R - Randomize All
			sketch.simplexSeed();
			sketch.randomizeSeed();
			sketch.randomizePalette();
			sketch.randomizePoints();
			sketch.randomizeScale();
			sketch.setup();
		} else if (sketch.keyIsDown(83)) { // S - Save Canvas
			sketch.saveCanvas(card, 'Helias'+counter, 'png')
			counter += 1;
		} else if (sketch.keyIsDown(90)) { // Z - Save 25 Canvas - (U)
			(function myLoop(i) {
				setTimeout(function() {
					sketch.saveCollection();
				  	console.log('Queue Left:'+(i-1));             
				  	if (--i) myLoop(i);
				}, 1000)
			  })(25);  
		}
	}

	sketch.saveCollection = () => { 
		sX = sketch.random()
		sketch.simplexSeed();
		// sketch.randomizeSeed();
		sketch.setup();
		sketch.saveCanvas(card, 'Helias'+theseed+'.'+sCounter, 'png')
		sCounter += 1
	}
	
};

let mySketch = new p5(s);