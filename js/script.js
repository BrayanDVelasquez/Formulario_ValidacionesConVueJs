Vue.component('mensaje', {
    template: /* html */ `
    <div v-if="mensajei != ''">
        <span class="help" :class="[clase]">{{ mensajei }}</span>
    </div>
    `,
    props: ['mensajei', 'clase']
})

new Vue({
    el: '#app',
    data: {
        nombreI: '',
        nombreIValidacion: '',
        nombreIMensaje: '',

        apellidoI: '',
        apellidoIValidacion: '', 
        apellidoIMensaje: '',
        
        cedulaI: '',
        cedulaIValidacion: '',
        cedulaIMensaje: '',
        cedulaIBusqueda: '',

        telefonoI: '',
        telefonoIValidacion: '',
        telefonoIMensaje: '',

        correoI: '',
        correoIValidacion: '',
        correoISelect: '@gmail.com',
        correoIMensaje: '',

        generoI: '',
        generoIValidacion: '',

        direccionI: '',
        direccionIValidacion: '',
        direccionIMensaje: '',

        calleI: '',
        calleIValidacion: '',
        calleIMensaje: '',
        
        acuerdoI: false,
        acuerdoIValidacion: '',

        btnRegistrar: false
    },
    methods: {
        nombreIEvento(){

            let expresionNombre = /^[a-zA-Z´áéíóúÁÉÍÓÚñÑÄËÏÖÜ']+$/;

            if(!expresionNombre.test(this.nombreI) && this.nombreI.length > 0){
                this.nombreIValidacion = 'is-danger';
                this.nombreIMensaje = 'Solo se aceptan letras';
            } 
            else if(this.nombreI.length == 0) {
                this.nombreIMensaje = '';
                this.nombreIValidacion = '';
            }
            else if(this.nombreI.length > 1){
                this.nombreIValidacion = 'is-success';
                this.nombreIMensaje = '';
            }

        },
        apellidoIEvento(){

            let expresionApellido = /^[a-zA-Z´áéíóúÁÉÍÓÚñÑÄËÏÖÜ']+$/;

            if(!expresionApellido.test(this.apellidoI) && this.apellidoI.length > 0){
                this.apellidoIValidacion = 'is-danger';
                this.apellidoIMensaje = 'Solo se aceptan letras';
            } 
            else if(this.apellidoI.length == 0) {
                this.apellidoIMensaje = '';
                this.apellidoIValidacion = '';
            }
            else if(this.apellidoI.length > 1){
                this.apellidoIValidacion = 'is-success';
                this.apellidoIMensaje = '';
            }

        },
        cedulaIEvento(){

            if(this.cedulaI.length < 4){
                this.cedulaIValidacion = '';
                this.cedulaIBusqueda = '';
                this.cedulaIMensaje = '';
            } 
            else if(this.cedulaI.length >= 4){
                this.verificarCedula();
            }

        },
        telefonoIEvento(){
            let expresionTelefono = /^[+0-9()]+$/;

            if(!expresionTelefono.test(this.telefonoI) && this.telefonoI.length > 0){
                this.telefonoIMensaje = 'Solo se aceptan números y signos "+" y "()"';
                this.telefonoIValidacion = 'is-danger';
            } 
            else if(this.telefonoI.length > 3) {
                this.telefonoIMensaje = '';
                this.telefonoIValidacion = 'is-success';
            }
            else if(this.telefonoI.length <= 3){
                 this.telefonoIValidacion = '';
                 this.telefonoIMensaje = '';
            }

        },
        correoIEvento(){
            let expresionCorreo = /@/;
            let expresionEspacio = /[\s]/g;

            if(expresionCorreo.test(this.correoI) && this.correoI.length > 2){
                this.correoIValidacion = 'is-danger';
                this.correoIMensaje = 'Elija su dirección de correo con la opción correspondiente';
            }
             else if(expresionEspacio.test(this.correoI)){
                this.correoIValidacion = 'is-danger';
                this.correoIMensaje = 'No se aceptan espaciados';
            } else {
                this.correoIMensaje = '';

                if(this.correoI.length < 4){
                    this.correoIValidacion = '';
                } 
                else if (this.correoI.length >= 4) {
                    this.correoIValidacion = 'is-success';
                }
            }

        },
        generoIEvento(){
            if(this.generoI != ''){
                this.generoIValidacion = 'is-success';
            }
        },
        direccionIEvento(){

            let expresionAlfaNumerica = /^[a-zA-Z0-9-_.,;:"'´áéíóúÁÉÍÓÚñÑÄËÏÖÜ]+$/;

            if(this.direccionI.length >= 3){
                 if(expresionAlfaNumerica.test(this.direccionI)){
                     this.direccionIValidacion = 'is-success';
                     this.direccionIMensaje = '';
                 }
                  else {
                    this.direccionIMensaje = `Escriba su direccion correctamente.`;
                    this.direccionIValidacion = 'is-danger';
                 }
            } 
            else if(this.direccionI.length < 3){
                this.direccionIMensaje = '';
                this.direccionIValidacion = '';
            }      
           
        },
        calleIEvento(){

            if(this.calleI.length > 1 && this.calleI.length < 150){
                this.calleIValidacion = 'is-success';
                this.calleIMensaje = '';
            }
            else if(this.calleI.length >= 150){
                this.calleIMensaje = 'Esta sobrepasando el límite de caracteres.';
                this.calleIValidacion = 'is-danger';
            }
            else if(this.calleI.length <= 1){
                this.calleIMensaje = '';
                this.calleIValidacion = '';
            }      
           
        },
        acuerdoIEvento(){

            this.acuerdoI ? 
            this.acuerdoIValidacion = 'is-success' : 
            this.acuerdoIValidacion = 'is-danger'
            
        },

        async verificarCedula(){
            this.cedulaIBusqueda = 'buscando';
            this.cedulaIMensaje = 'Buscando en la base de datos';
            this.cedulaIValidacion = 'is-info';

            let data = new FormData();
            data.append('cedulaI', this.cedulaI);

            let peticion = await fetch('js/cedulas.json');
            let peticionCompletada = await peticion.json();

            for(let item of peticionCompletada){
                if(this.cedulaI == item.cedula){
                    this.cedulaIBusqueda = 'encontrada';
                    this.cedulaIValidacion = 'is-danger';
                    this.cedulaIMensaje = 'Ya esta registrada';
                    this.btnRegistrarEvento();
                    break;
                }
                else{
                    this.cedulaIBusqueda = 'noEncontrada';
                    this.cedulaIValidacion = 'is-success';
                    this.cedulaIMensaje = '';
                    this.btnRegistrarEvento();
                }
            }

        },
        btnRegistrarEvento(){
            if(this.nombreIValidacion == 'is-success' && 
               this.apellidoIValidacion == 'is-success' &&
               this.cedulaIValidacion == 'is-success' && 
               this.telefonoIValidacion == 'is-success' && 
               this.correoIValidacion == 'is-success' && 
               this.generoIValidacion == 'is-success' && 
               this.direccionIValidacion == 'is-success' && 
               this.calleIValidacion == 'is-success' && 
               this.acuerdoIValidacion == 'is-success'){

                this.btnRegistrar = true;
            } 
            
            else {
                this.btnRegistrar = false;
            }
        }
    }
});