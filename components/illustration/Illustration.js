import style from "./Illustration.module.css";

const Illustration = (props) => {
  return (
    <>
      <div className={style.illustrationCtn}>
        <img src={props.imageSrc} alt="illus" className={style.illustration} />
      </div>
    </>
  );
};

export default Illustration;
