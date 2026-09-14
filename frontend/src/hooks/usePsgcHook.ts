export const usePsgcHook = () => {
    async function getRegions() {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/psgc/regions`
        );

        const json = await res.json();

        return json.data ?? [];
    }

    async function getProvinces(regionCode: string) {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/psgc/regions/${regionCode}/provinces`
        );

        const json = await res.json();

        return json.data ?? [];
    }

    async function getMunicipalities(provinceCode: string) {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/psgc/provinces/${provinceCode}/municipalities`
        );

        const json = await res.json();

        return json.data ?? [];
    }

    async function getBarangays(
        municipalityCode: string,
        provinceCode: string
    ) {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/psgc/provinces/${provinceCode}/municipalities/${municipalityCode}/barangays`
        );

        const json = await res.json();

        return json.data ?? [];
    }

    return {
        getRegions,
        getProvinces,
        getMunicipalities,
        getBarangays,
    };
};
