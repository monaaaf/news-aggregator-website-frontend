import React from 'react'
import {Article} from "../../../models/Article.ts";
import CustomSVG from "../../../components/ui/media/CustomSVG.tsx";
import Title from "../../../components/ui/typography/Title.tsx";
import {formatLongDate} from "../../../helpers/Date.ts";
import {Link} from "react-router-dom";

interface LastArticleProps {
    article: Article
}

const LastArticle: React.FC<LastArticleProps> = ({article}) => {
    return (
        <div className="flex flex-col md:flex-row items-stretch mb-14">
            <div className="w-full md:w-1/2 pr-2 md:pr-4 pb-4 md:pb-0 flex flex-col">
                <Link to={`/articles/${article.id}`}>
                    <img
                        src={article.featured_image}
                        alt={`${import.meta.env.VITE_APP_NAME} Hero Article Image`}
                        className="rounded-2xl h-full object-cover"
                        decoding="async"
                        loading="eager"
                    />
                </Link>
            </div>

            <div className="w-full md:w-1/2 pl-2 md:pl-4 flex flex-col justify-between">
                <div className="pb-6 md:pb-4">
                    <Link to={`/articles/${article.id}`}>
                        <div className="flex flex-row items-center space-x-3 pb-4">
                            <div className="flex flex-row items-center space-x-2">
                                <div className="w-10 h-10 bg-gray-200 p-1 rounded-full">
                                    <CustomSVG path="/assets/icons/author.svg" svgClassName="w-full"/>
                                </div>
                                <div className="font-roboto font-semibold text-md leading-normal text-black">
                                    {article.author ? article.author.name : 'Unknown'}
                                </div>
                            </div>
                            <span className="font-roboto font-semibold text-md leading-md text-black">&middot;</span>
                            <div
                                className="font-roboto font-medium text-md leading-md text-gray-400">{formatLongDate(article.published_at)}</div>
                        </div>

                        {/* Section Title */}
                        <Title
                            text={article.title}
                            classes="!capitalize" isHero={true}/>
                    </Link>
                </div>

                {/* Category */}
                <div className="flex flex-row items-center space-x-3">
                    <div className="flex flex-row items-center justify-center gap-1 bg-custom-blue-violet bg-opacity-20 px-4 !pl-[11px] py-1 rounded-2xl font-roboto font-normal text-md leading-normal text-custom-blue-violet">
                        <CustomSVG path="/assets/icons/globe.svg" svgClassName="w-6 h-6"/>
                        {article.category ? article.category.name : 'General'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastArticle
