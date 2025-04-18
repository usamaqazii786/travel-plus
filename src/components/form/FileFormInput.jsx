import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import Feedback from 'react-bootstrap/esm/Feedback'
import { Controller } from 'react-hook-form'

const FileFormInput = ({ name, containerClassName: containerClass, control, id, label, noValidate, labelClassName: labelClass }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null} // Default value for file inputs is null
      render={({ field, fieldState }) => (
        <FormGroup className={containerClass}>
          {label &&
            (typeof label === 'string' ? (
              <FormLabel htmlFor={id ?? name} className={labelClass}>
                {label}
              </FormLabel>
            ) : (
              <>{label}</>
            ))}
          <FormControl
            id={id ?? name}
            type="file" // Specify file input type
            isInvalid={Boolean(fieldState.error?.message)}
            onChange={(e) => {
              field.onChange(e.target.files) // Pass the files to the React Hook Form field
            }}
            onBlur={field.onBlur} // Ensure blur handling
          />
          {!noValidate && fieldState.error?.message && <Feedback type="invalid">{fieldState.error?.message}</Feedback>}
        </FormGroup>
      )}
    />
  )
}

export default FileFormInput
