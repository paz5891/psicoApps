import React from 'react'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadFile from '../helpers/UploadFile';
import { URL } from '../../config/option'

const ComboInput = ({
  colorCombo = true,
  labelCKeditor,
  getCkeditor,
  handleBlurCK,
  requiredCkeditor = false,
  nameCK,
  getfile,
  nameFile,
  handleChangeFile,
  requiredFile = false,
  isFile = true,
  isArchivo= false
}) => {


  return (
    <article className={colorCombo ? 'contenedor-combo color1' : 'contenedor-combo'}>
      <h3 className="Title16">
        {labelCKeditor}
      </h3>
      {
        isFile
          ?
          <div>

            <div>
              <label htmlFor="#" className="label">
                Descripción <span className="require">{requiredCkeditor ? '(Requerido)' : null}</span>
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={getCkeditor}
                onInit={editor => {
                }}
                onBlur={(event, editor) => {
                  const data = {
                    value: editor.getData(),
                    is: true,
                    name: nameCK
                  }
                  handleBlurCK(data)
                }}
              />
            </div>
            {
              isArchivo
                ?
                <div className="ed-grid s-grid-3">
                  <div className="s-cols-2">
                    <label className="label" htmlFor="#">Archivo <span className="require">{requiredFile ? '(Requerido)' : null}</span></label>
                    <div className="forms">
                      <div className="file-upload-wrapper" data-text={
                        getfile
                          ? getfile.name || `Adjunto.${getfile.slice((getfile.lastIndexOf(".") - 1 >>> 0) + 2)}`
                          : 'Seleccionar archivo'
                      }>
                        <input name={nameFile} onChange={handleChangeFile} type="file" className="file-upload-field" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <UploadFile valor={false} URL={`${URL}attachment/${getfile}`} />
                  </div>
                </div>
                :
                <div>
                  <label className="label" htmlFor="#">Archivo <span className="require">{requiredFile ? '(Requerido)' : null}</span></label>
                  <div className="forms">
                    <div className="file-upload-wrapper" data-text={
                      getfile
                        ? getfile.name || `Adjunto.${getfile.slice((getfile.lastIndexOf(".") - 1 >>> 0) + 2)}`
                        : 'Seleccionar archivo'
                    }>
                      <input name={nameFile} onChange={handleChangeFile} type="file" className="file-upload-field" />
                    </div>
                  </div>
                </div>
            }
          </div>
          :
          <div className="ed-grid s-grid-3">
            <div className="s-cols-2">
              <label className="label" htmlFor="#">Archivo <span className="require">{requiredFile ? '(Requerido)' : null}</span></label>
              <div className="forms">
                <div className="file-upload-wrapper" data-text={
                  getfile
                    ? getfile.name || `Adjunto.${getfile.slice((getfile.lastIndexOf(".") - 1 >>> 0) + 2)}`
                    : 'Seleccionar archivo'
                }>
                  <input name={nameFile} onChange={handleChangeFile} type="file" className="file-upload-field" />
                </div>
              </div>
            </div>
            <div>
              <UploadFile valor={false} URL={`${URL}attachment/${getfile}`} />
            </div>
          </div>
      }
    </article>
  )
}

export default ComboInput
