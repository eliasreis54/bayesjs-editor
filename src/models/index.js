import PropTypes, { shape } from 'prop-types';

const cptWithoutParents = PropTypes.objectOf(PropTypes.number).isRequired;

const cptWithParentsItem = shape({
  when: PropTypes.objectOf(PropTypes.string).isRequired,
  then: PropTypes.objectOf(PropTypes.number).isRequired,
});

const cptWithParents = PropTypes.arrayOf(cptWithParentsItem);

const beliefsPropTypes = PropTypes.objectOf(PropTypes.string).isRequired;

const linkagePropTypes = shape({
  networkId: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
});
export const linkagesPropTypes = PropTypes.objectOf(linkagePropTypes);

export const statesPropTypes = PropTypes.arrayOf(PropTypes.string).isRequired;

export const nodePropTypes = shape({
  id: PropTypes.string.isRequired,
  states: statesPropTypes,
  parents: PropTypes.arrayOf(PropTypes.string).isRequired,
  cpt: PropTypes.oneOfType([cptWithoutParents, cptWithParents]),
});

export const positionPropTypes = shape({
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
});

const positionsPropTypes = PropTypes.objectOf(positionPropTypes);

export const networkPropTypes = shape({
  beliefs: beliefsPropTypes,
  height: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  linkages: linkagesPropTypes.isRequired,
  name: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(nodePropTypes),
  positions: positionsPropTypes,
  propertiesPanelVisible: PropTypes.bool.isRequired,
  selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  subnetworks: PropTypes.arrayOf(subnetworkPropTypes), // eslint-disable-line
  width: PropTypes.number.isRequired,
});

export const subnetworkPropTypes = PropTypes.shape({
  ...networkPropTypes,
  color: PropTypes.string.isRequired,
});

export const inferenceResultsPropTypes = PropTypes.object;

export const nodePosition = shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export const sizePropTypes = shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});

const arrowFromTo = shape({
  type: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export const arrowsPropTypes = PropTypes.arrayOf(shape({
  key: PropTypes.string.isRequired,
  from: arrowFromTo.isRequired,
  to: arrowFromTo.isRequired,
  markEnd: PropTypes.bool.isRequired,
  childId: PropTypes.string,
  parentId: PropTypes.string,
}));