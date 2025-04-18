import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, Container, Row, Col } from 'react-bootstrap'
import { formBuilderButtons, OptionsForFormBuilder } from '../../MyItineraries/AllFields'
import TextFormInput from '@/components/form/TextFormInput'
import CheckboxFormInput from '@/components/form/CheckboxFormInput'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import SelectFormInput from '@/components/form/SelectFormInput'
import EditFormBuilder from './EditFormBuilder'

const FormBuilder = () => {
  const { handleSubmit, control, reset } = useForm({})
  const [fields, setFields] = useState([])
  const [editingField, setEditingField] = useState(null)
  const [options, setOptions] = useState(editingField?.options || [])
  console.log(fields, 'options')
  const addField = (type) => {
    const id = Date.now().toString()
    setFields((prevFields) => [
      ...prevFields,
      {
        id,
        type,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
        placeholder: `Enter ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        text: type === 'checkbox' ? 'Checkbox text' : undefined,
        options: type === 'select' ? OptionsForFormBuilder : undefined,
      },
    ])
  }

  const duplicateField = (fieldId) => {
    const fieldToDuplicate = fields.find((field) => field.id === fieldId)
    if (fieldToDuplicate) {
      const newField = {
        ...fieldToDuplicate,
        id: Date.now().toString(),
        label: `${fieldToDuplicate.label} (Copy)`,
      }
      setFields((prevFields) => [...prevFields, newField])
    }
  }

  const onSubmit = (data) => {
    const result = fields.map((field) => ({
      [field.label.toLowerCase().replace(/\s+/g, '_')]: data[field.id],
    }))
    console.log('Form Data Submitted:', result)
    alert(JSON.stringify(data, null, 2))
  }

  const editField = (field) => {
    setEditingField(field)
    reset({
      [`${field.id}_label`]: field.label,
      [`${field.id}_placeholder`]: field.placeholder || '',
      ...(field.type === 'checkbox' && { [`${field.id}_text`]: field.text }),
    })
  }

  const saveField = (data) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === editingField.id
          ? {
              ...field,
              label: data[`${editingField.id}_label`],
              placeholder: data[`${editingField.id}_placeholder`],
              ...(field.type === 'checkbox' && { text: data[`${editingField.id}_text`] }),
              ...(field.type === 'select' && {
                options,
              }),
            }
          : field,
      ),
    )
    setEditingField(null)
  }

  const deleteField = (fieldId) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId))
  }

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Form Builder</h3>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col>
              {formBuilderButtons?.map((formbuilder, i) => (
                <Button key={i} variant={`outline-${formbuilder.color}`} onClick={() => addField(formbuilder.type)} className="me-2">
                  {formbuilder.name}
                </Button>
              ))}
            </Col>
          </Row>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
              <div key={field.id} className="mb-3 border p-3 rounded">
                <div className="d-flex justify-content-end align-items-center">
                  <Button variant="success" size="sm" className="me-2" onClick={() => editField(field)}>
                    Edit
                  </Button>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => duplicateField(field.id)}>
                    Duplicate
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => deleteField(field.id)}>
                    Delete
                  </Button>
                </div>
                {field.type === 'select' ? (
                  <SelectFormInput name={field.id} control={control} label={field.label} options={field.options} />
                ) : field?.type === 'password' ? (
                  <PasswordFormInput name={field.id} control={control} placeholder={field.placeholder} label={field.label} />
                ) : field?.type === 'checkbox' ? (
                  <CheckboxFormInput name={field.id} control={control} label={field.label} text={field.text} />
                ) : (
                  <TextFormInput name={field.id} control={control} type={field.type} placeholder={field.placeholder} label={field.label} />
                )}
              </div>
            ))}
            {fields.length > 0 && (
              <Button type="submit" variant="primary" className="mt-3">
                Submit Form
              </Button>
            )}
          </form>
        </Card.Body>
      </Card>
      {editingField && (
        <EditFormBuilder
          editingField={editingField}
          setEditingField={setEditingField}
          setOptions={setOptions}
          options={options}
          handleSubmit={handleSubmit}
          saveField={saveField}
          control={control}
        />
      )}
    </Container>
  )
}

export default FormBuilder
