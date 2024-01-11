import * as React from 'react';
import { ProgressBar } from 'baseui/progress-bar';

const CardLoadingPrev = () => {
  const [value] = React.useState(60);
  return (
    <div className="cardLoad">
      <h3>Elaborazione Preventivo</h3>
      <ProgressBar value={value} infinite />
    </div>
  );
};

export default CardLoadingPrev;
