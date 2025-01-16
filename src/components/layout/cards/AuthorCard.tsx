import CustomSVG from "../../ui/media/CustomSVG.tsx";

interface AuthorCardProps {
    author: string;
}

export default function AuthorCard({author}: AuthorCardProps) {
    return (
        <div className="flex items-center justify-center text-center bg-gray-200 p-4 rounded-2xl flex-row space-x-2">
            <div className="w-10 h-10 rounded-full">
                <CustomSVG path="/assets/icons/author.svg" svgClassName="w-full"/>
            </div>
            <div className="font-roboto font-medium text-sm leading-normal">{author}</div>
        </div>
    )
}
