import style from "./Illustration.module.css";

const Illustration = (props) => {
  return (
    <>
      <div className={`${style.illustrationCtn} w-full md:w-[50%] lg:w-[50%]`}>
        <img
          src={props.imageSrc}
          alt="illus"
          className={`${style.illustration} w-[75%] md:w-[70%] lg:w-[70%]`}
        />
      </div>
    </>
  );
};

export default Illustration;
