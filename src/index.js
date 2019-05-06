import Application from './Application'
import Scene from './Scene'
import Tween from './Tween'
import Button from './Button'

import * as Pixi from 'pixi.js'
import { Howl, Howler } from 'howler'

class SoundButton extends Button {
	constructor (texture, audioMP3, audioOGG) {
		super(texture)

		this.sound = new Howl({
			src: [audioMP3, audioOGG]
		})

		this.byTint = 0xffffff
	}

	pointerDown (event) {
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

	mouseOver (event) {
		this.tint = this.byTint
	}

	mouseOut (event) {
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

	load (loader) {
		loader.add('face1', 'assets/images/face1.jpg')
		loader.add('face2', 'assets/images/face2.jpg')
		loader.add('face3', 'assets/images/face3.jpg')
	}

	async create (container, loader, renderer) {
		const button1 = new SoundButton(
			loader.resources.face1.texture,
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
			loader.resources.face2.texture,
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
			loader.resources.face3.texture,
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
		console.log(button1.x,  button1.width)
		await Tween.create({
			targets: [button1],
			duration: 1000,
			properties: {
				x: button1.x - button1.width - 10,
				y: button1.y,
				alpha: 1
			}
		})
		console.log(button1.x)

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