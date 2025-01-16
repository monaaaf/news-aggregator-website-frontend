import SVG from 'react-inlinesvg'
import {CSSProperties, useEffect, useState} from "react";

const svgCache = new Map();

interface CustomSVGProps {
    path: string;
    svgClassName?: string;
    withCache?: boolean;
    style?: CSSProperties | undefined;
}

export default function CustomSVG({path, svgClassName, withCache, style}: CustomSVGProps) {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        // Check if SVG is already in cache
        if (svgCache.has(path)) {
            setSvgContent(svgCache.get(path));
        } else {
            // If not in cache, fetch the SVG and store it in cache
            fetch(path)
                .then((response) => response.text())
                .then((svg) => {
                    svgCache.set(path, svg);
                    setSvgContent(svg);
                })
                .catch((error) => console.error(`Error fetching SVG: ${error}`));
        }
    }, [path, withCache]);

    if (!svgContent) return null; // Return nothing while loading


    return (
        <>
            {
                withCache ?
                    <div
                        className={svgClassName}
                        dangerouslySetInnerHTML={{__html: svgContent}}
                        style={style}
                    />
                    :
                    <SVG src={path} className={svgClassName} style={style}/>
            }
        </>
    )
}
