import { FormGroup, FormLabel } from 'react-bootstrap'
import { Controller } from 'react-hook-form'

const CheckboxFormInput = ({
  name,
  text,
  containerClassName: containerClass,
  control,
  id,
  labelClassName: labelClass,
  label,
  noValidate,
  ...other
}) => {
  return (
    <Controller
      name={name}
      defaultValue={false}
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClass ?? ''}>
          {label &&
            (typeof label === 'string' ? (
              <FormLabel htmlFor={id ?? name} className={labelClass}>
                {label}
              </FormLabel>
            ) : (
              <>{label}</>
            ))}
          <div className="form-check form-switch form-switch-primary">
            <input
              className="form-check-input"
              type="checkbox"
              id={id ?? name}
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              {...other}
            />
            <label className="form-check-label" style={{ cursor: 'pointer', color: 'white' }} htmlFor={id ?? name}>
              {text}
            </label>
          </div>
          {!noValidate && fieldState.error?.message && <div className="text-danger small mt-1">{fieldState.error?.message}</div>}
        </FormGroup>
      )}
    />
  )
}

export default CheckboxFormInput
