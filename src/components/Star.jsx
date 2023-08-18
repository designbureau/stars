import { useRef, useContext, useEffect } from "react";
import { RefContext } from "./RefContext";
import Planet from "./Planet";
import StarItem from "../Star";

const Star = ({ data, index }) => {
  const ref = useRef();
  const { addRef } = useContext(RefContext);
  const name = data.name ? data.name[0] : "Unnamed star";

  useEffect(() => {
    addRef(name, ref);
  }, [name, addRef]);

  return (
    <group
      className="star"
      ref={ref}
      // data-name={name}
      onClick={(e) => {
        e.stopPropagation();
        console.log(ref.current);
      }}
    >
      <StarItem data={data} index={index}/>
      {/* <p>Star: {name}</p> */}
      {data.planet &&
        data.planet.map((planet, index) => (
          <Planet key={index} data={planet} />
        ))}
    </group>
  );
};

export default Star;
