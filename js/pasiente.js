class pasientes {
    constructor(nombre, identificacion, fechaNacimiento, telefono, coreo, usuario, contraseña) {
        this.nombre = nombre
        this.identificacion = identificacion
        this.fechaNacimiento = fechaNacimiento
        this.telefono = telefono
        this.coreo = coreo
        this.usuario = usuario
        this.contraseña = contraseña

    }
   
    getUsuario() {
        return this.usuario;
    }

    getContraseña() {
        return this.contraseña;
    }

    
}