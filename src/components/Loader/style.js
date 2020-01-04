import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 100vw;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    z-index: 99;
  }
  /* &.fade-enter {
    transform: translateX(100%);
  }
  &.fade-enter-active {
    transform: translateX(0);
    transition: transform 2000ms linear;
  } */

  &.fade-exit {
    transform: translateX(0);
    &::after {
      transform: translateX(0);
    }
  }
  &.fade-exit-active {
    transform: translate(-100vw);
    transition: transform 400ms ease-in-out;
    &::after {
      transform: translateX(-100vw);
      transition: transform 400ms ease-in;
    }
  }
`
export default Container
