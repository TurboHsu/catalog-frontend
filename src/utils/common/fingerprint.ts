import FingerprintJS from '@fingerprintjs/fingerprintjs'

const FINGERPRINT_CACHE_KEY = 'client_fingerprint'

async function getFingerprint() {
	const cache = localStorage.getItem(FINGERPRINT_CACHE_KEY)
	if (cache) {
		return cache
	}

	const fp = await FingerprintJS.load()
	const { visitorId } = await fp.get()
	localStorage.setItem(FINGERPRINT_CACHE_KEY, visitorId)
	return visitorId
}

export default getFingerprint
