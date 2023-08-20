'use client';

import dynamic from 'next/dynamic';
import React, {
  SetStateAction,
  Dispatch,
  useMemo,
  LegacyRef,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImage } from '@/utils/storage';
import { useSetAtom, useAtomValue } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import messageAtom from '@/atoms/messageAtom';
import './custom.css';
import styled from 'styled-components';
import {
  notoSansBlack,
  notoSansRegular,
  notoSerifRegular,
} from '@/utils/googleFonts';

interface EditorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

// csr에서만 렌더링 되게 동적 임포트
const EditorComponent = dynamic(
  async () => {
    const { default: Component } = await import('react-quill');

    interface Props extends ReactQuillProps {
      forwardRef: LegacyRef<ReactQuill>;
    }

    const Font = await Component.Quill.import('formats/font');
    Font.whitelist = [...Font.whitelist, 'serif', 'sans'];

    Component.Quill.register(Font, true);

    const Video = await Component.Quill.import('formats/video');

    class YoutubeVideo extends Video {
      static create(value: any) {
        let node = super.create(value);
        value = YoutubeVideo.sanitize(value);
        node.setAttribute('frameborder', '0');
        node.setAttribute('allowfullscreen', 'true');
        node.setAttribute('src', this.transformYoutubeURL(value));
        return node;
      }

      static value(domNode: any) {
        return domNode.getAttribute('src');
      }

      static sanitize(url: string) {
        return url;
      }

      static transformYoutubeURL(url: string): string {
        const youtubeRegExp =
          /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
        const match = url.match(youtubeRegExp);

        if (match && match[1].length === 11) {
          return `https://www.youtube.com/embed/${match[1]}`;
        }
        return url;
      }
    }
    YoutubeVideo.blotName = 'video';
    YoutubeVideo.className = 'ql-video';
    YoutubeVideo.tagName = 'IFRAME';

    Component.Quill.register(YoutubeVideo);

    const ReactQuill: React.FC<Props> = ({ forwardRef, ...props }) => (
      <Component ref={forwardRef} {...props} />
    );
    return ReactQuill;
  },
  { ssr: false }
);

const Editor: React.FC<EditorProps> = ({ value, setValue }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const setIsLoading = useSetAtom(isShowSpinnerAtom);
  const message = useAtomValue(messageAtom);

  // 커스텀 이미지 핸들러
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.addEventListener('change', async () => {
      if (!input.files) {
        return;
      }
      const file = input.files[0];

      try {
        setIsLoading(true);
        const url = await uploadImage(file);

        if (!quillRef.current) {
          return;
        }
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();

        if (!range) {
          return;
        }

        editor.insertEmbed(range.index, 'image', url);
        editor.setSelection(range.index + 1, 0);
      } catch (error) {
        console.error(error);
        message.error('이미지 업로드 실패');
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <StyledWrapper>
      <EditorComponent
        theme='snow'
        forwardRef={quillRef}
        value={value}
        onChange={setValue}
        style={{
          height: '500px',
          fontFamily: 'sans-serif !important',
          marginBottom: '5rem',
        }}
        modules={{
          toolbar: {
            container: [
              [{ font: ['serif', 'sans'] }],
              // [{ header: '1' }, { header: '2' }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              // [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
              ['image', 'video'],
              [{ link: 'auto' }],
            ],

            handlers: { image: imageHandler },
          },
          clipboard: {
            matchVisual: false,
          },
        }}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .ql-font-sans {
    ${notoSansRegular.style}
  }

  .ql-font-sans-serif {
    ${notoSerifRegular.style}
  }
`;

export default Editor;
