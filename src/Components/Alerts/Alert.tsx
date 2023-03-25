import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

MySwal.fire({
}).then(() => {
  return MySwal.fire(<p>Shorthand works too</p>)
})

export default MySwal