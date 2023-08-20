import { firestore } from '@/lib/firebase';
import {
  QueryConstraint,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  QuerySnapshot,
  DocumentData,
  writeBatch,
  deleteDoc,
} from 'firebase/firestore';

export const revalidate = 0 

/**
 * create
 */

// 데이터 하나 추가
export const writeData = async <T extends { [x: string]: any }>(
  collectionName: string,
  value: T
) => {
  const docRef = await addDoc(collection(firestore, collectionName), value);
  return {
    id: docRef.id,
  };
};

/**
 * read
 */

// 아이디로 단일 데이터 조회
export const getData = async <T = any>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  const docRef = doc(firestore, collectionName, id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as T;
  } else {
    return null;
  }
};

// 컬렉션의 모든 데이터 조회
export const getAllDataList = async <T>(
  collectionName: string
): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(firestore, collectionName));

  const dataList: T[] = [];
  querySnapshot.forEach((doc) => {
    dataList.push({ ...doc.data(), id: doc.id } as T);
  });

  return dataList;
};

// 컬렉션 여러 데이터 조회
export const getDataList = async (
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
) => {
  const q = query(collection(firestore, collectionName), ...queryConstraints);

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

/**
 * update
 */

// 문서 하나 수정
export const updateData = async <T extends { [x: string]: any }>(
  collectionName: string,
  id: string,
  value: T
) => {
  const docRef = await updateDoc(doc(firestore, collectionName, id), value);
  return docRef;
};

// 문서 여러 개 수정
export const updateDataList = async <T extends { [x: string]: any }>(
  collectionName: string,
  dataList: { id: string; data: T }[]
) => {
  const batch = writeBatch(firestore);

  dataList.forEach((data) => {
    const docRef = doc(firestore, collectionName, data.id);
    batch.update(docRef, data.data);
  });

  await batch.commit();

  return { status: 'ok' };
};

/**
 * delete
 */

// 단일 문서 삭제
export const deleteData = async (collectionName: string, id: string) => {
  return await deleteDoc(doc(firestore, collectionName, id));
};

// 여러 문서 아이디로 일괄 삭제
export const deleteDataList = async (collectionName: string, ids: string[]) => {
  const batch = writeBatch(firestore);

  ids.forEach((id) => {
    const docRef = doc(firestore, collectionName, id);
    batch.delete(docRef);
  });

  await batch.commit();

  return { status: 'ok' };
};

/**
 * etc
 */

// 여러 데이터를 배열로 변환
export const getArray = <T>(
  snapshot: QuerySnapshot<DocumentData, DocumentData>
): T[] => {
  const dataList: T[] = [];
  snapshot.forEach((doc) => {
    dataList.push({ ...doc.data(), id: doc.id } as T);
  });

  return dataList;
};
