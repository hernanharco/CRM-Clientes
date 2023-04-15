import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import FormComp from "../components/Form";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({request}) {
  const formData = await request.formData();

  // console.log(formData.get('nombre'));
  const datas = Object.fromEntries(formData);

  const email = formData.get('email');

  // Validation
  const errors = [];
  if(Object.values(datas).includes('')) {
    errors.push('Todos los Campos son Obligatorios');
  }

  //Comprobar la información del correo
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)) {
    errors.push('El Email no es Valido');
  }

  // console.log(errors);

  // Return data if there are errors
  if(Object.keys(errors).length) {
    return errors;
  }

  await agregarCliente(datas);

  return redirect ('/')
}

function NewClient() {

  const errors = useActionData();
  const navigate = useNavigate();

  // console.log(errors);

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los  campos para registrar un nuevo Cliente</p>

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
          < FormComp />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  )
}

export default NewClient