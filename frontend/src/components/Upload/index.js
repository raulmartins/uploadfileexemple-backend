import React, { Component } from 'react';

import { DropContainer, UploadMessage } from './styles';
import Dropzone from 'react-dropzone'



export default class Upload extends Component {
  renderUploadMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste os arquivos...</UploadMessage>
    }
    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
    }
    return <UploadMessage type="success"> Solte os arquivos!!!</UploadMessage>
  };

  render() {
    const { onUpload } = this.props;
    return (
      <Dropzone accept="image/*" onDropAccepted={onUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}>
            <input {...getInputProps()} />
            {this.renderUploadMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}
