import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import Feedback from 'react-bootstrap/esm/Feedback'
import { Controller } from 'react-hook-form'
const TextFormInputPayment = ({
  name,
  color,
  textarea,
  containerClassName: containerClass,
  control,
  id,
  label,
  noValidate,
  labelClassName: labelClass,
  ...other
}) => {
  const currentDate = new Date();
  const currentMonthYear = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, '0')}`;

  const HandlePicker = (e) => {
    if (e.target.showPicker) {
      e.target.showPicker()
    }
  }

  return (
    <Controller
      name={name}
      defaultValue={''}
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClass}>
          {label &&
            (typeof label === 'string' ? (
              <FormLabel htmlFor={id ?? name} className={labelClass} style={{ color: color }}>
                {label}
              </FormLabel>
            ) : (
              <>{label}</>
            ))}
          <FormControl
            as={textarea && 'textarea'}
            style={{ color: color,borderColor:"#ccc" }}
            
            id={id ?? name}
            rows={textarea && 6}
            onClick={(e) => HandlePicker(e)}
            {...other}
            min={currentMonthYear}
            {...field}
            isInvalid={Boolean(fieldState.error?.message)}
          />
          {!noValidate && fieldState.error?.message && <Feedback type="invalid">{fieldState.error?.message}</Feedback>}
        </FormGroup>
      )}
    />
  )
}
export default TextFormInputPayment
