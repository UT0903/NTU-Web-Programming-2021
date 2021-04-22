import styled from "styled-components";

export const Sheet = styled.div`
  display: grid;
  grid-template-columns: 40px repeat(
    ${props => props.numberOfColumns - 1},
    120px
  );
  grid-auto-rows: 28px;
`;

export const Header = styled.div`
  background:${props => props.focused ? 'rgb(205, 205, 205)' : 'rgb(243, 242, 241)'};
  color: #282828;
  text-align: center;
  line-height: 28px;
`;

export const InputCell = styled.div`
  background:'rgb(255, 255, 255)';
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 4px 4px;
  :not(:focus) {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  :focus {
    border: 1px solid #1581ba;
    caret-color: ${props => props.DblClick ? 'auto' : 'transparent'};
  }
`;