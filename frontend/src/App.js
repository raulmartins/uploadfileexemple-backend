import React, { Component } from 'react';
import GlobalSyle from './Styles/GlobalStyles'
import { uniqueId } from 'lodash'
import filesize from 'filesize'
import { Container, Content } from './styles'
import Upload from './components/Upload'
import FileList from './components/FileList'
import api from './Services/api'
class App extends Component {
  state = {
    uploadedFiles: [],
  }
  async componentDidMount() {
    const response = await api.get('posts')
    console.log(response)
    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        preview: file.URL,
        url: file.URL,
        readableSize: filesize(file.size),
        uploaded: true
      }))

    })
  }

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
  }

  handleUpload = (files) => {
    console.log(files)
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }))
    this.setState({ uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles) })
    uploadedFiles.forEach(this.processUploaded)
  }

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile
      })
    })
  }
  processUploaded = (uploadedFile) => {
    const data = new FormData()
    data.append('file', uploadedFile.file, uploadedFile.name)
    api.post('posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total))
        this.updateFile(uploadedFile.id, { progress })
      }
    }).then(response => {
      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data._id,
        url: response.data.URL
      })
    }).catch(error => {
      this.updateFile(uploadedFile.id, {
        error: true
      })
    })
  }

  handleDelete = async id => {
    await api.delete(`posts/${id}`)
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    })
  }

  render() {
    const { uploadedFiles } = this.state
    return (<Container>
      <Content>
        <Upload onUpload={this.handleUpload} />

        {!!uploadedFiles.length && (<FileList files={uploadedFiles} onDelete={this.handleDelete} />)}

      </Content>
      <GlobalSyle />
    </Container>)
  }
}

export default App;
