import { Form, Navigate, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCLiente } from "../data/clientes";
import FormComp from "../components/Form";
import Error from "../components/Error";

export async function loader({ params }) {
  // console.log(params);
  const cliente = await obtenerCliente(params.clienteId)
  // console.log(cliente)

  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No hay Resultados'
    })
  }
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData();

  // console.log(formData.get('nombre'));
  const datas = Object.fromEntries(formData);

  const email = formData.get('email');

  // Validation
  const errors = [];
  if (Object.values(datas).includes('')) {
    errors.push('Todos los Campos son Obligatorios');
  }

  //Comprobar la información del correo
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!regex.test(email)) {
    errors.push('El Email no es Valido');
  }

  // console.log(errors);

  // Return data if there are errors
  if (Object.keys(errors).length) {
    return errors;
  }

  //Actualizarel Cliente
  await actualizarCLiente(params.clienteId, datas);

  return redirect('/')

}

function EditarCliente() {

  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errors = useActionData();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className="mt-3">A continuación podras modificar los datos e un Cliente</p>

      <div className="flex justify-end">
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="gb-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">


        {errors?.length && errors.map( ( error, i ) => 
          <Error key={i}>{error}</Error>            
        )}

        <Form
          method="post"
          noValidate
        >
          < FormComp
            cliente={cliente}
          />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente