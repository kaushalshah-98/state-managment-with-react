import { Label } from '@src/shared';
import React, { FC, memo } from 'react';
import * as Feather from 'react-feather';

type TagProps = {
  data: any[];
  className?: string;
  label?: string;
  isError?: boolean;
  errMsg?: string;
  remove?: (item: any) => void;
  displayOnly?: boolean;
};
const Tags: FC<TagProps> = memo((props) => {
  const { data, className, label, isError, errMsg, remove, displayOnly } = props;
  return (
    <div className={className}>
      {label && (
        <div className="flex space-x-3 items-center mb-5">
          <Label label={label} className="block text-sm font-medium leading-5  text-gray-500" />
          <span className="bg-blue-100 border border-gray-300 py-1.5 px-2 items-center flex leading-3 justify-center rounded-full text-black-600 text-xs">
            {data?.length}
          </span>
        </div>
      )}
      <div className="align-middle mt-1 mb-1 flex ml-1">
        <div className="grid grid-cols-12 gap-4">
          {data?.map((item, index) => {
            return (
              <div key={index} className="col-span-6 sm:col-span-2">
                <span className="rounded-md border border-gray-300  text-left text-sm font-medium py-1 leading-6 px-2 shadow-sm bg-gray-100 flex justify-between items-center">
                  <p className="break-words">{item}</p>
                  {!displayOnly && (
                    <Feather.X
                      onClick={() => (remove ? remove(item) : {})}
                      className="ml-3 cursor-pointer"
                      size="18"
                      color="gray"
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {isError && (
        <span className="mt-2 flex text-xs font-small text-red-500 items-center">{errMsg}</span>
      )}
    </div>
  );
});
export default memo(Tags);
