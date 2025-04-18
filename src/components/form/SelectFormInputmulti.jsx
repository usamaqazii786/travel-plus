'use client'

import { FormLabel } from 'react-bootstrap'
import Feedback from 'react-bootstrap/esm/Feedback'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
const SelectFormInputmulti = ({
  control,
  id,
  name,
  label,
  // className,
  containerClassName,
  labelClassName,
  noValidate,
  options,
  ...other
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={containerClassName}>
          {label &&
            (typeof label === 'string' ? (
              <FormLabel htmlFor={id ?? name} className={labelClassName}>
                {label}
              </FormLabel>
            ) : (
              <>{label}</>
            ))}

          <ReactSelect
            {...other}
            {...field}
            options={options}
            isMulti={true}
            onChange={(selectedOptions) => {
              console.log(selectedOptions)
              const values = selectedOptions ? selectedOptions.map((option) => option.value) : []
              field.onChange(values) // Update field value with the array of selected values
              console.log(values)
            }}
            value={options.filter((option) => field.value.includes(option.value))} // Show selected options
            classNamePrefix="react-select"
            id={id ?? name}
          />

          {!noValidate && fieldState.error?.message && <Feedback type="invalid">{fieldState.error?.message}</Feedback>}
        </div>
      )}
    />
  )
}
export default SelectFormInputmulti
