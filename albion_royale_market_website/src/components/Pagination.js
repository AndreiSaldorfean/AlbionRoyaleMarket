import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const goToNextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <>
        <div className='d-flex justify-content-center'>
            <button className='previous_btn me-3 mt-auto mb-auto'  onClick={goToPrevPage} />
            <p className='me-3 mt-auto mb-auto' >
                {currentPage}
            </p>
            <button className='next_btn mt-auto mb-auto' onClick={goToNextPage}/>
        </div>
        </>
    )
}

export default Pagination