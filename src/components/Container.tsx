import styled from "@emotion/styled";

const Container = styled.div<{ width?: number }>`
  width: ${(props) => `${props.width || 1200}px`};
  margin: auto;
  min-height: 100vh;
  box-sizing: border-box;
`;

export default Container;
