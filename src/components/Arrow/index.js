import React from 'react';
import {
  withProps, pure, compose, withHandlers,
} from 'recompose';
import { omit } from 'ramda';

import PropTypes from 'prop-types';
import { getComponentTestId } from 'utils/test-utils';
import { positionPropTypes } from 'models';
import { makeArrowLine } from 'utils/arrows-positions';

const style = {
  transition: 'stroke-opacity 0.2s',
};
const stylePath = { cursor: 'pointer' };
const omitProps = omit(['markEnd', 'markEndStyle']);

const enhance = compose(
  pure,
  withProps(({
    from,
    to,
    markEnd,
    markEndStyle = 'url(#triangle)',
  }) => ({
    pathD: makeArrowLine(from, to),
    markerEnd: markEnd ? markEndStyle : '',
  })),
  withHandlers({
    onMouseOver: ({ onMouseOver, id }) => () => onMouseOver(id),
    onMouseLeave: ({ onMouseLeave, id }) => () => onMouseLeave(id),
  }),
);

const Arrow = ({
  title,
  markerEnd,
  pathD,
  onMouseOver,
  onMouseLeave,
  ...props
}) => (
  <g
    style={style}
    onMouseOver={onMouseOver}
    onFocus={onMouseOver}
    onMouseLeave={onMouseLeave}
    onBlur={onMouseLeave}
    data-testid={getComponentTestId('Arrow')}
    {...omitProps(props)}
  >
    <path
      d={pathD}
      fill="none"
      stroke="transparent"
      strokeWidth="15"
      style={stylePath}
    >
      {title}
    </path>
    <path
      d={pathD}
      fill="none"
      stroke="#333"
      strokeWidth="2"
      markerEnd={markerEnd}
      style={stylePath}
    >
      {title}
    </path>
  </g>
);

Arrow.defaultProps = {
  markEndStyle: '',
  onMouseOver: () => { },
  onMouseLeave: () => { },
  strokeOpacity: null,
};

Arrow.propTypes = {
  from: PropTypes.objectOf(positionPropTypes).isRequired,
  to: PropTypes.objectOf(positionPropTypes).isRequired,
  onMouseDown: PropTypes.func.isRequired,
  markEnd: PropTypes.bool.isRequired,
  markEndStyle: PropTypes.string,
  markerEnd: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func,
  pathD: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.string,
};

export default enhance(Arrow);
