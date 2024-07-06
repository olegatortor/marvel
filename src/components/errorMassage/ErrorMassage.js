import img from './error.gif'

const ErrorMassageCustom = () => {
    return <img src={img} style={{display: 'block', width: "250px", height: "250px",objectFit: 'contain', margin: "0 auto"}} alt="ERROR" />
}

export default ErrorMassageCustom;