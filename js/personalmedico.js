class personalMedico {
    constructor(idMedico, nombre, LicenciaProfecional, especialidad, telefono, correo, usuario, contraseña) {
        this.idMedico = idMedico;
        this.nombre = nombre;
        this.LicenciaProfecional = LicenciaProfecional;
        this.especialidad = especialidad;
        this.telefono = telefono;
        this.correo = correo;
        this.usuario = usuario;
        this.contraseña = contraseña;
    }



    getUsuario() {
        return this.usuario;
    }

    getContraseña() {
        return this.contraseña;
    }

}
