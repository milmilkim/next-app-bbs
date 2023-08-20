import * as firestore from '@/utils/firestore';
import { useSetAtom } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { QueryConstraint } from 'firebase/firestore';
import { getArray } from '@/utils/firestore';

const useFireStore = () => {
  const isShowSpinner = useSetAtom(isShowSpinnerAtom);

  const wrapper = async <T = any,>(callback: Function) => {
    isShowSpinner(true);
    try {
      const res = await callback();
      return res as T;
    } catch (err) {
      console.error(err);
    } finally {
      isShowSpinner(false);
    }
  };

  const writeData = async <T extends { [x: string]: any }>(
    collctionName: string,
    value: T
  ) => {
    wrapper<T>(async () => {
      const res = await firestore.writeData<T>(collctionName, value);
      return res;
    });
  };

  const getDataList = async <T = any,>(
    collectionName: string,
    ...queryConstraints: QueryConstraint[]
  ) => {
    return wrapper<T>(async () => {
      const res = await firestore.getDataList(
        collectionName,
        ...queryConstraints
      );
      return getArray<T>(res);
    });
  };

  const getData = async <T = any> (collectionName: string, id: string) => {
    return wrapper<T>(async () => {
      const data = await firestore.getData<T>(collectionName, id);
      return data;
    });
  };

  const updateData = async <T extends { [x: string]: any }>(
    collectionName: string,
    id: string,
    value: T
  ) => {
    return wrapper<T>(async () => {
      const data = await firestore.updateData<T>(collectionName, id, value);
      return data;
    });
  };

  const deleteDataListByIds = async (collectionName: string, ids: string[]) => {
    return wrapper(async () => {
      return await firestore.deleteDataList(collectionName, ids);
    });
  };

  const updateDataList = async (
    collectionName: string,
    dataList: {
      id: string;
      data: {
        [x: string]: any;
      };
    }[]
  ) => {
    return wrapper(async () => {
      return await firestore.updateDataList(collectionName, dataList);
    });
  };

  return {
    writeData,
    getDataList,
    getData,
    updateData,
    deleteDataListByIds,
    updateDataList,
  };
};

export default useFireStore;
