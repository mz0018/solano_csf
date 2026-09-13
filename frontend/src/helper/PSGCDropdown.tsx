import { useEffect, useState } from "react";
import { Select } from "../ui/form/Select";
import { usePsgcHook } from "../hooks/usePsgcHook";

type PSGCItem = {
    code: string;
    name: string;
};

type Province = PSGCItem & {
    prv: number;
};

type Municipality = PSGCItem & {
    mun: number;
};

type Region = PSGCItem & {
    reg: number;
};

type PSGCDropdownProps = {
    addressDetail: string;
    setAddressDetail: (value: string) => void;
    placeholder: string;
};

export const PSGCDropdown = ({
    addressDetail,
    setAddressDetail,
    placeholder,
}: PSGCDropdownProps) => {
    const {
        getRegions,
        getProvinces,
        getMunicipalities,
        getBarangays,
    } = usePsgcHook();

    const [regions, setRegions] = useState<Region[]>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    const [barangays, setBarangays] = useState<PSGCItem[]>([]);

    const [regionCode, setRegionCode] = useState("");
    const [provinceCode, setProvinceCode] = useState("");
    const [municipalityCode, setMunicipalityCode] = useState("");
    const [barangayCode, setBarangayCode] = useState("");

    const [loading, setLoading] = useState(false);

    // Load regions
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setRegions(await getRegions());
            } catch (error) {
                console.error("Failed to load regions:", error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    // Load provinces
    useEffect(() => {
        setProvinceCode("");
        setMunicipalityCode("");
        setBarangayCode("");
        setMunicipalities([]);
        setBarangays([]);

        if (!regionCode) {
            setProvinces([]);
            return;
        }

        const load = async () => {
            try {
                setLoading(true);
                setProvinces(await getProvinces(regionCode));
            } catch (error) {
                console.error("Failed to load provinces:", error);
                setProvinces([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [regionCode]);

    // Load municipalities
    useEffect(() => {
        setMunicipalityCode("");
        setBarangayCode("");
        setBarangays([]);

        if (!provinceCode) {
            setMunicipalities([]);
            return;
        }

        const load = async () => {
            try {
                setLoading(true);
                setMunicipalities(await getMunicipalities(provinceCode));
            } catch (error) {
                console.error("Failed to load municipalities:", error);
                setMunicipalities([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [provinceCode]);

    // Load barangays
    useEffect(() => {
        setBarangayCode("");

        if (!municipalityCode || !provinceCode) {
            setBarangays([]);
            return;
        }

        const load = async () => {
            try {
                setLoading(true);
                setBarangays(await getBarangays(municipalityCode, provinceCode));
            } catch (error) {
                console.error("Failed to load barangays:", error);
                setBarangays([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [municipalityCode, provinceCode]);

    return (
        <div className="mt-4 space-y-4">
            {/* Region */}
            <Select
                value={regionCode}
                onChange={(e) => setRegionCode(e.target.value)}
                disabled={loading}
            >
                <option value="">{placeholder}</option>

                {regions.map((region) => (
                    <option key={region.code} value={region.reg}>
                        {region.name}
                    </option>
                ))}
            </Select>

            {/* Province */}
            <Select
                value={provinceCode}
                onChange={(e) => setProvinceCode(e.target.value)}
                disabled={!regionCode || loading}
            >
                <option value="">Select province</option>

                {provinces.map((province) => (
                    <option key={province.code} value={province.prv}>
                        {province.name}
                    </option>
                ))}
            </Select>

            {/* Municipality / City */}
            <Select
                value={municipalityCode}
                onChange={(e) => setMunicipalityCode(e.target.value)}
                disabled={!provinceCode || loading}
            >
                <option value="">Select municipality/city</option>

                {municipalities.map((municipality) => (
                    <option key={municipality.code} value={municipality.mun}>
                        {municipality.name}
                    </option>
                ))}
            </Select>

            {/* Barangay */}
            <Select
                value={barangayCode}
                onChange={(e) => {
                    setBarangayCode(e.target.value);
                    setAddressDetail(e.target.value);
                }}
                disabled={!municipalityCode || loading}
            >
                <option value="">Select barangay</option>

                {barangays.map((barangay) => (
                    <option key={barangay.code} value={barangay.code}>
                        {barangay.name}
                    </option>
                ))}
            </Select>
        </div>
    );
};
