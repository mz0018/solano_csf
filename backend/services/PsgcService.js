class PhilippineStandardGeographicCodeService {

    async request(level, params = {}) {

        const baseURL = process.env.PSGC_API_BASE_URL
        const version = process.env.PSGC_API_VERSION
        const token = process.env.PSGC_API_TOKEN

        if (!baseURL) {
            throw new Error('PSGC_API_BASE_URL is not configured')
        }

        if (!version) {
            throw new Error('PSGC_API_VERSION is not configured')
        }

        if (!token) {
            throw new Error('PSGC_API_TOKEN is not configured')
        }

        const url = new URL(
            `${baseURL}/${version}/${level}`
        )

        url.searchParams.set('token', token)

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.set(key, value)
            }
        })

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(
                `PSGC API Error: ${response.status}`
            )
        }

        return await response.json()
    }


    async getRegions() {
        return this.request('regions')
    }


    async getProvinces(regionCode) {
        return this.request('provinces', {
            reg: regionCode
        })
    }


    async getMunicipalities(provinceCode) {
        return this.request('municipalities', {
            prv: provinceCode
        })
    }


    async getBarangays(municipalityCode) {
        return this.request('barangays', {
            mun: municipalityCode
        })
    }

}

export default new PhilippineStandardGeographicCodeService()
