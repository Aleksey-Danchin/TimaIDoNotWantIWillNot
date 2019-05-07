import { Application, Button, Tween, Scene, Pixi } from './OwnPixi'
import { Howl, Howler } from 'howler'

class SoundButton extends Button {
	constructor (texture, audioMP3, audioOGG) {
		super(texture)

		this.sound = new Howl({ src: [audioMP3, audioOGG] })

		this.byTint = 0xffffff
		this.scale.set(0.3)
		this.anchor.set(0.5)
		this.x = app._renderer.screen.width / 2
		this.y = app._renderer.screen.height / 2 - 50
		this.alpha = 0
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
	height: window.innerHeight,
	resolution:window.devicePixelRatio,
	autoDensity: true,
})

class MainScene extends Scene {
	constructor (...args) {
		super(...args)

		this.buttons = []
	}

	async load (loader) {
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


		const button2 = new SoundButton(
			loader.resources.face2.texture,
			'assets/mp3/ny_davai.mp3',
			'assets/mp3/ny_davai.ogg'
		)


		const button3 = new SoundButton(
			loader.resources.face3.texture,
			'assets/mp3/ne_bydy.mp3',
			'assets/mp3/ne_bydy.ogg'
		)

		button1.byTint = 0xff0000
		button2.byTint = 0x00ff00
		button3.byTint = 0x0000ff

		const buttons = this.buttons = [button1, button2, button3]

		await soundLoading()

		container.addChild(button1)
		container.addChild(button2)
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

		function soundLoading () {
			return new Promise(resolve => {
				const interval = setInterval(() => {
					const isLoaded = buttons.every(button => button.sound.state() === 'loaded')

					if (isLoaded) {
						resolve()
						clearInterval(interval)
					}
				})
			})
		}
	}

	update (delta, duration) {}
}

app.addScene('MainScene', new MainScene)