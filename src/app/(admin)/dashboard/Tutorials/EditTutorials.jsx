import React, { useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFormInput from '@/components/form/TextFormInput'
import FileFormInput from '@/components/form/FileFormInput'
import { Button, Card, Container, Form, Row, Col, Spinner, OverlayTrigger, Popover, PopoverBody } from 'react-bootstrap'
import { validationSchema } from './AddTutorialsSchema'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { EditTutorialsService } from '@/utils/Services/TutorialsServices'
import ViewVedio from './ViewVedio'

export default function EditTutorials() {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)

  const [video, setvideo] = useState('')
  const [show, setshow] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()
  // console.log(state)
  const defaultValues = useMemo(
    () => ({
      tutorials:
        state?.map((e) => ({
          title: e?.title || '',
          video: e?.video || '',
        })) || [],
    }),
    [state],
  )
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })
  const Data = watch()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tutorials',
  })

  const onSubmit = () => {
    EditTutorialsService(Data, navigate, showNotification, setloading, id)
  }
  const Handleopen = (video) => {
    // console.log(video)
    setvideo(video)

    setshow(true)
  }
  const handleclose = () => {
    setshow(false)
  }
  return (
    <>
      <Container>
        <Card className="mb-3 p-4 " style={{ width: '400px', margin: '0 auto', height: 'auto' }}>
          <h3>Create New Tutorials</h3>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                {fields.map((item, index) => (
                  <div key={index}>
                    <TextFormInput name={`tutorials.${index}.title`} label="Tutorial Title" control={control} />
                    <Form.Group as={Row} className="align-items-center">
                      <Col>
                        <FileFormInput name={`tutorials.${index}.video`} label="Tutorial Video" control={control} />
                      </Col>
                      <Col xs="auto">
                        <OverlayTrigger
                          trigger={['focus', 'hover']}
                          placement="top"
                          overlay={
                            <Popover>
                              <PopoverBody>View {item?.title} video</PopoverBody>
                            </Popover>
                          }>
                          <Button variant="primary" className="mt-3" onClick={() => Handleopen(item?.video)}>
                            <IconifyIcon icon="fa-solid:eye" />
                          </Button>
                        </OverlayTrigger>
                      </Col>
                    </Form.Group>
                    <Button variant="danger" className="mt-2 mb-2" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </div>
                ))}

                <div className="d-flex justify-content-center mt-3">
                  <Button variant="primary" onClick={() => append({ title: '', video: '' })}>
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" />
                    Add New Tutorial
                  </Button>
                </div>
              </Col>
            </Row>

            <div className="text-center mt-2 ">
              <Button variant="primary" className="d-flex justify-content-center" style={{ width: '100%' }} type="submit">
                <span className="mt-1">SUBMIT </span> {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
      <ViewVedio handleclose={handleclose} open={show} data={video} />
    </>
  )
}
