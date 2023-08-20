type FormItemType = 'TEXT' | 'EMAIL' | 'NUMBER' | 'CHECK' | 'RADIO' | 'DATE';

interface FormItem {
  name: string;
  required: boolean;
  id: string;
  type: FormItemType;
  child?: FormItem[];
}

type FormSection = FormItem[];
