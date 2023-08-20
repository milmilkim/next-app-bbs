import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const uploadFile = async (path: string, file: Blob, fileName: string) => {
  const somethingRef = ref(storage, `${path}/${fileName}`);
  const snapshot = await uploadBytes(somethingRef, file);

  return snapshot;
};

const getFileUrl = async (path: string) => {
  const url = await getDownloadURL(ref(storage, path));

  return url;
};

export const uploadImage = async (file: Blob) => {
  const fileName = `${v4()}+${file.name}`;
  const filePath = 'images/' + fileName;
  await uploadFile('images/', file, fileName);
  return getFileUrl(filePath);
};
