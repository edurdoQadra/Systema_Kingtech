<script setup>

import axios from 'axios';
import { ref, onMounted  } from 'vue';
 import {sendRequest,confirmation,show_alert} from '../../functions';
 import Swal from 'sweetalert2';

/******************************************************** */
import DataTable from 'datatables.net-vue3';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-responsive-dt';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import JsZip  from 'jszip';
import  pdfMake from 'pdfMake/build/pdfmake';
import * as pdfFonts from 'pdfMake/build/vfs_fonts';
import Select from 'datatables.net-select';
pdfMake.vfs = pdfFonts.pdfMake? pdfFonts.pdfMake.vfs:pdfMake.vfs;
const table=ref();
const columns =ref([]);
const buttons = ref([]);
const clientes = ref([]);
const load = ref(false);

const showModal = ref(false); // Variable para controlar la visibilidad del modal
const modalTitle = ref(''); 

const showModalEdit = ref(false); // Variable para controlar la visibilidad del modal
const modalTitleEdit = ref(''); // Variable para almacenar el título del modal

// Define la propiedad para rastrear si una fila está seleccionada
const filaSeleccionada = ref(false);
const form = ref({
    ADMINISTRADOR: '',
    REPORTES: '',
    DEPARTAMENTO: '',
    PROVINCIA: '',
    DISTRITO: '',
    DIRECCION: '',
    REFERENCIA: '',
    ASOCIADO: '',
    DNI: '',
    NUMERO: '',
    RAZON_SOCIAL: '',
    RUC: '',
    PORCENTAJE_EMPRESA: '',
    CORREO: '',
    TELEFONO: '',
    ESTADO_LOCAL: ''
});

window.JSZip = JsZip;
DataTable.use(ButtonsHtml5);
DataTable.use(Select);


const openModal = (title) => 
{
    modalTitle.value = title;
    showModal.value = true;  
    clientes.value.ADMINISTRADOR='';
    clientes.value.REPORTES= "";
    clientes.value.DEPARTAMENTO= "";
    clientes.value.PROVINCIA= "";
    clientes.value.DISTRITO= "";
    clientes.value.DIRECCION= "";
    clientes.value.REFERENCIA= "";
    clientes.value.ASOCIADO= "";
    clientes.value.DNI= "";
    clientes.value.NUMERO= "";
    clientes.value.RAZON_SOCIAL= "";
    clientes.value.RUC= "";
    clientes.value.PORCENTAJE_EMPRESA= "";
    clientes.value.CORREO= "";
    clientes.value.TELEFONO= "";
    clientes.value.ESTADO_LOCAL= "";
    modalTitle.value = title;
    showModal.value = true;  
    console.log('mensjae de exito');
           
}

const openModalEdit = (title) => {
    modalTitleEdit.value = title;
    showModalEdit.value = true;  
    console.log('mensjae de exito');
}
// 

const handleRowSelection = (event) => {

     const selectedRows = table.value.dt.rows({ selected: true }).count();

// Si hay filas seleccionadas, establecer filaSeleccionada en true
filaSeleccionada.value = selectedRows > 0;
};

const handleRowSelectionDelete = (event) => {

const selectedRows = table.value.dt.rows({ selected: true }).count();

// Si hay filas seleccionadas, establecer filaSeleccionada en true
filaSeleccionada.value = selectedRows > 0;
};


    columns.value = [{ data:null,render:function(data,type,row,meta)
        {return (meta.row+1)}},
        {data:'ADMINISTRADOR'},
        {data:'REPORTES'},
        {data:'DEPARTAMENTO'},
        {data:'DISTRITO'},
    ];


    buttons.value =[
        {
        title:'Clientes',extend:'excelHtml5',
        text:'<i class="fa-solid fa-file-excel"></i> Excel',
        className:'btn btn-success my-2'
        },
        {
        title:'Clientes',extend:'pdfHtml5',
        text:'<i class="fa-solid fa-file-pdf"></i> PDF',
        className:'btn btn-primary my-2'
        },
        {
        title:'Clientes',extend:'print',
        text:'<i class="fa-solid fa-print"></i> PRINT',
        className:'btn btn-dark my-2'
        },
        {
        title:'Clientes',extend:'copy',
        text:'<i class="fa-solid fa-copy"></i> COPY',
        className:'btn btn-secondary my-2'
        }
    ];

    // const deleteClienteAlert = ( id,name )=>{
    //     const alert=Swal.mixin({
    //         buttonStyling:true
    //     });
    //     alert.fire({
    //         title:'esta seguro de querer borrar el registro'+name+'?',
    //         icon:'question',showCancelButton:true,
    //         confirmaButtonText:'<i class="fa fa-solid fa-check"></i> Si Borrar',
    //         cancelButtonText:'<i class="fa fa-solid fa-check"></i> Cancel'
    //     }).then((result)=>{
    //         if(result.isConfirmed){
    //             confirmation(name,('http://localhost:8000/delete/'+ id ),'/listbet');
    //         }
    //     })
    // }

    const deleteCliente = () => 
    {
        const selectedRowsData = table.value.dt.rows({ selected: true }).data().toArray();
        if (selectedRowsData.length > 0) {
            const id = selectedRowsData[0].id; // Assuming id is a property of the selected row data
            const name = selectedRowsData[0].ADMINISTRADOR; // Assuming administrador is a property of the selected row data
            console.log(id, name);
            // Proceed with deletion logic
            // You can use id and name for further processing

            const alert=Swal.mixin({
                buttonStyling:true
            });
            alert.fire({
                title:'esta seguro de querer borrar el registro'+name+'?',
                icon:'question',showCancelButton:true,
                confirmaButtonText:'<i class="fa fa-solid fa-check"></i> Si Borrar',
                cancelButtonText:'<i class="fa fa-solid fa-check"></i> Cancel'
            }).then((result)=>{
                if(result.isConfirmed){
                    confirmation(name,('http://localhost:8000/delete/'+ id ),'/listbet');
                }
            })
        } else {
            // Handle case when no rows are selected
            console.log('No rows selected for deletion');
            // Si no se ha seleccionado ninguna fila, mostramos un mensaje de advertencia o manejo de la situación
            let desc = 'debe selccionar uan fila antes de poder Borrarla'
            show_alert(desc, 'error', '')
        }
    }


    const updateModal = () => {
        // Obtenemos las filas seleccionadas en la tabla
        const selectedRows = table.value.dt.rows({ selected: true }).data().toArray();
        // Verificamos si se ha seleccionado al menos una fila
        if (selectedRows.length > 0) {
            // Obtenemos los datos de la primera fila seleccionada
            const selectedRowData = selectedRows[0];
                    console.log(selectedRowData.id);
            // Inicializamos los valores en el modal con los datos de la fila seleccionada
            modalTitle.value = 'Editar'; // Establecemos el título del modal
            showModalEdit.value = true; // Mostramos el modal
                // Inicializamos los valores en los campos del formulario con los datos de la fila seleccionada
                clientes.value.ADMINISTRADOR = selectedRowData.ADMINISTRADOR;
                clientes.value.REPORTES = selectedRowData.REPORTES;
                clientes.value.DEPARTAMENTO = selectedRowData.DEPARTAMENTO;
                clientes.value.DISTRITO = selectedRowData.DISTRITO; 
                clientes.value.PROVINCIA = selectedRowData.ADMINISTRADOR;
                clientes.value.DISTRITO = selectedRowData.DISTRITO;
                clientes.value.DIRECCION = selectedRowData.DIRECCION;
                clientes.value.REFERENCIA = selectedRowData.REFERENCIA; 
                clientes.value.ASOCIADO = selectedRowData.ASOCIADO;
                clientes.value.DNI = selectedRowData.DNI;
                clientes.value.NUMERO = selectedRowData.NUMERO;
                clientes.value.RAZON_SOCIAL = selectedRowData.RAZON_SOCIAL; 
                clientes.value.RUC = selectedRowData.RUC;
                clientes.value.PORCENTAJE_EMPRESA = selectedRowData.PORCENTAJE_EMPRESA;
                clientes.value.CORREO = selectedRowData.CORREO;
                clientes.value.TELEFONO = selectedRowData.TELEFONO;
                clientes.value.ESTADO_LOCAL= selectedRowData.ESTADO_LOCAL
        } else {
            // Si no se ha seleccionado ninguna fila, mostramos un mensaje de advertencia o manejo de la situación
            let desc = 'debe selccionar uan fila antes de poder editarla'
            show_alert(desc, 'error', '')
        }
    };

    const update = () => {
        console.log(' mensaje de exito ');
        console.log(id.value);
        //console.log(clientes.value);
        sendRequest('PUT',clientes.value,('http://localhost:8000/api/v1/client/'+id.value),'/listbet');
        //cerramos el modal de editar :
        console.log('brokling loudness');  
        showModalEdit.value = false;
    }

    const save = () => {
    console.log(form);
        sendRequest('POST',form.value,'http://localhost:8000/api/v1/create','listbet');
        form.value.ADMINISTRADOR='';
        form.value.REPORTES= "";
        form.value.DEPARTAMENTO= "";
        form.value.PROVINCIA= "";
        form.value.DISTRITO= "";
        form.value.DIRECCION= "";
        form.value.REFERENCIA= "";
        form.value.ASOCIADO= "";
        form.value.DNI= "";
        form.value.NUMERO= "";
        form.value.RAZON_SOCIAL= "";
        form.value.RUC= "";
        form.value.PORCENTAJE_EMPRESA= "";
        form.value.CORREO= "";
        form.value.TELEFONO= "";
        form.value.ESTADO_LOCAL= "";
        showModal.value = false;
    }

    onMounted(  
        async ()=> { 
            const resp = await axios.get('http://localhost:8000/api/v1/clients');
            console.log("Respuesta recibida:", resp);
            clientes.value = resp.data;
            console.log(clientes);
            load.value = true;
            table.value.dt.on('deselect', handleRowSelectionDelete);
            table.value.dt.on('deselect', handleRowSelection);
        }                  
    );

</script>
<template>

        <div class="row">
            <div class="col-md-12">
                <div class="d-grid col-12 mx-auto">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <button v-if="!filaSeleccionada" class="btn btn-lg" @click="openModal('Crear')">
                        <i class="fa-solid fa-circle-plus mx-1"></i>Agregar
                    </button>
                        <button class="btn btn-lg" @click="updateModal">
                            <i class="fa-solid fa-circle-plus mx-1"></i>Editar
                        </button>
                        <button class="btn btn-lg" @click="deleteCliente()">
                            <i class="fa-solid fa-circle-plus mx-1"></i> Borrar
                        </button>
                    </div>
                </div>
            </div>
        </div>

    <div class="row border border-primary mt-3">
        <!--  -->
        <div class="col">
            <div class="card border border-primary text-center" v-if="!load">
                <div class="card-body" style="display: flex; justify-content: center; align-items: center;">
                    <!-- <img src="/dep1bvx-e49c7915-2adf-4c3e-b366-60e3786a1959.gif" style="width: 600px; height: 400px;" class="img-fluid" alt=""> -->
                    <img src="/balon-futbol.gif" style="width: 600px; height: 400px;" class="img-fluid" alt="">
                </div>
            </div>
        </div>
        <!--  -->

        <!-- **************************************************************************************************************************************  -->

        <div class="col-md-12 col-lg-12 col-12">
            <div class="table-responsive my-5">
                <DataTable :data="clientes" :columns="columns" ref="table"
                    class="table table-striped my-3"
                    :options="{ 
                            select:true,
                            responsive: true, 
                            autoWidth: false, 
                            dom: 'Bfrtip',
                            buttons: buttons,
                            pageLength: 10
                        }"
                         @select="handleRowSelection"
                        >
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Administrador</th>
                            <th>Reporte</th>
                            <th>Departamento</th>
                            <th>Distrito</th>
                            </tr>
                        </thead>
                </DataTable>
            </div>
        </div>
    </div>

    <!-- MODAL   -->
    <div v-show="showModal" class="modal faded show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ modalTitle }}</h5>
                <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
            <form @submit.prevent="save">
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <label for="administrador" class="form-label">ADMINISTRADOR</label>
                            <input type="text" id="administrador" class="form-control" v-model="form.ADMINISTRADOR">
                        </div>
                        <div class="mb-3">
                            <label for="reporte" class="form-label">REPORTES</label>
                            <input type="text" id="reporte" class="form-control" v-model="form.REPORTES">
                        </div>
                        <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="departamento" class="form-label">DEPARTAMENTO</label>
                            <input type="text" id="departamento" class="form-control" v-model="form.DEPARTAMENTO">
                        </div>
                        <div class="mb-3">
                            <label for="provincia" class="form-label">PROVINCIA</label>
                            <input type="text" id="provincia" class="form-control" v-model="form.PROVINCIA">
                        </div>
                        <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="distrito" class="form-label">DISTRITO</label>
                            <input type="text" id="distrito" class="form-control" v-model="form.DISTRITO">
                        </div>
                        <div class="mb-3">
                            <label for="direccion" class="form-label">DIRECCION</label>
                            <input type="text" id="direccion" class="form-control" v-model="form.DIRECCION">
                        </div>
                        <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="referencia" class="form-label">REFERENCIA</label>
                            <input type="text" id="referencia" class="form-control" v-model="form.REFERENCIA">
                        </div>
                        <div class="mb-3">
                            <label for="asociado" class="form-label">ASOCIADO</label>
                            <input type="text" id="asociado" class="form-control" v-model="form.ASOCIADO">
                        </div>
                        <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="dni" class="form-label">DNI</label>
                            <input type="text" id="dni" class="form-control" v-model="form.DNI">
                        </div>
                        <div class="mb-3">
                            <label for="numero" class="form-label">NUMERO</label>
                            <input type="text" id="numero" class="form-control" v-model="form.NUMERO">
                        </div>
                        <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="razon_social" class="form-label">RAZON_SOCIAL</label>
                            <input type="text" id="razon_social" class="form-control" v-model="form.RAZON_SOCIAL">
                        </div>
                        <div class="mb-3">
                            <label for="ruc" class="form-label">RUC</label>
                            <input type="text" id="ruc" class="form-control" v-model="form.RUC">
                        </div>
                        <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="porcentaje_empresa" class="form-label">PORCENTAJE_EMPRESA</label>
                            <input type="text" id="porcentaje_empresa" class="form-control" v-model="form.PORCENTAJE_EMPRESA">
                        </div>
                        <div class="mb-3">
                            <label for="correo" class="form-label">CORREO</label>
                            <input type="email" id="correo" class="form-control" v-model="form.CORREO">
                        </div>
                        <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="telefono" class="form-label">TELEFONO</label>
                            <input type="text" id="telefono" class="form-control" v-model="form.TELEFONO">
                        </div>
                        <div class="mb-3">
                            <label for="estado_local" class="form-label">ESTADO_LOCAL</label>
                            <input type="text" id="estado_local" class="form-control" v-model="form.ESTADO_LOCAL">
                        </div>
                        <!-- Agrega más campos de formulario aquí -->
                    </div>
                </div>
                <div class="row justify-content-between">
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                    <div class="col-auto">
                        <button type="button" class="btn btn-secondary" @click="showModal = false">Cancelar</button>
                    </div>
                </div>
            </form>

            </div>
            </div>
        </div>
    </div>

    <!-- MODAL EDIT  -->
    <div v-show="showModalEdit" class="modal faded show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ modalTitle }}</h5>
                <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="update">
                    <div class="row">
                    <div class="col">
                    <div class="mb-3">
                        <label for="administrador" class="form-label">ADMINISTRADOR</label>
                        <input type="text" id="administrador" class="form-control"  v-model="clientes.ADMINISTRADOR" >
                    </div>
                    <div class="mb-3">
                        <label for="asociado" class="form-label">REPORTES</label>
                        <input type="text" id="reporte" class="form-control" v-model="clientes.REPORTES">
                    </div>
                    <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                    <div class="mb-3">
                        <label for="administrador" class="form-label">DEPARTAMENTO</label>
                        <input type="text" id="departamento" class="form-control" v-model="clientes.DEPARTAMENTO">
                    </div>
                    <div class="mb-3">
                        <label for="asociado" class="form-label">Provincia</label>
                        <input type="text" id="provincia" class="form-control" v-model="clientes.PROVINCIA">
                    </div>
                    <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                    <div class="mb-3">
                        <label for="administrador" class="form-label">Distrito</label>
                        <input type="text" id="distrito" class="form-control" v-model="clientes.DISTRITO">
                    </div>
                    <div class="mb-3">
                        <label for="asociado" class="form-label">DIRECCION</label>
                        <input type="text" id="direccion" class="form-control" v-model="clientes.DIRECCION">
                    </div>
                    <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                    <div class="mb-3">
                        <label for="administrador" class="form-label">REFERENCIA</label>
                        <input type="text" id="referencia" class="form-control" v-model="clientes.REFERENCIA">
                    </div>
                    <div class="mb-3">
                        <label for="asociado" class="form-label">ASOCIADO</label>
                        <input type="text" id="asociado" class="form-control" v-model="clientes.ASOCIADO">
                    </div>
                    <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                    <div class="mb-3">
                        <label for="administrador" class="form-label">DNI</label>
                        <input type="text" id="dni" class="form-control" v-model="clientes.DNI">
                    </div>
                    <div class="mb-3">
                        <label for="asociado" class="form-label">NUMERO</label>
                        <input type="text" id="numero" class="form-control"  v-model="clientes.NUMERO">
                    </div>
                    <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                    <div class="mb-3">
                        <label for="razon_social" class="form-label">RAZON_SOCIAL</label>
                        <input type="text" id="razon_social" class="form-control" v-model="clientes.RAZON_SOCIAL">
                    </div>
                    <div class="mb-3">
                        <label for="dni" class="form-label">DNI</label>
                        <input type="text" id="dni" class="form-control" v-model="clientes.DNI">
                    </div>
                    <!-- Agrega más campos de formulario aquí -->
                    </div>
                    <div class="col">
                    <div class="mb-3">
                        <label for="numero" class="form-label">NUMERO</label>
                        <input type="text" id="numero" class="form-control" v-model="clientes.NUMERO">
                    </div>
                    <!--  -->
                    </div>
                    <div class="col">
                    <div class="mb-3">
                        <label for="administrador" class="form-label">RUC</label>
                        <input type="text" id="administrador" class="form-control" v-model="clientes.RUC">
                    </div>
                    <div class="mb-3">
                        <label for="asociado" class="form-label">PORCENTAJE_EMPRESA</label>
                        <input type="text" id="asociado" class="form-control" v-model="clientes.PORCENTAJE_EMPRESA">
                    </div>
                    <!-- Agrega más campos de formulario aquí -->
                    </div>
                    
                    <div class="col">
                    <div class="mb-3">
                        <label for="base_empresa" class="form-label">CORREO</label>
                        <input type="text" id="base_empresa" class="form-control" v-model="clientes.CORREO">
                    </div>
                    <div class="mb-3">
                        <label for="correo" class="form-label">Correo</label>
                        <input type="email" id="correo" class="form-control" v-model="clientes.TELEFONO">
                    </div>
                    <!-- Agrega más campos de formulario aquí -->
                    </div>
                </div>
                <div class="row justify-content-between">
                    <div class="col-auto">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                    <div class="col-auto">
                    <button type="button" class="btn btn-secondary" @click="showModalEdit = false">Cancelar</button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
    </div>

</template>



<style>
/* Estilos para alinear el componente de búsqueda a la derecha */
.dt-search {
    float: right; /* Colocar el componente a la derecha */
    margin-right: 20px;
    margin-top: 1rem; /* Ajustar el margen derecho según sea necesario */

    margin-bottom: 1rem; /* Ajustar el margen derecho según sea necesario */
}

/* Estilos para alinear los botones de paginación a la derecha */
.dt-paging {
    text-align: center; /* Alinear los botones a la derecha */
    margin-top: 10px; /* Ajustar el margen superior según sea necesario */
}

/* Estilos para los botones de paginación */
.dt-paging-button {
    margin-left: 5px; /* Añadir un pequeño espacio entre los botones */
    /* Otros estilos según sea necesario */
}

</style>