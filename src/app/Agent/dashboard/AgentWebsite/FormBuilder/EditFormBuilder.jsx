import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import TextFormInput from '@/components/form/TextFormInput'

export default function EditFormBuilder({ editingField,options, setOptions, setEditingField, handleSubmit, saveField, control }) {
  useEffect(() => {
    setOptions(editingField.options || [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingField])

  const handleAddOption = () => {
    setOptions([...options, { label: '', value: '' }])
  }

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, idx) => idx !== index)
    setOptions(updatedOptions)
  }

  const handleOptionChange = (e, index, field) => {
    const updatedOptions = [...options]
    updatedOptions[index][field] = e.target.value
    setOptions(updatedOptions)
  }

  return (
    <Modal show onHide={() => setEditingField(null)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Field</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(saveField)}>
          {/* Label Input */}
          <div className="mb-3">
            <Controller
              name={`${editingField.id}_label`}
              control={control}
              defaultValue={editingField.label}
              render={({ field }) => <TextFormInput {...field} label="Edit Label" control={control} />}
            />
          </div>

          {editingField.type !== 'checkbox' && (
            <div className="mb-3">
              <Controller
                name={`${editingField.id}_placeholder`}
                control={control}
                defaultValue={editingField.placeholder || ''}
                render={({ field }) => <TextFormInput {...field} label="Edit Placeholder" control={control} />}
              />
            </div>
          )}

          {editingField.type === 'checkbox' && (
            <div className="mb-3">
              <Controller
                name={`${editingField.id}_text`}
                control={control}
                defaultValue={editingField.text || ''}
                render={({ field }) => <TextFormInput {...field} label="Edit Checkbox Text" control={control} />}
              />
            </div>
          )}

          {editingField.type === 'select' && (
            <div className="mt-3">
              {options?.length !== 0 && <label>Edit Options </label>}
              {options.map((option, index) => (
                <div className="d-flex align-items-center mb-2" key={index}>
                  <input
                    type="text"
                    className="form-control me-2"
                    value={option.label}
                    onChange={(e) => handleOptionChange(e, index, 'label')}
                    placeholder="Option label"
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    value={option.value}
                    onChange={(e) => handleOptionChange(e, index, 'value')}
                    placeholder="Option value"
                  />
                  <Button variant="danger" size="sm" onClick={() => handleRemoveOption(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline-primary" onClick={handleAddOption}>
                Add Option
              </Button>
            </div>
          )}

          <Button variant="danger" className="mt-2 me-2" onClick={() => setEditingField(null)}>
            Cancel
          </Button>
          <Button type="submit" variant="success" className="mt-2">
            Save
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
