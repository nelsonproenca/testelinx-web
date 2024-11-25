import styles from "./styles.module.scss";

type TitleProps = {
  nomeTela: string;
}

const Title = (props: TitleProps) => {
  return (
    <aside className={styles.titleContainer}>
      <p>
        {props.nomeTela}
      </p>
    </aside>
  );
};

export default Title;

