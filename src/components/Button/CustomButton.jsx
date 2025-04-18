import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import IconifyIcon from '../wrappers/IconifyIcon'

const CustomButton = ({ 
  variant, 
  onClick, 
  label, 
  loading, 
  icon, 
  className, 
  type = 'button' 
}) => {
  return (
    <Button 
      variant={variant} 
      onClick={onClick} 
      className={className} 
      type={type}
    >
      {icon && <IconifyIcon icon={icon} />}
      {label}
      {loading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
    </Button>
  )
}

export default CustomButton
