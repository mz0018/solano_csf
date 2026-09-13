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

// Stores the selected region.reg value
const [regionCode, setRegionCode] = useState("");

// Stores the selected province.prv value
const [provinceCode, setProvinceCode] = useState("");

// Stores the selected municipality.mun value
const [municipalityCode, setMunicipalityCode] = useState("");

const [barangayCode, setBarangayCode] = useState("");

const [loading, setLoading] = useState(false);

// Get regions on initial render
useEffect(() => {
    const loadRegions = async () => {
        try {
            setLoading(true);

            const data = await getRegions();

            setRegions(data);
        } catch (error) {
            console.error("Failed to load regions:", error);
        } finally {
            setLoading(false);
        }
    };

    loadRegions();
}, []);

// Get provinces when region changes
useEffect(() => {
    if (!regionCode) {
        setProvinces([]);
        setProvinceCode("");
        setMunicipalityCode("");
        setBarangayCode("");
        setMunicipalities([]);
        setBarangays([]);
        return;
    }

    const loadProvinces = async () => {
        try {
            setLoading(true);

            // regionCode contains region.reg
            const data = await getProvinces(regionCode);

            setProvinces(data);
        } catch (error) {
            console.error("Failed to load provinces:", error);
            setProvinces([]);
        } finally {
            setLoading(false);
        }
    };

    loadProvinces();

    // Reset dependent values
    setProvinceCode("");
    setMunicipalityCode("");
    setBarangayCode("");

    setMunicipalities([]);
    setBarangays([]);
}, [regionCode]);

// Get municipalities when province changes
useEffect(() => {
    if (!provinceCode) {
        setMunicipalities([]);
        setMunicipalityCode("");
        setBarangayCode("");
        setBarangays([]);
        return;
    }

    const loadMunicipalities = async () => {
        try {
            setLoading(true);

            // provinceCode contains province.prv
            const data = await getMunicipalities(provinceCode);

            setMunicipalities(data);
        } catch (error) {
            console.error("Failed to load municipalities:", error);
            setMunicipalities([]);
        } finally {
            setLoading(false);
        }
    };

    loadMunicipalities();

    // Reset dependent values
    setMunicipalityCode("");
    setBarangayCode("");

    setBarangays([]);
}, [provinceCode]);

// Get barangays when municipality changes
useEffect(() => {
    if (!municipalityCode) {
        setBarangays([]);
        setBarangayCode("");
        return;
    }

    const loadBarangays = async () => {
        try {
            setLoading(true);

            // municipalityCode contains municipality.mun
            const data = await getBarangays(municipalityCode);

            setBarangays(data);
        } catch (error) {
            console.error("Failed to load barangays:", error);
            setBarangays([]);
        } finally {
            setLoading(false);
        }
    };

    loadBarangays();

    // Reset barangay
    setBarangayCode("");
}, [municipalityCode]);

return (
    <div className="mt-4 space-y-4">
        {/* Region */}
        <Select
            value={regionCode}
            onChange={(e) => {
                const reg = e.target.value;

                setRegionCode(reg);
            }}
            disabled={loading}
        >
            <option value="">{placeholder}</option>

            {regions.map((region) => (
                <option
                    key={region.code}
                    value={region.reg}
                >
                    {region.name}
                </option>
            ))}
        </Select>

        {/* Province */}
        <Select
            value={provinceCode}
            onChange={(e) => {
                const prv = e.target.value;

                setProvinceCode(prv);
            }}
            disabled={!regionCode || loading}
        >
            <option value="">Select province</option>

            {provinces.map((province) => (
                <option
                    key={province.code}
                    value={province.prv}
                >
                    {province.name}
                </option>
            ))}
        </Select>

        {/* Municipality / City */}
        <Select
            value={municipalityCode}
            onChange={(e) => {
                const mun = e.target.value;

                setMunicipalityCode(mun);
            }}
            disabled={!provinceCode || loading}
        >
            <option value="">Select municipality/city</option>

            {municipalities.map((municipality) => (
                <option
                    key={municipality.code}
                    value={municipality.mun}
                >
                    {municipality.name}
                </option>
            ))}
        </Select>

        {/* Barangay */}
        <Select
            value={barangayCode}
            onChange={(e) => {
                const code = e.target.value;

                setBarangayCode(code);
                setAddressDetail(code);
            }}
            disabled={!municipalityCode || loading}
        >
            <option value="">Select barangay</option>

            {barangays.map((barangay) => (
                <option
                    key={barangay.code}
                    value={barangay.code}
                >
                    {barangay.name}
                </option>
            ))}
        </Select>
    </div>
);


};