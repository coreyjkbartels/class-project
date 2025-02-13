const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width *= 2;
canvas.height *= 2;

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

function generate(limit) {
	for (let i = 0; i < limit; i++) {
		let x = Math.random() * canvas.width;
		let y = Math.random() * canvas.height;
		let vx = Math.random() - 0.5;
		let vy = Math.random() - 0.5;

		particles[i] = new Particle(x, y, vx, vy);
	}
}

generate(6000);

function update() {
	requestAnimationFrame(update);

	if (keys.w) flip = -1;
	else flip = 1;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < particles.length; i++) {
		let p = particles[i];
		let dx = p.x - canvas.width / 2;
		let dy = p.y - canvas.height / 2;
		let dist = Math.sqrt(dx ** 2 + dy ** 2);

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

		//Scatter on "S"
		if (keys.s) {
			p.vx += Math.random() - 0.5;
			p.vy += Math.random() - 0.5;
		}

		p.updatePosition();
		ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 1, 1);
	}
}

update();

document.addEventListener("keydown", (e) => {
	keys[e.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (e) => {
	keys[e.key.toLowerCase()] = false;
});
