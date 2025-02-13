const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width *= 3;
canvas.height *= 3;

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
		let y = Math.random() * canvas.height;
		let vx = Math.random() - 0.5;
		let vy = Math.random() - 0.5;

		particles[i] = new Particle(x, y, vx, vy);
	}
}

generate(20000);

function update() {
	requestAnimationFrame(update);

	if (keys.w) flip = -1;
	else flip = 1;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < particles.length; i++) {
		let p = particles[i];

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
