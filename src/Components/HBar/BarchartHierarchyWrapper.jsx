import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import BarChartHierarchy from "./BarChartHierarchy.js";

const BarchartHierarchyWrapper = props => {
  const targetRef = useRef(null);

  useEffect(() => {
    const bh = BarChartHierarchy(targetRef.current);
    console.log("bh update", props.data);
    bh.update(props.data);
  });

  console.log("bh render", props.data);
  return (
    <div className="BarchartHierarchyWrapper">
        <div className="full-width-height container">
            <h1 className="no-margin center">STATE CASES HIERARCHY</h1>
            <br></br>
            <br></br>
            <div ref={targetRef}></div>
        </div>
    </div>
  );
};

BarchartHierarchyWrapper.propTypes = {
  data: PropTypes.object.isRequired
};

export default BarchartHierarchyWrapper;