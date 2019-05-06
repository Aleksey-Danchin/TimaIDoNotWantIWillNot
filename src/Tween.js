const Tween = {
	create (params, callback = null) {
		return new Promise((resolve, reject) => {
			const startMoment = Date.now()

			const objectsSet = new Set
			for (const target of params.targets) {
				for (const property of Object.keys(params.properties)) {
					if (target[property] !== undefined) {
						const lor = [target, property, target[property], params.properties[property]]
						objectsSet.add(lor)
					}
				}
			}

			const interval = setInterval(() => {
				const timer = Date.now() - startMoment
				const percent = Math.min(1, timer / params.duration)

				for (const [target, property, startValue, finishValue] of objectsSet.values()) {
					target[property] = startValue + (finishValue - startValue) * percent
				}

				if (percent === 1) {
					resolve()
					clearInterval(interval)
				}
			})
		})
	}
}

export default Tween