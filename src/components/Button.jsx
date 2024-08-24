const Button = ({variable ,onClick}) => {
   return <button className="btn-toggle" onClick={onClick}>
            {variable ? "–" : "+"}
          </button>
}

export default Button;