import './Skeleton.css'

export default function Skeleton({ width, height, radius = '6px', className }) {
  const style = {
    width,
    height,
    borderRadius: radius,
  }

  return (
    <span
      className={className ? `skeleton ${className}` : 'skeleton'}
      style={style}
      aria-hidden="true"
    />
  )
}
