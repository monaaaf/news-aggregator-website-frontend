import CustomSVG from "../../ui/media/CustomSVG.tsx";
import Title from "../../ui/typography/Title.tsx";
import {Article, ArticleCondensed} from "../../../models/Article.ts";
import {formatLongDate} from "../../../helpers/Date.ts";
import {Link} from "react-router-dom";

interface ArticleCardProps {
    article: Article | ArticleCondensed;
}

export default function ArticleCard({article}: ArticleCardProps) {
    return (
        <>
            {
                article && (
                    <Link to={`/articles/${article.id}`}>
                        <div className="flex flex-col justify-between h-full">
                            <div className="pb-6 md:pb-4">
                                {/* Author and Reading Time */}
                                <div className="flex flex-row items-center space-x-1 pb-4 h-16">
                                    <div className="flex flex-row items-center space-x-2">
                                        <div className="w-8 h-8 bg-gray-200 p-1 rounded-full">
                                            <CustomSVG path="/assets/icons/author.svg" svgClassName="w-full"/>
                                        </div>
                                        <div className="font-roboto font-semibold text-sm leading-normal text-black">
                                            {article.author ? article.author.name : 'Unknown'}
                                        </div>
                                    </div>
                                    <span
                                        className="font-roboto font-semibold text-sm leading-md text-black">&middot;</span>
                                    <div
                                        className="font-roboto font-medium text-sm leading-md text-gray-400">{formatLongDate(article.published_at)}</div>
                                </div>

                                {/* Thumbnail */}
                                <img
                                    src={article.featured_image ?? '/assets/images/default-thumbnail.png'}
                                    alt={`${import.meta.env.VITE_APP_NAME} Hero Article Image`}
                                    className="rounded-2xl h-48 w-full object-cover pb-4"
                                    decoding="async"
                                    loading="eager"
                                />

                                {/* Section Title */}
                                <Title
                                    text={article.title}
                                    classes="!capitalize" isHero={false}/>
                            </div>

                            {/* Category */}
                            <div className="flex flex-row items-center space-x-3">
                                <div
                                    className="flex flex-row items-center justify-center gap-1 bg-custom-blue-violet bg-opacity-20 px-4 !pl-[11px] py-1 rounded-2xl font-roboto font-normal text-sm leading-normal text-custom-blue-violet">
                                    <CustomSVG path="/assets/icons/globe.svg" svgClassName="w-6 h-6"/>
                                    {article && 'category' in article ? article.category?.name : 'General'}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            }
        </>
    )
}
