interface TitleProps {
    text: string;
    isHero?: boolean;
    isSectionTitle?: boolean;
    classes?: string;
}

export default function Title({
                                  text,
                                  isHero = false,
                                  isSectionTitle = false,
                                  classes = ''
                              }: TitleProps) {
    return (
        <>
            {
                isHero
                    ?
                    <h1 className={`font-poppins font-semibold text-xl md:text-4xl leading-xl md:leading-4xl tracking-[2.72px] text-black uppercase ${classes}`}
                        dangerouslySetInnerHTML={{__html: text}}/>
                    :
                    isSectionTitle
                        ?
                        <h2 className={`font-poppins text-lg md:text-3xl leading-lg md:leading-3xl font-semibold text uppercase ${classes}`}
                            dangerouslySetInnerHTML={{__html: text}}/>
                        :
                        <h2 className={`font-poppins font-semibold text-xs lg:text-base text uppercase ${classes}`}
                            dangerouslySetInnerHTML={{__html: text}}/>
            }
        </>
    )
}
