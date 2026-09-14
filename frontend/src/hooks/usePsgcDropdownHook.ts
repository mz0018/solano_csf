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
    // Sync address to parent
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

                setRegions(data);
            } catch (error) {
                console.error("Failed to load regions:", error);
                setRegions([]);
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

        if (!regionCode) {
            return;
        }

        const loadProvinces = async () => {
            try {
                setLoadingProvinces(true);

                const data = await getProvinces(regionCode);

                setProvinces(data);
            } catch (error) {
                console.error("Failed to load provinces:", error);
                setProvinces([]);
            } finally {
                setLoadingProvinces(false);
            }
        };

        loadProvinces();
    }, [regionCode]);

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

        if (!provinceCode) {
            return;
        }

        const loadMunicipalities = async () => {
            try {
                setLoadingMunicipalities(true);

                const data = await getMunicipalities(provinceCode);

                setMunicipalities(data);
            } catch (error) {
                console.error(
                    "Failed to load municipalities:",
                    error
                );

                setMunicipalities([]);
            } finally {
                setLoadingMunicipalities(false);
            }
        };

        loadMunicipalities();
    }, [provinceCode]);

    // =========================
    // Load barangays
    // =========================

    useEffect(() => {
        setBarangayCode("");
        setManualBarangay("");
        setBarangays([]);

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

                setBarangays(data);
            } catch (error) {
                console.error("Failed to load barangays:", error);
                setBarangays([]);
            } finally {
                setLoadingBarangays(false);
            }
        };

        loadBarangays();
    }, [municipalityCode, provinceCode]);

    // =========================
    // Region handlers
    // =========================

    const handleRegionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRegionCode(event.target.value);
    };

    const handleManualRegionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setManualRegion(event.target.value);
    };

    // =========================
    // Province handlers
    // =========================

    const handleProvinceChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setProvinceCode(event.target.value);
    };

    const handleManualProvinceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setManualProvince(event.target.value);
    };

    // =========================
    // Municipality handlers
    // =========================

    const handleMunicipalityChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setMunicipalityCode(event.target.value);
    };

    const handleManualMunicipalityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setManualMunicipality(event.target.value);
    };

    // =========================
    // Barangay handlers
    // =========================

    const handleBarangayChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setBarangayCode(event.target.value);
    };

    const handleManualBarangayChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setManualBarangay(event.target.value);
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
