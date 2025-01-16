import {useState, useCallback} from 'react';

interface UsePaginationProps {
    initialPage?: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const usePagination = ({initialPage = 1, totalPages, onPageChange}: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const goToPage = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
                onPageChange(page);
            }
        },
        [onPageChange, totalPages]
    );

    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }, [currentPage, goToPage, totalPages]);

    const goToPrevPage = useCallback(() => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }, [currentPage, goToPage]);

    return {currentPage, goToPage, goToNextPage, goToPrevPage, totalPages};
};
