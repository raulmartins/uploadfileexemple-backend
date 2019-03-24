import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #00C853;
`

const dragReject = css`
  border-color:  #ff0030;

`
export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 2px dashed #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${ props => props.isDragActive && dragActive}
  ${ props => props.isDragReject && dragReject}
`
const messageColors = {
  default: '#999',
  success: '#00C853',
  error: '#ff0030'
}
export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColors[props.type || 'default'] };
  justify-content: center;
  align-items: center;
  padding: 15px 0px;


`