import { DocRaw } from '@/services/doc-raw';

interface DocRawEditProps {
  data: DocRaw;
}

const DocRawEdit = (props: DocRawEditProps) => {
  console.log(props.data);
  return <div>Edit</div>;
};
export default DocRawEdit;
