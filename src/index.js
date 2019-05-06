import Application from './Application'
import Scene from './Scene'
import Tween from './Tween'

import * as Pixi from 'pixi.js'
import { Howl, Howler } from 'howler'

class SoundButton extends Pixi.Sprite {
	constructor (imageSrc, audioMP3, audioOGG) {
		super(Pixi.Sprite.from(imageSrc).texture)

		this.sound = new Howl({
			src: [audioMP3, audioOGG]
		})

		this.interactive = true
		this.buttonMode = true
		this.byTint = 0xffffff

		this.on('pointerupuoutside', (...args) => this.pointerUpuOutsideHandler(...args))
		this.on('pointermove', (...args) => this.pointerMoveHandler(...args))
		this.on('pointerdown', (...args) => this.pointerDownHandler(...args))
		this.on('pointerup', (...args) => this.pointerUpHandler(...args))
		this.on('mouseover', (...args) => this.mouseOverHandler(...args))
		this.on('mouseout', (...args) => this.mouseOutHandler(...args))
	}

	pointerDownHandler (event) {
		this.sound.play()
		Tween.create({
			targets: [this],
			duration: 1000,
			properties: {
				scale: {
					x: this.scale.x * -1
				}
			}
		})
	}

	pointerUpHandler (event) {}
	pointerUpuOutsideHandler (event) {}
	pointerMoveHandler (event) {}

	mouseOverHandler (event) {
		this.tint = this.byTint
	}

	mouseOutHandler (event) {
		this.tint = 0xffffff
	}
}

const app = new Application({
	view: document.querySelector('canvas'),
	width: window.innerWidth,
	height: window.innerHeight
})

class MainScene extends Scene {
	constructor (...args) {
		super(...args)

		this.buttons = []
	}

	load (loader) {}

	async create (container, loader, renderer) {
		await delay(1500)

		const button1 = new SoundButton(
			'assets/images/face1.jpg',
			'assets/mp3/ne_hochy.mp3',
			'assets/mp3/ne_hochy.ogg'
		)

		button1.scale.set(0.3)
		button1.anchor.set(0.5)
		button1.x = renderer.screen.width / 2
		button1.y = renderer.screen.height / 2 - 50
		button1.alpha = 0
		button1.byTint = 0xff0000
		container.addChild(button1)

		const button2 = new SoundButton(
			'assets/images/face2.jpg',
			'assets/mp3/ny_davai.mp3',
			'assets/mp3/ny_davai.ogg'
		)

		button2.scale.set(0.3)
		button2.anchor.set(0.5)
		button2.x = renderer.screen.width / 2
		button2.y = renderer.screen.height / 2 - 50
		button2.alpha = 0
		button2.byTint = 0x00ff00
		container.addChild(button2)

		const button3 = new SoundButton(
			'assets/images/face3.jpg',
			'assets/mp3/ne_bydy.mp3',
			'assets/mp3/ne_bydy.ogg'
		)

		button3.scale.set(0.3)
		button3.anchor.set(0.5)
		button3.x = renderer.screen.width / 2
		button3.y = renderer.screen.height / 2 - 50
		button3.alpha = 0
		button3.byTint = 0x0000ff
		container.addChild(button3)

		button1.sound.play()
		await Tween.create({
			targets: [button1],
			duration: 1000,
			properties: {
				x: button1.x - button1.width - 10,
				y: button1.y,
				alpha: 1
			}
		})

		button3.sound.play()
		await Tween.create({
			targets: [button3],
			duration: 1000,
			properties: {
				x: button3.x + button3.width + 10,
				y: button3.y,
				alpha: 1
			}
		})

		button2.sound.play()
		await Tween.create({
			targets: [button2],
			duration: 1000,
			properties: {
				y: button2.y + 50,
				alpha: 1
			}
		})
	}

	update (delta, duration) {}
}

app.addScene('MainScene', new MainScene)

function delay (milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}