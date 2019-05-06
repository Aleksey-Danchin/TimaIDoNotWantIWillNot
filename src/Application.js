import * as Pixi from 'pixi.js'

class Application {
	constructor (params) {
		this._loader = new Pixi.Loader
		this._renderer = new Pixi.Renderer(params)
		this._container = new Pixi.Container
		this._ticker = new Pixi.Ticker

		this._createMomemnt = Date.now()

		this._scenesMap = new Map
		this._scenesSet = new Set
	}

	addScene (name, scene) {
		return new Promise(async (resolve, reject) => {
			if (this._scenesSet.has(scene)) {
				return resolve()
			}

			this._scenesMap.set(name, scene)
			this._scenesSet.add(scene)

			scene.load(this._loader)

			this._loader.load(async () => {
				this._ticker.add(() => {
					const nowMomemnt = Date.now()
					const delta = nowMomemnt - scene._lastTickMomemnt

					scene._lastTickMomemnt = Date.now()
					scene.update(delta, scene._lastTickMomemnt - this._createMomemnt)
				})
				this._ticker.add(() => this._renderer.render(this._container))

				this._ticker.start()

				await scene.create(this._container, this._loader, this._renderer)

				resolve()
			})

		})
	}
}

export default Application