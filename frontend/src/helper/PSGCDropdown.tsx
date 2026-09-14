import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Select } from "../ui/form/Select";
import { usePsgcHook } from "../hooks/usePsgcHook";

type PSGCItem = {
    code: string;
    name: string;
};

type Province = PSGCItem & {
    prv: number;
    name: string;
};

type Municipality = PSGCItem & {
    mun: number;
    name: string;
};

type Region = PSGCItem & {
    reg: number;
};

type PSGCDropdownProps = {
    setAddressDetail: (value: string) => void;
    placeholder: string;
};

export const PSGCDropdown = ({
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
    const [fullAddress, setFullAddress] = useState("");

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
                setBarangays(
                    await getBarangays(municipalityCode, provinceCode)
                );
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
            <div className="relative">
                <Select
                    value={regionCode}
                    onChange={(e) => {
                        const name =
                            e.target.options[e.target.selectedIndex].text;

                        setRegionCode(e.target.value);
                        setFullAddress(name);
                    }}
                    disabled={loading}
                >
                    <option value="">{placeholder}</option>

                    {regions.map((region) => (
                        <option key={region.code} value={region.reg}>
                            {region.name}
                        </option>
                    ))}
                </Select>

                {loading && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        <ClipLoader size={18} color="#6B7280" />
                    </div>
                )}
            </div>

            {/* Province */}
            <div className="relative">
                <Select
                    value={provinceCode}
                    onChange={(e) => {
                        const name =
                            e.target.options[e.target.selectedIndex].text;

                        setProvinceCode(e.target.value);
                        setFullAddress((prev) => `${prev}, ${name}`);
                    }}
                    disabled={!regionCode || loading}
                >
                    <option value="">Select province</option>

                    {provinces.map((province) => (
                        <option key={province.code} value={province.prv}>
                            {province.name}
                        </option>
                    ))}
                </Select>

                {loading && regionCode && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        <ClipLoader size={18} color="#6B7280" />
                    </div>
                )}
            </div>

            {/* Municipality / City */}
            <div className="relative">
                <Select
                    value={municipalityCode}
                    onChange={(e) => {
                        const name =
                            e.target.options[e.target.selectedIndex].text;

                        setMunicipalityCode(e.target.value);
                        setFullAddress((prev) => `${prev}, ${name}`);
                    }}
                    disabled={!provinceCode || loading}
                >
                    <option value="">
                        Select municipality/city
                    </option>

                    {municipalities.map((municipality) => (
                        <option
                            key={municipality.code}
                            value={municipality.mun}
                        >
                            {municipality.name}
                        </option>
                    ))}
                </Select>

                {loading && provinceCode && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        <ClipLoader size={18} color="#6B7280" />
                    </div>
                )}
            </div>

            {/* Barangay */}
            <div className="relative">
                <Select
                    value={barangayCode}
                    onChange={(e) => {
                        const name =
                            e.target.options[e.target.selectedIndex].text;

                        const newFullAddress = `${fullAddress}, ${name}`;

                        setBarangayCode(e.target.value);
                        setFullAddress(newFullAddress);
                        setAddressDetail(newFullAddress);
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

                {loading && municipalityCode && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        <ClipLoader size={18} color="#6B7280" />
                    </div>
                )}
            </div>
        </div>
    );
};
