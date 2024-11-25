import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from './styles.module.scss'

type EditorProps = {
  value: string;
  getValue: (content: string) => void;
};

const QuillEditor = ({ value, getValue }: EditorProps) => {
  const handleChange = (content: string) => {
    // A função getValue irá atualizar o valor no componente pai
    getValue(content);
  };

  return (
    
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ["bold"],
            ["italic"],
            ["underline"],
            ["strike"],
            ["blockquote"],
            [{ align: [] }],
            [{ color: [] }],
            [{ background: [] }],
            [{ list: "ordered" }],
            [{ list: "bullet" }],
            ["link"],
            ["image"],
          ],
          
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "link",
          "color",
          "image",
          "background",
          "align",
          "size",
          "font",
        ]}
        placeholder="Digite o texto aqui..."
        className={styles.quillEditor}
      />
    
  );
};

export default QuillEditor;
