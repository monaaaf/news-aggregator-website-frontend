import React, {useEffect, useState} from 'react'
import Title from "../components/ui/typography/Title.tsx";
import CustomDropdown, {Option} from "../components/ui/dropdown/CustomDropdown.tsx";
import {getErrorPage} from "../helpers/Requests.ts";
import {Link, useNavigate} from "react-router-dom";
import {getArticles} from "../requests/Article.ts";
import {Article} from "../models/Article.ts";
import Pagination from "../components/ui/pagination/Pagination.tsx";
import {defaultPaginationState, PaginationState} from "../models/General.ts";
import {useMaster} from "../contexts/MasterLayout.tsx";
import {chunkArray} from "../helpers/DataManipulations.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from "../helpers/Date.ts";

const Articles: React.FC = () => {
    const navigate = useNavigate()
    const {options} = useMaster()
    const {categories, sources} = options

    const [meta, setMeta] = useState<PaginationState | undefined>(defaultPaginationState);
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<boolean>(false);
    const [selectedSources, setSelectedSources] = useState<number[]>([]);
    const [filteredSources, setFilteredSources] = useState<boolean>(false);
    const [filterQuery, setFilterQuery] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [currentPage, setCurrentPage] = useState(meta ? meta.current_page : 1);
    const totalPages = meta ? meta.last_page : 1;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const buildQueryString = (arr: number[], key: string): string => {
        return arr && arr.length > 0
            ? arr.map(value => `${key}[]=${value}`).join('&')
            : '';
    };

    const handleFilter = () => {
        let filterQuery = '';

        // Build the categories query if selectedCategories exists
        if (selectedCategories && selectedCategories.length > 0) {
            const categoriesQuery = buildQueryString(selectedCategories, 'filter[category_ids]');
            if (categoriesQuery) {
                filterQuery += (filterQuery ? '&' : '') + categoriesQuery; // Add & only if filterQuery already contains something
            }
        }

        // Build the sources query if selectedSources exists
        if (selectedSources && selectedSources.length > 0) {
            const sourcesQuery = buildQueryString(selectedSources, 'filter[source_ids]');
            if (sourcesQuery) {
                filterQuery += (filterQuery ? '&' : '') + sourcesQuery; // Add & only if filterQuery already contains something
            }
        }

        if (startDate && endDate) {
            console.log(startDate)
            filterQuery += (filterQuery ? '&' : '') + `filter[publish_date_range]=${formatDate(startDate)},${formatDate(endDate)}`;
        }

        // Add the search keyword if provided
        if (searchKeyword) {
            filterQuery += (filterQuery ? '&' : '') + `filter[title]=${encodeURIComponent(searchKeyword)}`;
        }

        setFilterQuery(filterQuery);
    };


    useEffect(() => {
        getArticles(`page=${currentPage}${filterQuery ? `&${filterQuery}` : ''}`).then((response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setArticles(response.data)
                setMeta(response.meta)
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, filterQuery])

    return (
        <>
            <Title text="Articles" isHero={true} classes="mb-10"/>

            {/* Filters */}
            <div className="mb-6">
                <div className="flex flex-row gap-4">
                    <div className="w-full md:w-1/4">
                        {/* Search Bar */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search by keyword.."
                                value={searchKeyword}
                                onChange={handleSearchChange}
                                className="font-roboto font-medium text-[18px] leading-[32px] text-black border rounded-2xl px-[23px] py-2 w-full h-14"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/4">
                        <CustomDropdown
                            options={(categories as Option[])}
                            label="Categories"
                            selectedOptions={selectedCategories}
                            setSelectedOptions={setSelectedCategories}
                            filtered={filteredCategories}
                            setFiltered={setFilteredCategories}
                        />
                    </div>
                    <div className="w-full md:w-1/4">
                        <CustomDropdown
                            options={(sources as Option[])}
                            label="Sources"
                            selectedOptions={selectedSources}
                            setSelectedOptions={setSelectedSources}
                            filtered={filteredSources}
                            setFiltered={setFilteredSources}
                        />
                    </div>
                    <div className="w-full md:w-1/4">
                        <DatePicker
                            selected={startDate}
                            onChange={(dates) => {
                                const [start, end] = dates as [Date, Date];
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            className="font-roboto font-medium text-[18px] leading-[32px] text-black border rounded-2xl px-[23px] py-2 w-full h-14"
                            placeholderText="Select a date range.."
                        />
                    </div>
                    <div className="w-full md:w-1/6">
                        <button
                            type="button"
                            className="w-full h-14 rounded-2xl bg-custom-blue-violet text-white font-roboto font-semibold text-lg"
                            onClick={handleFilter}
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
                    chunkArray(articles, 4).map((chunkedArticle, index) => {
                        return (
                            <div key={`article-grid-${index}`}>
                                {
                                    chunkedArticle.map((article: Article) => {
                                        return (
                                            <div className="grid gap-4 pb-4" key={`article-${article.id}`}>
                                                <Link to={`/articles/${article.id}`}>
                                                    <img className="rounded-2xl"
                                                         src={article.featured_image}
                                                         alt={`${import.meta.env.VITE_APP_NAME} - ${article.title}`}/>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>

            {
                meta && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage === 0 ? 1 : currentPage}
                        onPageChange={(page) => {
                            setCurrentPage(page);
                        }}
                    />
                )
            }
        </>
    )
}

export default Articles
