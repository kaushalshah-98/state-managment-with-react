import { WatchClickOutside } from '@shared/modals/watchClickOutside';
import { range } from '@utils';
import { FC, useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-feather';

type SequenceProps = {
  page: number;
  activeClass?: object;
  changePage: any;
  arrr: number[];
};
const SequenceGenerator: FC<SequenceProps> = (props): any => {
  const { page, activeClass, changePage, arrr } = props;
  const handlePageChange = (x: number, event: any) => {
    event.preventDefault();
    changePage(x);
  };
  const list = arrr.map((x: number, i: number) => (
    <button
      style={page === x ? activeClass : { color: '#9F7AEA' }}
      onClick={(event) => handlePageChange(x, event)}
      key={i}
      className={`${
        page === x ? '' : 'hover:text-gray-500'
      } hidden md:inline-flex -ml-px relative items-center px-3 py-1 border border-gray-300 bg-white text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-purplee-100 active:text-gray-700 transition ease-in-out duration-150`}
    >
      {x}
    </button>
  ));
  return list;
};
type PaginationProps = {
  totalPages?: number;
  page?: number;
  activeClass?: object;
  changePage: any;
  totalRecords?: number;
  limit?: number;
};
export const Pagination: FC<PaginationProps> = (props) => {
  const [numbersToShow, setNumbersToShow] = useState(10);
  const { totalPages = 0, totalRecords, page = 1, activeClass, changePage, limit } = props;
  const [arrr, setarr]: [number[], any] = useState([1]);
  const start = arrr[0];
  const end = arrr[arrr.length - 1];
  let right = numbersToShow && arrr[numbersToShow - 1];
  // const totalarray = [...Array.from(Array(totalPages || 0), (_, i) => i + 1)];

  useEffect(() => {
    setarr(
      totalPages > 4
        ? [...Array.from(Array(numbersToShow ? numbersToShow : 4), (_, i) => i + 1)]
        : [...Array.from(Array(totalPages), (_, i) => i + 1)]
    );
  }, [totalPages]);

  const Previous = (event: any) => {
    event.preventDefault();
    if (start <= 1) {
      return;
    }
    if (end === totalPages) {
      right = start - 1;
    } else {
      right = right - numbersToShow;
    }
    const numarr = range(start - numbersToShow, right);
    setarr([...numarr]);
  };
  const Next = (event: any) => {
    event.preventDefault();
    if (end >= totalPages) {
      return;
    }
    if (right + numbersToShow >= totalPages) {
      right = totalPages;
    } else {
      right = right + numbersToShow;
    }
    const numarr = range(start + numbersToShow, right);
    setarr([...numarr]);
  };

  const NumbersToShowProps = {
    numbersToShow,
    setNumbersToShow
  };

  return (
    <>
      {totalRecords && totalRecords !== 0 && limit && (
        <div className="bg-white px-4 py-5 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm leading-5 flex space-x-2 text-gray-700">
                <span> Showing </span>
                <span className="font-medium">{(page - 1) * limit + 1}</span>
                <span>to</span>
                <span className="font-medium">
                  {(page - 1) * limit + limit > totalRecords
                    ? totalRecords
                    : (page - 1) * limit + limit}
                </span>
                <span>of</span>
                <span className="font-medium">{totalRecords}</span>
                <span>results</span>
              </p>
            </div>
            <nav className="relative z-0 inline-flex">
              <button
                onClick={Previous}
                className={`${
                  start <= 1 ? 'cursor-not-allowed ' : ' '
                } relative inline-flex items-center p-1 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-purplee-100 active:text-gray-500 transition ease-in-out duration-150`}
                aria-label="Previous"
              >
                <ChevronLeft size="20" />
              </button>
              <SequenceGenerator
                arrr={arrr}
                changePage={changePage}
                page={page}
                activeClass={activeClass}
              />
              <button
                onClick={Next}
                className={`${
                  end >= totalPages ? 'cursor-not-allowed ' : ' '
                } -ml-px relative inline-flex items-center p-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-purplee-100 active:text-gray-500 transition ease-in-out duration-150`}
                aria-label="Next"
              >
                <ChevronRight size="20" />
              </button>
              <NumbersToShow {...NumbersToShowProps} />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

const NumbersToShow: FC<any> = (props) => {
  const { numbersToShow, setNumbersToShow } = props;
  const [state, setstate] = useState(false);
  const [optionList] = useState([5, 10, 20, 50, 100]);

  const handleClick = (value: number) => {
    setNumbersToShow(value);
    setstate(false);
  };

  return (
    <>
      <div className="inline-flex items-center ml-4">
        <WatchClickOutside onClickOutside={() => setstate(false)}>
          <button
            className="inline-flex items-center space-x-2 p-2 border text-sm leading-5 font-medium rounded-md"
            onClick={() => setstate(!state)}
          >
            <p className="text-gray-600">{numbersToShow}/page</p>
            <ChevronDown size="18" />
          </button>
          {state && (
            <>
              <div className="origin-top-right bottom-full ml-10 z-10 absolute mt-3 rounded-lg shadow-md">
                <div className="rounded-lg bg-white py-2 shadow-lg border border-solid border-input-border">
                  {!optionList || optionList.length <= 0 ? (
                    <div className="p-5">
                      {/* <FeatherIcon.Meh size="16" /> */}
                      <div className="flex justify-center">No Results found</div>
                    </div>
                  ) : (
                    <div className="">
                      {optionList?.map((value, index) => (
                        <div
                          key={index}
                          onClick={() => handleClick(value)}
                          className=" flex items-center hover:bg-purplee-100"
                        >
                          <div className="flex items-center px-3 ">
                            <label
                              htmlFor="isAgreedToTC"
                              className="ml-2 text-sm font-hairline normal-case   py-1 text-gray-600"
                            >
                              {value}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </WatchClickOutside>
      </div>
    </>
  );
};
