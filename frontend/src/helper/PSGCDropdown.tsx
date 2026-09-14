import { ClipLoader } from "react-spinners";
import { Select } from "../ui/form/Select";
import { Input } from "../ui/form/Input";
import { usePsgcDropdownHook } from "../hooks/usePsgcDropdownHook";

type PSGCDropdownProps = {
    setAddressDetail: (value: string) => void;
};

export const PSGCDropdown = ({
    setAddressDetail,
}: PSGCDropdownProps) => {
    const {
        regions,
        provinces,
        municipalities,
        barangays,

        regionCode,
        provinceCode,
        municipalityCode,
        barangayCode,

        manualRegion,
        manualProvince,
        manualMunicipality,
        manualBarangay,

        manualRegionMode,
        manualProvinceMode,
        manualMunicipalityMode,
        manualBarangayMode,

        loadingRegions,
        loadingProvinces,
        loadingMunicipalities,
        loadingBarangays,

        handleRegionChange,
        handleProvinceChange,
        handleMunicipalityChange,
        handleBarangayChange,

        handleManualRegionChange,
        handleManualProvinceChange,
        handleManualMunicipalityChange,
        handleManualBarangayChange,
    } = usePsgcDropdownHook({
        setAddressDetail,
    });

    return (
        <div className="mt-4 space-y-4">
            {/* Region */}
            <div className="relative">
                {loadingRegions ? (
                    <Loading text="Loading regions..." />
                ) : manualRegionMode ? (
                    <Input
                        type="text"
                        value={manualRegion}
                        onChange={handleManualRegionChange}
                        placeholder="Enter region manually"
                        className="mt-1 w-full p-3"
                    />
                ) : (
                    <Select
                        value={regionCode}
                        onChange={handleRegionChange}
                        disabled={loadingRegions}
                    >
                        <option value="">
                            {"Select region"}
                        </option>

                        {regions.map((region) => (
                            <option
                                key={region.code}
                                value={region.reg}
                            >
                                {region.name}
                            </option>
                        ))}
                    </Select>
                )}
            </div>

            {/* Province */}
            <div className="relative">
                {loadingProvinces ? (
                    <Loading text="Loading provinces..." />
                ) : manualProvinceMode ? (
                    <Input
                        type="text"
                        value={manualProvince}
                        onChange={handleManualProvinceChange}
                        placeholder="Enter province manually"
                        className="mt-1 w-full p-3"
                    />
                ) : (
                    <Select
                        value={provinceCode}
                        onChange={handleProvinceChange}
                        disabled={!regionCode || loadingProvinces}
                    >
                        <option value="">
                            Select province
                        </option>

                        {provinces.map((province) => (
                            <option
                                key={province.code}
                                value={province.prv}
                            >
                                {province.name}
                            </option>
                        ))}
                    </Select>
                )}
            </div>

            {/* Municipality */}
            <div className="relative">
                {loadingMunicipalities ? (
                    <Loading text="Loading municipalities/cities..." />
                ) : manualMunicipalityMode ? (
                    <div className="block">
                        <span className="text-sm text-[var(--theme-text)] block">Municipality Optional</span>
                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <Input
                                    type="text"
                                    value={manualMunicipality}
                                    onChange={handleManualMunicipalityChange}
                                    placeholder="Enter municipality/city manually"
                                    className="mt-1 w-full p-3"
                                />
                            </label>
                        </div>
                    </div> 
                ) : (
                    <Select
                        value={municipalityCode}
                        onChange={handleMunicipalityChange}
                        disabled={
                            !provinceCode ||
                            loadingMunicipalities
                        }
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
                )}
            </div>

            {/* Barangay */}
            <div className="relative">
                {loadingBarangays ? (
                    <Loading text="Loading barangays..." />
                ) : manualBarangayMode ? (
                    <div className="block">
                        <span className="text-sm text-[var(--theme-text)] block">Barangay Optional</span>
                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <Input
                                    type="text"
                                    value={manualBarangay}
                                    onChange={handleManualBarangayChange}
                                    placeholder="Enter barangay manually"
                                    className="mt-1 w-full p-3"
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    <Select
                        value={barangayCode}
                        onChange={handleBarangayChange}
                        disabled={
                            !municipalityCode ||
                            loadingBarangays
                        }
                    >
                        <option value="">
                            Select barangay
                        </option>

                        {barangays.map((barangay) => (
                            <option
                                key={barangay.code}
                                value={barangay.code}
                            >
                                {barangay.name}
                            </option>
                        ))}
                    </Select>
                )}
            </div>
        </div>
    );
};

const Loading = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 p-4 rounded-lg border border-[var(--theme-border)] bg-transparent focus:outline-none">
        <span className="text-[var(--theme-text)]">{text}</span>
        <ClipLoader size={18} color="#6B7280" />
    </div>
);
