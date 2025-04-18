import { FormControl, FormGroup, FormLabel, Feedback } from 'react-bootstrap'
import { Controller } from 'react-hook-form'

const TextFormInputcloning = ({
  name,
  containerClassName: containerClass,
  control,
  id,
  label,
  labelClassName: labelClass,
  ...other
}) => {
  return (
    <Controller
      name={name}
      defaultValue={''}
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClass}>
          {label && (
            typeof label === 'string' ? (
              <FormLabel htmlFor={id ?? name} className={labelClass}>
                {label}
              </FormLabel>
            ) : (
              <>{label}</>
            )
          )}

          <FormControl 
            id={id ?? name} 
            {...other} 
            {...field} 
            isInvalid={Boolean(fieldState?.error?.message)} 
          />
          {console.log(fieldState)}
          {/* Display error message if present */}
          {fieldState?.error?.message && (
            <Feedback type="invalid">{fieldState?.error?.message}</Feedback>
          )}
        </FormGroup>
      )}
    />
  )
}

export default TextFormInputcloning
