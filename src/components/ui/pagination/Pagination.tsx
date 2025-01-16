import React from 'react';
import {usePagination} from "../../../hooks/usePagination.ts";
import CustomSVG from "../media/CustomSVG.tsx";

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
    currentPage?: number;
}

export default function Pagination({totalPages, onPageChange, currentPage = 1}: PaginationProps) {
    const {goToNextPage, goToPrevPage, goToPage} = usePagination({
        initialPage: currentPage,
        totalPages,
        onPageChange,
    });

    return (
        <div className="flex flex-wrap gap-4 justify-center pt-[43px]">
            <button
                type="button"
                className={`mr-3.5 ${currentPage === 1 && 'opacity-30'}`}
                onClick={goToPrevPage}
                disabled={currentPage === 1}
            >
                <CustomSVG path="/assets/icons/arrow-left.svg"/>
            </button>

            {Array.from({length: totalPages}, (_, index) => (
                <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={`w-[43px] h-[43px] rounded-[5px] border ${currentPage === index + 1 ? 'border-custom-blue-violet bg-custom-blue-violet bg-opacity-5' : 'border-black/10 bg-white'} ${index === totalPages - 1 ? 'mr-0' : 'mr-2'}`}
                >
          <span
              className={`font-roboto font-semibold text-[15px] leading-tight ${currentPage === index + 1 ? 'text-custom-blue-violet' : 'text-black'}`}>
            {index + 1}
          </span>
                </button>
            ))}

            <button
                type="button"
                className={`ml-3.5 ${currentPage === totalPages && 'opacity-30'}`}
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
            >
                <CustomSVG path="/assets/icons/arrow-right.svg"/>
            </button>
        </div>
    );
};
