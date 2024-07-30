import "./index.css";

interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return (
    <div className="title-container">
      <h1 className="title" data-text={text}>
        {text}
      </h1>
    </div>
  );
}

export default Title;
