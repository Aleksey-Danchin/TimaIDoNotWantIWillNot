import { Sprite } from 'pixi.js'

class Button extends Sprite {
	constructor (...args) {
		super(...args)

		this.interactive = true
		this.buttonMode = true

		this.on('pointerupuoutside', (...args) => this.pointerUpuOutside(...args))
		this.on('pointermove', (...args) => this.pointerMove(...args))
		this.on('pointerdown', (...args) => this.pointerDown(...args))
		this.on('pointerup', (...args) => this.pointerUp(...args))

		this.on('mouseover', (...args) => this.mouseOver(...args))
		this.on('mouseout', (...args) => this.mouseOut(...args))
	}

	pointerDown (event) {}
	pointerUp (event) {}
	pointerUpuOutside (event) {}
	pointerMove (event) {}

	mouseOver (event) {}
	mouseOut (event) {}
}

export default Button