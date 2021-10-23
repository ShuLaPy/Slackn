import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = (props: any) => {
  const { percentUploaded, className } = props;
  return (
    <Progress
      className={className}
      percent={percentUploaded}
      indicating
      progress
      success
    />
  );
};

export default ProgressBar;
