import React from 'react';
import { Container, FileInfo, Preview } from './styles';
import CircularProgressBar from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

const FileList = ({ files, onDelete }) => (

  <Container>
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={uploadedFile.preview} />
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>{uploadedFile.readableSize}
              {!!uploadedFile.url && (<button onClick={()=>{onDelete(uploadedFile.id)}}>Excluir</button>)}
            </span>
          </div>
        </FileInfo>
        <div>

          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressBar
              styles={{
                root: { width: 24 },
                path: { stroke: "#00C853" }
              }}
              stokeWidth={10}
              percentage={uploadedFile.progress}
            />
          )}

          {!!uploadedFile.url && (
            <a
              href={uploadedFile.preview}
              target="_blank"
              rel="noopener noreferrer">
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}

          {!!uploadedFile.uploaded && (<MdCheckCircle size={24} color="#00C853" />)}
          {!!uploadedFile.error && (<MdError size={24} color="#ff0030" />)}
        </div>
      </li>
    ))}
  </Container>
)

export default FileList;
