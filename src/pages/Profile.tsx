import React, {useEffect, useState} from "react";
import Title from "../components/ui/typography/Title.tsx";
import {useMaster} from "../contexts/MasterLayout.tsx";
import {savePreferences} from "../requests/Profile.ts";
import {useAuth} from "../contexts/Auth.tsx";
import {Author, Category, Source} from "../models/Misc.ts";

const Profile: React.FC = () => {
    const {currentUser} = useAuth()
    const {options} = useMaster()
    const {categories, sources, authors} = options

    const [activeTab, setActiveTab] = useState<string>("categories");
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedSources, setSelectedSources] = useState<number[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);

    const toggleSelection = (list: number[], item: number, setter: Function) => {
        setter(
            list.includes(item)
                ? list.filter((i) => i !== item)
                : [...list, item]
        );
    };

    const tabs = [
        {
            name: "Categories",
            key: "categories",
            items: categories,
            selected: selectedCategories,
            setter: setSelectedCategories
        },
        {name: "Sources", key: "sources", items: sources, selected: selectedSources, setter: setSelectedSources},
        {name: "Authors", key: "authors", items: authors, selected: selectedAuthors, setter: setSelectedAuthors},
    ];

    const handleSaveChanges = async () => {
        if (currentUser) {
            const {
                categories,
                sources,
                authors
            } = await savePreferences(currentUser.id, selectedCategories, selectedSources, selectedAuthors)

            setSelectedCategories(categories.map((category: Category) => category.id))
            setSelectedSources(sources.map((source: Source) => source.id))
            setSelectedAuthors(authors.map((author: Author) => author.id))
        }
    }

    useEffect(() => {
        if (currentUser) {
            setSelectedCategories(currentUser.categories.map((category: Category) => category.id))
            setSelectedSources(currentUser.sources.map((source: Source) => source.id))
            setSelectedAuthors(currentUser.authors.map((author: Author) => author.id))
        }
    }, []);

    return (
        <div className="bg-white text-black min-h-screen">
            <Title text="Profile" isHero={true} classes="mb-10"/>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <p className="text-lg font-roboto"><b>Name:</b> {currentUser?.name}</p>
                    <p className="text-lg font-roboto"><b>Email:</b> {currentUser?.email}</p>
                </div>

                {/* Preferences */}
                <div>
                    <div className="flex border-b mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-6 py-3 font-poppins font-semibold text-sm ${
                                    activeTab === tab.key
                                        ? "text-custom-blue-violet border-b-2 border-custom-blue-violet"
                                        : "text-gray-500 hover:text-custom-blue-violet"
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div>
                        {tabs.map(
                            (tab) =>
                                activeTab === tab.key && (
                                    <div key={tab.key}>
                                        <div className="grid grid-cols-4 gap-4">
                                            {tab.items.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() =>
                                                        toggleSelection(tab.selected, item.id, tab.setter)
                                                    }
                                                    className={`py-2 px-4 rounded-md text-sm font-roboto ${
                                                        tab.selected.includes(item.id)
                                                            ? "bg-custom-blue-violet text-white"
                                                            : "bg-gray-100 text-black"
                                                    } hover:bg-custom-blue-violet hover:text-white`}
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>

                    <div className="flex flex-row mt-14 justify-end">
                        <button
                            type="button"
                            className="bg-custom-blue-violet text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none px-14"
                            onClick={handleSaveChanges}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
