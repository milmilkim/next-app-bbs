'use client';

import { Board } from '@/types/board';
import { Select } from 'antd';
import { SetStateAction } from 'jotai';
import { Dispatch, useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  setCategoryId: Dispatch<SetStateAction<string>>;
  data: Board[];
}

const SelectCategory: React.FC<Props> = ({ setCategoryId, data }) => {
  const changeCategory = useCallback((val: string) => {
    setCategoryId(val);
  }, []);

  const options = useMemo(() => {
    return data.map((v) => ({
      value: v.id,
      label: v.title,
    }));
  }, [data]);

  return (
    <Select
      showSearch
      onChange={changeCategory}
      style={{ width: 200 }}
      placeholder='카테고리 선택'
      optionFilterProp='children'
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={options}
    />
  );
};

export default SelectCategory;
