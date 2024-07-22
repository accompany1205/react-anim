import React, {useState} from 'react';
import styled from 'styled-components';

const CircleContainer = styled.div`
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  top: ${props => props.top || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${props => props.width || '150px'};
  height: ${props => props.width || '150px'};
  margin: 20px;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background-color: #f0f0f0;
  overflow: hidden;

  &:hover {
    width: ${props => props.hoverwidth || '200px'};
    height: ${props => props.hoverwidth || '200px'};
    left: ${props => props.hoverleft || props.left || 'auto'};
    right: ${props => props.hoverright || props.right || 'auto'};
    top: ${props => props.hovertop || props.top || 'auto'};
    bottom: ${props => props.hoverbottom || props.bottom || 'auto'};
  }

  &:hover .info {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Avatar = styled.img`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const HoverFrame = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  opacity: 0.4;
  background-color: black;
`;

const Info = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  transform: translateY(10px);
  width: 100%;
  transform: ${props => props.hover ? 'scale(1.2, 1.2)' : 'scale(1,1)'};
  h3, p {
    margin: 0;
    text-align: center;
  }
`;

const Circle = ({ imgSrc, index, name, title, hoverwidth, width, left, top, bottom, right, hoverleft, hovertop, hoverbottom, hoverright, hovercolor, mouseEnterCallback, mouseLeaveCallback }) => {
  
  const [isHover, setHover] = useState(false);

  const onMouseEnter = () => {
    setHover(true);
    const changeStatusArr = [];
    if (left !== 'auto' && hoverleft !== 'auto') {
      changeStatusArr.push({
        attribute: 'left',
        change: Number(hoverleft.split('%')[0]) - Number(left.split('%')[0])
      });
      changeStatusArr.push({
        attribute: 'right',
        change: 0 - (Number(hoverleft.split('%')[0]) - Number(left.split('%')[0]))
      });
    }
    if (right !== 'auto' && hoverright !== 'auto') {
      changeStatusArr.push({
        attribute: 'right',
        change: Number(hoverright.split('%')[0]) - Number(right.split('%')[0])
      });
      changeStatusArr.push({
        attribute: 'left',
        change: 0 - (Number(hoverright.split('%')[0]) - Number(right.split('%')[0]))
      });
    }
    if (top !== 'auto' && hovertop !== 'auto') {
      changeStatusArr.push({
        attribute: 'top',
        change: Number(hovertop.split('%')[0]) - Number(top.split('%')[0])
      });
      changeStatusArr.push({
        attribute: 'bottom',
        change: 0 - (Number(hovertop.split('%')[0]) - Number(top.split('%')[0]))
      });
    }
    if (bottom !== 'auto' && hoverbottom !== 'auto') {
      changeStatusArr.push({
        attribute: 'bottom',
        change: Number(hoverbottom.split('%')[0]) - Number(bottom.split('%')[0])
      });
      changeStatusArr.push({
        attribute: 'top',
        change: 0 - (Number(hoverbottom.split('%')[0]) - Number(bottom.split('%')[0]))
      });
    }
    mouseEnterCallback(index, changeStatusArr);
  };

  const onMouseLeave = () => {
    setHover(false);
    mouseLeaveCallback();
  };

  return (
    <CircleContainer 
      hoverwidth={hoverwidth}
      width={width}
      left={left}
      top={top}
      bottom={bottom}
      right={right}
      hoverleft={hoverleft}
      hovertop={hovertop}
      hoverbottom={hoverbottom}
      hoverright={hoverright}
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
    >
      <Avatar src={imgSrc} alt={name} hover={isHover}/>
      {!isHover && (
        <HoverFrame hovercolor={hovercolor}/>
      )}
      <Info className="info">
        <h3>{name}</h3>
        <p>{title}</p>
      </Info>
    </CircleContainer>
  );
};

export default Circle;
