import { useEffect, useMemo, useState } from "react";
import { usePsgcHook } from "./usePsgcHook";

export type PSGCItem = {
    code: string;
    name: string;
};

export type Province = PSGCItem & {
    prv: number;
};

export type Municipality = PSGCItem & {
    mun: number;
};

export type Region = PSGCItem & {
    reg: number;
};

type UsePsgcDropdownHookProps = {
    setAddressDetail: (value: string) => void;
};

export const usePsgcDropdownHook = ({
    setAddressDetail,
}: UsePsgcDropdownHookProps) => {
    const {
        getRegions,
        getProvinces,
        getMunicipalities,
        getBarangays,
    } = usePsgcHook();

    // =========================
    // PSGC data
    // =========================

    const [regions, setRegions] = useState<Region[]>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>(
        []
    );
    const [barangays, setBarangays] = useState<PSGCItem[]>([]);

    // =========================
    // Selected codes
    // =========================

    const [regionCode, setRegionCode] = useState("");
    const [provinceCode, setProvinceCode] = useState("");
    const [municipalityCode, setMunicipalityCode] = useState("");
    const [barangayCode, setBarangayCode] = useState("");

    // =========================
    // Manual values
    // =========================

    const [manualRegion, setManualRegion] = useState("");
    const [manualProvince, setManualProvince] = useState("");
    const [manualMunicipality, setManualMunicipality] = useState("");
    const [manualBarangay, setManualBarangay] = useState("");

    // =========================
    // Manual mode
    // =========================

    const [manualRegionMode, setManualRegionMode] = useState(false);
    const [manualProvinceMode, setManualProvinceMode] = useState(false);
    const [manualMunicipalityMode, setManualMunicipalityMode] =
        useState(false);
    const [manualBarangayMode, setManualBarangayMode] = useState(false);

    // =========================
    // Loading
    // =========================

    const [loadingRegions, setLoadingRegions] = useState(false);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingMunicipalities, setLoadingMunicipalities] =
        useState(false);
    const [loadingBarangays, setLoadingBarangays] = useState(false);

    // =========================
    // Selected names
    // =========================

    const selectedRegion = useMemo(() => {
        return regions.find(
            (region) => String(region.reg) === regionCode
        );
    }, [regions, regionCode]);

    const selectedProvince = useMemo(() => {
        return provinces.find(
            (province) => String(province.prv) === provinceCode
        );
    }, [provinces, provinceCode]);

    const selectedMunicipality = useMemo(() => {
        return municipalities.find(
            (municipality) =>
                String(municipality.mun) === municipalityCode
        );
    }, [municipalities, municipalityCode]);

    const selectedBarangay = useMemo(() => {
        return barangays.find(
            (barangay) => barangay.code === barangayCode
        );
    }, [barangays, barangayCode]);

    // =========================
    // Full address
    // =========================

    const fullAddress = useMemo(() => {
        const addressParts = [
            manualRegion || selectedRegion?.name,
            manualProvince || selectedProvince?.name,
            manualMunicipality || selectedMunicipality?.name,
            manualBarangay || selectedBarangay?.name,
        ];

        return addressParts.filter(Boolean).join(", ");
    }, [
        manualRegion,
        manualProvince,
        manualMunicipality,
        manualBarangay,
        selectedRegion,
        selectedProvince,
        selectedMunicipality,
        selectedBarangay,
    ]);

    // =========================
    // Sync address
    // =========================

    useEffect(() => {
        setAddressDetail(fullAddress);
    }, [fullAddress, setAddressDetail]);

    // =========================
    // Load regions
    // =========================

    useEffect(() => {
        const loadRegions = async () => {
            try {
                setLoadingRegions(true);

                const data = await getRegions();

                if (data.length === 0) {
                    setManualRegionMode(true);
                } else {
                    setRegions(data);
                    setManualRegionMode(false);
                }
            } catch (error) {
                console.error("Failed to load regions:", error);
                setRegions([]);
                setManualRegionMode(true);
            } finally {
                setLoadingRegions(false);
            }
        };

        loadRegions();
    }, []);

    // =========================
    // Load provinces
    // =========================

    useEffect(() => {
        setProvinceCode("");
        setMunicipalityCode("");
        setBarangayCode("");

        setProvinces([]);
        setMunicipalities([]);
        setBarangays([]);

        setManualProvince("");
        setManualMunicipality("");
        setManualBarangay("");

        // If region is manual,
        // everything below must also be manual.
        if (manualRegionMode) {
            setManualProvinceMode(true);
            setManualMunicipalityMode(true);
            setManualBarangayMode(true);
            return;
        }

        setManualProvinceMode(false);
        setManualMunicipalityMode(false);
        setManualBarangayMode(false);

        if (!regionCode) {
            return;
        }

        const loadProvinces = async () => {
            try {
                setLoadingProvinces(true);

                const data = await getProvinces(regionCode);

                if (data.length === 0) {
                    // Province becomes manual
                    // Everything below also becomes manual.
                    setManualProvinceMode(true);
                    setManualMunicipalityMode(true);
                    setManualBarangayMode(true);
                    return;
                }

                setProvinces(data);
            } catch (error) {
                console.error("Failed to load provinces:", error);

                setProvinces([]);
                setManualProvinceMode(true);
                setManualMunicipalityMode(true);
                setManualBarangayMode(true);
            } finally {
                setLoadingProvinces(false);
            }
        };

        loadProvinces();
    }, [regionCode, manualRegionMode]);

    // =========================
    // Load municipalities
    // =========================

    useEffect(() => {
        setMunicipalityCode("");
        setBarangayCode("");

        setMunicipalities([]);
        setBarangays([]);

        setManualMunicipality("");
        setManualBarangay("");

        // If province is manual,
        // municipality + barangay must be manual.
        if (manualProvinceMode) {
            setManualMunicipalityMode(true);
            setManualBarangayMode(true);
            return;
        }

        setManualMunicipalityMode(false);
        setManualBarangayMode(false);

        if (!provinceCode) {
            return;
        }

        const loadMunicipalities = async () => {
            try {
                setLoadingMunicipalities(true);

                const data = await getMunicipalities(provinceCode);

                if (data.length === 0) {
                    // Municipality becomes manual
                    // Barangay automatically becomes manual.
                    setManualMunicipalityMode(true);
                    setManualBarangayMode(true);
                    return;
                }

                setMunicipalities(data);
            } catch (error) {
                console.error(
                    "Failed to load municipalities:",
                    error
                );

                setMunicipalities([]);
                setManualMunicipalityMode(true);
                setManualBarangayMode(true);
            } finally {
                setLoadingMunicipalities(false);
            }
        };

        loadMunicipalities();
    }, [provinceCode, manualProvinceMode]);

    // =========================
    // Load barangays
    // =========================

    useEffect(() => {
        setBarangayCode("");
        setManualBarangay("");
        setBarangays([]);

        // Municipality is manual,
        // therefore barangay must also be manual.
        if (manualMunicipalityMode) {
            setManualBarangayMode(true);
            return;
        }

        setManualBarangayMode(false);

        if (!municipalityCode || !provinceCode) {
            return;
        }

        const loadBarangays = async () => {
            try {
                setLoadingBarangays(true);

                const data = await getBarangays(
                    municipalityCode,
                    provinceCode
                );

                if (data.length === 0) {
                    setManualBarangayMode(true);
                    return;
                }

                setBarangays(data);
            } catch (error) {
                console.error("Failed to load barangays:", error);

                setBarangays([]);
                setManualBarangayMode(true);
            } finally {
                setLoadingBarangays(false);
            }
        };

        loadBarangays();
    }, [
        municipalityCode,
        provinceCode,
        manualMunicipalityMode,
    ]);

    // =========================
    // Region handlers
    // =========================

    const handleRegionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;

        setRegionCode(value);
        setManualRegion("");

        // Region selected from API,
        // so allow province API lookup again.
        setManualRegionMode(false);
    };

    const handleManualRegionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setManualRegion(event.target.value);

        // Manual region means everything below is manual.
        setManualRegionMode(true);
        setManualProvinceMode(true);
        setManualMunicipalityMode(true);
        setManualBarangayMode(true);

        setRegionCode("");
        setProvinceCode("");
        setMunicipalityCode("");
        setBarangayCode("");
    };

    // =========================
    // Province handlers
    // =========================

    const handleProvinceChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;

        setProvinceCode(value);
        setManualProvince("");

        setManualProvinceMode(false);
        setManualMunicipalityMode(false);
        setManualBarangayMode(false);
    };

    const handleManualProvinceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setManualProvince(event.target.value);

        // Manual province means everything below is manual.
        setManualProvinceMode(true);
        setManualMunicipalityMode(true);
        setManualBarangayMode(true);

        setProvinceCode("");
        setMunicipalityCode("");
        setBarangayCode("");
    };

    // =========================
    // Municipality handlers
    // =========================

    const handleMunicipalityChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;

        setMunicipalityCode(value);
        setManualMunicipality("");

        setManualMunicipalityMode(false);
        setManualBarangayMode(false);
    };

    const handleManualMunicipalityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setManualMunicipality(event.target.value);

        // Manual municipality means barangay is also manual.
        setManualMunicipalityMode(true);
        setManualBarangayMode(true);

        setMunicipalityCode("");
        setBarangayCode("");
    };

    // =========================
    // Barangay handlers
    // =========================

    const handleBarangayChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;

        setBarangayCode(value);
        setManualBarangay("");
        setManualBarangayMode(false);
    };

    const handleManualBarangayChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setManualBarangay(event.target.value);
        setManualBarangayMode(true);
        setBarangayCode("");
    };

    return {
        // Data
        regions,
        provinces,
        municipalities,
        barangays,

        // Selected codes
        regionCode,
        provinceCode,
        municipalityCode,
        barangayCode,

        // Manual values
        manualRegion,
        manualProvince,
        manualMunicipality,
        manualBarangay,

        // Manual modes
        manualRegionMode,
        manualProvinceMode,
        manualMunicipalityMode,
        manualBarangayMode,

        // Address
        fullAddress,

        // Loading
        loadingRegions,
        loadingProvinces,
        loadingMunicipalities,
        loadingBarangays,

        // Handlers
        handleRegionChange,
        handleProvinceChange,
        handleMunicipalityChange,
        handleBarangayChange,

        handleManualRegionChange,
        handleManualProvinceChange,
        handleManualMunicipalityChange,
        handleManualBarangayChange,
    };
};
