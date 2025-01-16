import React, {useEffect, useRef, useState} from "react";
import useOutsideClickHandler from "../../../hooks/useOutsideClickHandler.ts";
import CustomSVG from "../media/CustomSVG.tsx";

// Define types for the props
export type Option = {
    id: number;
    name: string;
};

type CustomDropdownProps = {
    options: Option[];
    label: string;
    selectedOptions: number[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
    filtered?: boolean;
    setFiltered: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomDropdown({
                                           options,
                                           label,
                                           selectedOptions,
                                           setSelectedOptions,
                                           setFiltered,
                                       }: CustomDropdownProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [displayedLabel, setDisplayedLabel] = useState<string>(label)
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Filter options based on search input
    const filteredOptions = options.filter((option: Option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle search input change
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Handle select/deselect option by ID
    const handleSelectOption = (optionId: number) => {
        setSelectedOptions((prevState) => {
            if (prevState.includes(optionId)) {
                return prevState.filter((item) => item !== optionId);
            } else {
                return [...prevState, optionId];
            }
        });

        setFiltered(true);
    };

    // Handle Select All / Deselect All
    const handleSelectAll = () => {
        setSelectedOptions(filteredOptions.map((option: Option) => option.id)); // Store IDs
        setFiltered(true);
    };

    const handleDeSelectAll = () => {
        setSelectedOptions([]);
        setFiltered(true);
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const displayedOptions = options
            .filter(option => selectedOptions.includes(option.id))
            .map(option => option.name);

        const newDisplayedLabel =
            displayedOptions.length > 0 ?
                displayedOptions.length > 2
                    ? (displayedOptions.length === options.length ? `All ${label}` : displayedOptions.slice(0, 2).join(', ') + '...')
                    : displayedOptions.join(', ')
                :
                label

        setDisplayedLabel(newDisplayedLabel)
    }, [selectedOptions]);

    useOutsideClickHandler(dropdownRef, () => setIsOpen(false));

    return (
        <div className="relative w-full">
            <button
                className="flex items-center justify-between bg-white text-left font-roboto font-medium text-[18px] leading-[32px] text-black border border-eg-medium-gray rounded-2xl px-[23px] py-2 h-14 w-full"
                onClick={toggleDropdown}
            >
                <span>{displayedLabel}</span>

                <CustomSVG path="/assets/icons/arrow-down-filled.svg" svgClassName="w-2 sm:w-auto"/>
            </button>

            {isOpen && (
                <div className="relative translate-y-[25px] z-20" ref={dropdownRef}>
                    <div
                        className="absolute left-0 bg-white rounded-[18px] z-20 w-[75vw] md:w-[380px] max-h-[300px] md:max-h-[600px] overflow-y-scroll p-[24px] scrollbar"
                        style={{boxShadow: '0px 4px 54px rgba(0, 0, 0, 0.12), 0px -4px 54px rgba(0, 0, 0, 0.12)'}}
                    >
                        <div className="relative">
                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full px-[23px] py-[12px] border rounded-[100px] placeholder:font-roboto placeholder:font-normal placeholder:uppercase placeholder:text-[13px] placeholder:leading-[16px] placeholder:tracking-widest
                                font-roboto font-normal text-black text-[13px] leading-[16px] tracking-widest
                                focus:border-black focus:ring-0"
                            />
                            <span className="absolute inset-y-0 right-6 flex items-center pl-2">
                                <CustomSVG path="/assets/icons/magnifier.svg"/>
                            </span>
                        </div>

                        <div className="py-[24px]">
                            {/* Select All / Deselect All */}
                            <label className="flex items-center cursor-pointer">
                                <span
                                    className="flex space-x-6 font-roboto font-medium text-[12px] leading-[23px] text-black cursor-pointer">
                                  <button type="button" onClick={handleSelectAll}>
                                    Select All
                                  </button>
                                  <button type="button" onClick={handleDeSelectAll}>
                                    Deselect All
                                  </button>
                                </span>
                            </label>
                        </div>

                        <ul className="w-full flex flex-col items-start">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option: Option, index: number) => (
                                    <li
                                        key={`${label}-option-${index}`}
                                        className={`flex items-center w-full pb-[22px] cursor-pointer font-roboto font-medium text-[14px] md:text-[17px] leading-[16px] md:leading-[23px] text-black ${
                                            index === filteredOptions.length - 1 ? '!pb-0' : ''
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedOptions.includes(option.id)}
                                            onChange={() => handleSelectOption(option.id)}
                                            className={`cursor-pointer mr-2 border-[1.5px] rounded-[3px] border-custom-blue-violet focus:border-custom-blue-violet focus:ring-0 ${
                                                selectedOptions.includes(option.id) ? '!border-custom-blue-violet' : ''
                                            }`}
                                        />
                                        <span className="font-roboto font-medium text-[17px] text-black"
                                              onClick={() => handleSelectOption(option.id)}
                                        >
                                          {option.name}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <span className="font-roboto font-medium text-[17px] text-black">No records</span>
                            )}
                        </ul>
                    </div>

                    <div
                        className="absolute top-[-10px] left-[20px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white z-30"></div>
                </div>
            )}
        </div>
    );
}
