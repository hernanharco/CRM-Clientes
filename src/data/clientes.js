
export async function obtenerClientes()  {
    // const url = 'http://localhost:3000/clientes';

    const respuesta = await fetch (import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json();

    // console.log(resultado);

    return resultado;

}

export async function obtenerCliente(id)  {
    // const url = 'http://localhost:3000/clientes';

    const respuesta = await fetch (`${import.meta.env.VITE_API_URL}/${id}`);
    // console.log(respuesta);
    const resultado = await respuesta.json();

    // console.log(resultado);

    return resultado;

}

export async function agregarCliente(datos) {
    
    // console.log(datos)
    try {
        const respuesta = await fetch (import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}

export async function actualizarCLiente(id, datos) {
    try {
        const respuesta = await fetch (`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}

export async function eliminarCLiente(id) {
    // console.log('Eliminando...')
    // console.log(id);
    try {
        const respuesta = await fetch (`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',                      
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}
