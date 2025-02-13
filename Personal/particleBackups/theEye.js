const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width *= 2;
canvas.height *= 1.8;

let keys = {};

let flip = 1;
class Particle {
	constructor(x, y, vx, vy) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
	}

	updatePosition() {
		this.x += this.vx;
		this.y += this.vy;
	}
}

let particles = [];
let cx = canvas.width / 2;
let cy = canvas.height / 2;
let previousX = cx;
let previousY = cy;

function generate(limit) {
	for (let i = 0; i < limit; i++) {
		let x = Math.random() * canvas.width;
		let y = canvas.height / 2;
		let vx = Math.random() - 0.5;
		let vy = Math.random() - 0.5;

		particles[i] = new Particle(x, y, vx, vy);
	}
}

generate(10000);

function update() {
	requestAnimationFrame(update);

	if (keys.w) flip = -1;
	else flip = 1;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < particles.length; i++) {
		let p = particles[i];

		if (i == 0) {
			for (let j = 0; j < 500; j++) {
				p.vx += Math.random() - 0.5;
				p.vy += Math.random() - 0.5;
			}
		}
		let dx = p.x - cx;
		let dy = p.y - cy;
		let dist = Math.sqrt(dx ** 2 + dy ** 2);

		//Alternate direction
		let angMult = Math.sin(performance.now() / 500) < 0 ? 1 : -1;
		let ang = Math.atan2(dy, dx) + (Math.PI / 2) * angMult;

		let rx = Math.cos(ang);
		let ry = Math.sin(ang);

		//Rotate
		p.vx += rx / 50;
		p.vy += ry / 50;

		// pull
		p.vx -= (dx / dist / 20) * flip;
		p.vy -= (dy / dist / 20) * flip;

		// drag
		p.vx *= 0.996;
		p.vy *= 0.996;

		//min distance
		if (dist < 10) {
			p.vx *= 1.3;
			p.vy *= rx;
		}

		if (dist > 200) {
			p.vx *= 0.9;
			p.vy *= 0.9;
		}
		//Scatter on "S"
		if (keys.s) {
			p.vx += Math.random() - 0.5;
			p.vy += Math.random() - 0.5;
		}

		p.updatePosition();

		ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 1, 1);
	}
}

for (let i = 0; i < 100; i++) {
	for (p of particles) {
		p.vx += Math.random() - 0.5;
		p.vy += Math.random() - 0.5;
	}
}

update();

document.addEventListener("keydown", (e) => {
	keys[e.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (e) => {
	keys[e.key.toLowerCase()] = false;
});
