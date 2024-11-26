function iniciarSesion() {
    // Obtiene los valores ingresados por el usuario en los campos de texto
    var usuario = document.getElementById('usuario').value;
    var contraseña = document.getElementById('contraseña').value;
    var tipoUsuario = document.getElementById('tipousuario').value;

    // Muestra en la consola el tipo de usuario seleccionado
    console.log("Tipo de usuario seleccionado:", tipoUsuario);

    let usuarios; // Variable para almacenar la lista de usuarios obtenida de localStorage

    // Verifica el tipo de usuario seleccionado y obtiene los datos correspondientes del localStorage
    if (tipoUsuario === 'paciente') {
        usuarios = JSON.parse(localStorage.getItem('pasiente')); // Nota: "pasiente" contiene un error tipográfico
    } else if (tipoUsuario === 'personalMedico') {
        usuarios = JSON.parse(localStorage.getItem('personalmedico'));
    }

    // Muestra en la consola los datos de los usuarios obtenidos
    console.log("Usuarios obtenidos de localStorage:", usuarios);

    // Valida las credenciales según el tipo de usuario
    if (tipoUsuario === 'paciente') {
        // Busca un usuario válido en la lista de pacientes
        const usuarioValido = usuarios && usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);

        if (usuarioValido) {
            // Si las credenciales son correctas, muestra un mensaje de bienvenida y redirige al menú del paciente
            alert("Bienvenido " + usuario);
            window.location.href = "../html/menupasiente.html"; // Nota: "menupasiente" contiene un error tipográfico
        } else {
            // Si las credenciales son incorrectas, muestra un mensaje de error
            document.getElementById('mensajeError').innerText = "Credenciales incorrectas, por favor inténtalo de nuevo.";
        }
    } else if (tipoUsuario === 'personalMedico') {
        // Busca un usuario válido en la lista de personal médico
        const usuarioValido = usuarios && usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);

        if (usuarioValido) {
            // Si las credenciales son correctas, muestra un mensaje de bienvenida y redirige al menú del personal médico
            alert("Bienvenido " + usuario);
            window.location.href = "../html/menupersonalmedico.html";
        } else {
            // Si las credenciales son incorrectas, muestra un mensaje de error
            document.getElementById('mensajeError').innerText = "Credenciales incorrectas, por favor inténtalo de nuevo.";
        }
    }

    // Muestra en la consola los datos validados para fines de depuración
    console.log("Datos validados:", usuarios);
}
