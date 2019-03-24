import styled from 'styled-components';

export const Container = styled.ul`
  padding: 5px;
  margin: 15px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & + li {
      margin-top: 10px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    overflow:hidden;
  }
  span {
    font-size: 12px;
    color: #999;
    margin-top:5px;
  }
  button {
    color:#ff0030;
    background: transparent;
    cursor: pointer;
    margin-left: 5px;
    border: 0;
  }

`;

export const Preview = styled.div`
  height: 36px;
  width: 36px;
  border-radius: 50px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 5px;
`;

