import React, {useEffect, useState} from 'react'
import ArticleCard from "../components/layout/cards/ArticleCard.tsx";
import AuthorCard from "../components/layout/cards/AuthorCard.tsx";
import SectionHeading from "../components/ui/heading/SectionHeading.tsx";
import {Article} from "../models/Article.ts";
import {getArticles} from "../requests/Article.ts";
import {getErrorPage} from "../helpers/Requests.ts";
import {useNavigate} from "react-router-dom";
import LastArticle from "./components/home/LastArticle.tsx";
import {Author, Category} from "../models/Misc.ts";
import {getTopAuthors} from "../requests/Author.ts";
import {getTopCategories} from "../requests/Category.ts";

const Home: React.FC = () => {
    const navigate = useNavigate()

    const [lastArticle, setLastArticle] = useState<Article | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [topAuthors, setTopAuthors] = useState<Author[]>([]);
    const [topCategories, setTopCategories] = useState<Category[]>([]);

    useEffect(() => {
        getArticles().then((response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                const data = response.data

                setArticles(data)

                if (data && data.length > 0) {
                    setLastArticle(data[0])
                }
            }
        });

        getTopAuthors().then((response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setTopAuthors(response.data)
            }
        });

        getTopCategories().then((response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setTopCategories(response.data)
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="bg-gray-200 shadow-md p-10 rounded-2xl text-center mb-14">
                <h3 className="font-poppins text-lg font-extralight tracking-[6px] uppercase pb-3">Welcome to
                    DailyHub</h3>
                <h1 className="font-poppins text-2xl font-bold"><span
                    className="text-custom-blue-violet">Your Source</span> for the Latest News, <span
                    className="text-custom-blue-violet">Curated</span> Just for You<span
                    className="text-custom-blue-violet">!</span></h1>
            </div>

            {/*  Hero Article  */}
            {
                lastArticle && (
                    <LastArticle article={lastArticle}/>
                )
            }

            {/*  Latest News  */}
            <div className="mb-14">
                <SectionHeading title="Latest News" linkTo={'/articles'}/>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
                    {
                        articles && articles.length > 0 && (
                            articles.slice(1, 5).map((article) => {
                                return (
                                    <ArticleCard article={article} key={`article-${article.id}`}/>
                                )
                            })
                        )
                    }
                </div>
            </div>

            {/*  Top Creators  */}
            <div className="mb-14">
                <SectionHeading title="Top Creators"/>

                <div className="flex flex-row items-center">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                        {
                            topAuthors && topAuthors.length > 0 && (
                                topAuthors.slice(0, 6).map((author) => {
                                    return (
                                        <AuthorCard author={author.name} key={`author-${author.id}`}/>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>

            {/*  Categories  */}
            {
                topCategories && (
                    <div className="flex flex-col md:flex-row items-stretch mb-14">
                        {
                            topCategories.length > 0 && (
                                <div className="w-full md:w-1/2 pr-2 md:pr-4 pb-4 md:pb-0 flex flex-col">
                                    <SectionHeading title={topCategories[0].name}/>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {
                                            topCategories[0].articles.slice(0, 2).map((article) => {
                                                return (
                                                    <ArticleCard article={{...article, category: topCategories[0]}} key={`article-${article.id}`}/>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }

                        {
                            topCategories.length > 1 && (
                                <div className="w-full md:w-1/2 pl-2 md:pl-4 flex flex-col justify-between">
                                    <SectionHeading title={topCategories[1].name}/>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {
                                            topCategories[1].articles.slice(0, 2).map((article) => {
                                                return (
                                                    <ArticleCard article={{...article, category: topCategories[1]}} key={`article-${article.id}`}/>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default Home
