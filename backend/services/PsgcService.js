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
            if (
                value !== undefined &&
                value !== null &&
                value !== ''
            ) {
                url.searchParams.set(key, value)
            }
        })

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(
                `PSGC API Error: ${response.status}`
            )
        }

        const data = await response.json()

        return data.results
    }


    async getRegions() {

        const data = await this.request('regions')

        return data.map(region => ({
            code: region.code,
            name: region.area_name,
            reg: region.reg
        }))
    }


    async getProvinces(regionCode) {

        const data = await this.request('provinces', {
            reg: regionCode
        })

        return data.map(province => ({
            code: province.code,
            name: province.area_name,
            reg: province.reg,
            prv: province.prv
        }))
    }


    async getMunicipalities(provinceCode) {

        const data = await this.request('municipalities', {
            prv: provinceCode
        })

        return data.map(municipality => ({
            code: municipality.code,
            name: municipality.area_name,
            reg: municipality.reg,
            prv: municipality.prv,
            mun: municipality.mun
        }))
    }


    async getBarangays(municipalityCode) {

        const data = await this.request('barangays', {
            mun: municipalityCode
        })

        return data.map(barangay => ({
            code: barangay.code,
            name: barangay.area_name,
            reg: barangay.reg,
            prv: barangay.prv,
            mun: barangay.mun,
            bgy: barangay.bgy
        }))
    }

}

export default new PhilippineStandardGeographicCodeService()
