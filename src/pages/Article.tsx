import React, {useEffect, useState} from 'react'
import Title from "../components/ui/typography/Title.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getArticle} from "../requests/Article.ts";
import {getErrorPage} from "../helpers/Requests.ts";
import {Article} from "../models/Article.ts";
import CustomSVG from "../components/ui/media/CustomSVG.tsx";
import {formatLongDate} from "../helpers/Date.ts";

const SingleArticle: React.FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [article, setArticle] = useState<Article>([]);

    useEffect(() => {
        if (id) {
            getArticle(parseInt(id)).then((response) => {
                const errorPage = getErrorPage(response)

                if (errorPage) {
                    navigate(errorPage)
                } else {
                    setArticle(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function applyClassesToHTML(html: string): string {
        // Parse the HTML string into a document
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        if (!doc.body) return html; // Return original HTML if parsing fails

        // Apply classes to <p> elements
        doc.querySelectorAll("p").forEach((el) => {
            el.classList.add("text-base", "leading-relaxed", "text-black", "font-roboto", "mb-4");
        });

        // Apply classes to <h1> - <h6> elements
        for (let i = 1; i <= 6; i++) {
            doc.querySelectorAll(`h${i}`).forEach((el) => {
                el.classList.add(
                    "font-bold",
                    "text-gray-900",
                    `text-${i + 2}xl`, // Dynamically adjust font size based on header level
                );
            });
        }

        // Apply classes to <a> elements
        doc.querySelectorAll("a").forEach((el) => {
            el.classList.add(
                "font-roboto",
                "text-black",
                "underline",
                "hover:text-custom-blue-violet",
                "transition-colors",
                "duration-200"
            );
        });

        // Serialize the modified document back into an HTML string
        return doc.body.innerHTML;
    }

    return (
        <>
            {
                article && (
                    <>
                        <Title text={article.title} isHero={true} classes="mb-4"/>

                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row items-center space-x-3 mb-10">
                                <div className="flex flex-row items-center space-x-2">
                                    <div className="w-10 h-10 bg-gray-200 p-1 rounded-full">
                                        <CustomSVG path="/assets/icons/author.svg" svgClassName="w-full"/>
                                    </div>
                                    <div className="font-roboto font-semibold text-md leading-normal text-black">
                                        {article.author ? article.author.name : 'Unknown'}
                                    </div>
                                </div>
                                <span
                                    className="font-roboto font-semibold text-md leading-md text-black">&middot;</span>
                                <div className="font-roboto font-semibold text-md leading-normal text-custom-blue-violet">
                                    {article.category ? article.category.name : 'General'}
                                </div>
                                <span
                                    className="font-roboto font-semibold text-md leading-md text-black">&middot;</span>
                                <div
                                    className="font-roboto font-medium text-md leading-md text-gray-400">{formatLongDate(article.published_at)}</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <img className="rounded-2xl mb-6"
                                 src={article.featured_image}
                                 alt={`${import.meta.env.VITE_APP_NAME} - ${article.title}`}
                            />
                        </div>

                        <div className="font-poppins font-semibold text-custom-blue-violet text-2xl mb-4"
                             dangerouslySetInnerHTML={{__html: article.trail_text}}/>

                        <div dangerouslySetInnerHTML={{__html: applyClassesToHTML(article.content)}}/>
                    </>
                )
            }
        </>
    )
}

export default SingleArticle
