interface DescriptionProps {
    text: string;
    classes?: string;
}

export default function Description({
                                         text,
                                         classes = ''
                                     }: DescriptionProps) {
    return (
        <p className={`font-normal text-xs sm:text-xs md:text-sm lg:text-base leading-none ${classes}`}
            dangerouslySetInnerHTML={{__html: text}}/>
    )
}
