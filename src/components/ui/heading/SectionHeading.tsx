import Title from "../typography/Title.tsx";
import CustomSVG from "../media/CustomSVG.tsx";
import {Link} from "react-router-dom";

interface SectionHeadingProps {
    title: string;
    linkTo?: string;
}

export default function SectionHeading({
                                           title, linkTo
                                    }: SectionHeadingProps) {
    return (
        <div className="flex flex-row justify-between pb-6">
            <Title text={title} isSectionTitle={true}/>
            {
                linkTo && (
                    <Link to={linkTo}>
                        <div className="flex flex-row items-center space-x-2">
                        <span
                            className="font-roboto font-bold text-md leading-normal text-custom-blue-violet">See all</span>
                            <CustomSVG path="/assets/icons/arrow.svg" svgClassName="w-4"/>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}
