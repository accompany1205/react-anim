import React, { useState } from 'react';
import Circle from './Circle';
import styled from 'styled-components';
import Image from './2.jpg';

const Container = styled.div`
  position: relative;
  height: 800px;
`;

const StableCircle = styled.div`
  position: absolute;
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  top: ${props => props.top || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  width: ${props => `${props.width}px` || "100px"};
  height: ${props => `${props.width}px` || "100px"};
  border-radius: 50%;
  background-color: ${props => props.color || "yellow"};
  transition: all 0.3s ease-in-out;
`

const positionList = [
  {
    left: 30,
    top: 10,
    right: 'auto',
    bottom: 'auto',
    width: 200,
    hoverwidth: 250,
    hoverleft: 28,
    hovertop: 7,
    hoverright: 'auto',
    hoverbottom: 'auto',
    hovercolor: 'red',
  },
  {
    right: 30,
    bottom: 20,
    left: 'auto',
    top: 'auto',
    width: 200,
    hoverwidth: 250,
    hoverleft: 'auto',
    hovertop: 'auto',
    hoverright: 32,
    hoverbottom: 22,
    hovercolor: 'blue',
  },
  {
    left: 30,
    bottom: 15,
    right: 'auto',
    top: 'auto',
    width: 200,
    hoverwidth: 250,
    hoverright: 'auto',
    hovertop: 'auto',
    hoverleft: 32,
    hoverbottom: 17,
    hovercolor: 'yellow',
  },
  {
    right: 40,
    top: 10,
    left: 'auto',
    bottom: 'auto',
    width: 200,
    hoverwidth: 250,
    hoverleft: 'auto',
    hoverbottom: 'auto',
    hoverright: 42,
    hovertop: 12,
    hovercolor: 'pink',
  },
];

const stablePositionList = [
  {
    left: 10,
    top: 5,
    right: 'auto',
    bottom: 'auto',
    width: 150,
    color: 'red',
  },
  {
    left: 18,
    top: 35,
    right: 'auto',
    bottom: 'auto',
    width: 130,
    color: 'yellow',
  },
  {
    right: 12,
    bottom: 15,
    left: 'auto',
    top: 'auto',
    width: 130,
    color: 'Pink',
  },
  {
    right: 10,
    top: 5,
    left: 'auto',
    bottom: 'auto',
    width: 150,
    color: 'red',
  },
  {
    right: 25,
    top: 5,
    left: 'auto',
    bottom: 'auto',
    width: 100,
    color: 'blue',
  },
  {
    right: 18,
    top: 35,
    left: 'auto',
    bottom: 'auto',
    width: 130,
    color: 'yellow',
  },
  {
    left: 12,
    bottom: 15,
    right: 'auto',
    top: 'auto',
    width: 130,
    color: 'Pink',
  },
]

function App() {
  const [positionArray, setPositionArray] = useState(positionList);
  const [stableCirclePosArray, setStatbleCirclePosArray] = useState(stablePositionList);

  function getRandomSign() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  const mouseEnterCallback = (index, change) => {
    setPositionArray((prevState) => {
      return prevState.map((item, _index) => {
        if (index !== _index) {
          const _item = { ...item };
          change.forEach((changeItem) => {
            if (_item[changeItem.attribute] !== 'auto') {
              _item[changeItem.attribute] += changeItem.change;
            }
          });
          return _item;
        }
        return item;
      });
    });
    setStatbleCirclePosArray((prevState) => {
      return prevState.map((item, _index) => {
        if (index !== _index) {
          const _item = { ...item };
          change.forEach((changeItem) => {
            if (_item[changeItem.attribute] !== 'auto') {
              _item[changeItem.attribute] += getRandomSign()*changeItem.change;
            }
          });
          return _item;
        }
        return item;
      });
    });
  };

  const mouseLeaveCallback = () => {
    setPositionArray(positionList);
    setStatbleCirclePosArray(stablePositionList)
  };

  return (
    <Container>
      {positionArray.map((pos, index) => (
        <Circle
          key={index}
          imgSrc={Image}
          index={index}
          left={pos.left === 'auto' ? 'auto' : `${pos.left}%`}
          right={pos.right === 'auto' ? 'auto' : `${pos.right}%`}
          top={pos.top === 'auto' ? 'auto' : `${pos.top}%`}
          bottom={pos.bottom === 'auto' ? 'auto' : `${pos.bottom}%`}
          hoverbottom={pos.hoverbottom === 'auto' ? 'auto' : `${pos.hoverbottom}%`}
          hovertop={pos.hovertop === 'auto' ? 'auto' : `${pos.hovertop}%`}
          hoverleft={pos.hoverleft === 'auto' ? 'auto' : `${pos.hoverleft}%`}
          hoverright={pos.hoverright === 'auto' ? 'auto' : `${pos.hoverright}%`}
          mouseEnterCallback={mouseEnterCallback}
          mouseLeaveCallback={mouseLeaveCallback}
          width="200px"
          hoverwidth="300px"
          name={`Name ${index + 1}`}
          title={`Title ${index + 1}`}
          hovercolor={pos.hovercolor}
        />
      ))}
      {stableCirclePosArray.map((pos, index) => (
        <StableCircle 
          key={index} 
          color={pos.color}
          width={pos.width} 
          left={pos.left === 'auto' ? 'auto' : `${pos.left}%`}
          right={pos.right === 'auto' ? 'auto' : `${pos.right}%`}
          top={pos.top === 'auto' ? 'auto' : `${pos.top}%`}
          bottom={pos.bottom === 'auto' ? 'auto' : `${pos.bottom}%`}
        />
      ))}
    </Container>
  );
}

export default App;
