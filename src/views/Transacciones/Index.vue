<script setup>

import axios from 'axios';
import { ref, onMounted  } from 'vue';
import {sendRequest,confirmation,show_alert} from '../../functions';
import Swal from 'sweetalert2';
/******************************************************** */

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

//Define la propiedad para rastrear si una fila está seleccionada
const filaSeleccionada = ref(false);

    const form = ref({
        Sede: '',
        Fecha: '',
        Codigo_sede: '',
        Ticket: '',
        Venta: '',
        Utilidad: '',
        Porcentaje_c_v: ''       
    });

    const formEdit = ref({
        Sede: '',
        Fecha: '',
        Codigo_sede: '',
        Ticket: '',
        Venta: '',
        Utilidad: '',
        Porcentaje_c_v: '' 
    });

    window.JSZip = JsZip;
    DataTable.use(ButtonsHtml5);
    DataTable.use(Select);


    const openModal = (title) => {
        clientes.value.Sede='';
        clientes.value.Fecha= "";
        clientes.value.Codigo_sede= "";
        clientes.value.Ticket= "";
        clientes.value.Venta= "";
        clientes.value.Utilidad= "";
        clientes.value.Porcentaje_c_v=""; 
        showModal.value = true;  
        console.log('mensjae de exito');
    }

/*******************************************************************************************************************/
/****************************************** Testear Nuevamente *****************************************************/
/*******************************************************************************************************************/

    const openModalEdit = (title) => {

    const selectedRows = table.value.dt.rows({ selected: true }).data().toArray();
    const selectedRowsData= selectedRows[0];

            clientes.value.Sede = selectedRowsData.Sede;
            clientes.value.Codigo_sede = selectedRows.Codigo_sede;
            clientes.value.Ticket = selectedRows.Ticket;
            clientes.value.Venta = selectedRowsData.Venta; 
            clientes.value.Utilidad = selectedRowsData.Utilidad;
            clientes.value.Porcentaje_c_v = selectedRowsData.Porcentaje_c_v;

         modalTitleEdit.value = title;
         showModalEdit.value = true;  
        console.log('mensjae de exito' + title);

        
    } 
    
    const handleRowSelection = (event) => {
        const selectedRows = table.value.dt.rows({ selected: true }).count();
    // Si hay filas seleccionadas, establecer filaSeleccionada en true
    filaSeleccionada.value = selectedRows > 0;
    };

/******************************************************************************************************************* */
/******************************************* Testear Nuevamente **************************************************** */
/******************************************************************************************************************* */

    const handleRowSelectionDelete = (event) => {
        const selectedRows = table.value.dt.rows({ selected: true }).count();
        // Si hay filas seleccionadas, establecer filaSeleccionada en true
        filaSeleccionada.value = selectedRows > 0;
    };

    /**************************************************************************************************************** */
/******************************************Testear Nuevamente**************************************************** */
/**************************************************************************************************************** */


    columns.value = [{ data:null,render:function(data,type,row,meta)
        {return (meta.row+1)}},
        {data:'Sede'},
        {data:'Fecha'},
        {data:'Venta'},
        {data:'Ticket'},
    ];

    /**************************************************************************************************************** */
/******************************************Testear Nuevamente**************************************************** */
/**************************************************************************************************************** */


    buttons.value =[
        {
        title:'Transacciones',extend:'excelHtml5',
        text:'<i class="fa-solid fa-file-excel"></i> Excel',
        className:'btn btn-success my-2'
        },
        {
        title:'Transacciones',extend:'pdfHtml5',
        text:'<i class="fa-solid fa-file-pdf"></i> PDF',
        className:'btn btn-primary my-2'
        },
        {
        title:'Transacciones',extend:'print',
        text:'<i class="fa-solid fa-print"></i> PRINT',
        className:'btn btn-dark my-2'
        },
        {
        title:'Transacciones',extend:'copy',
        text:'<i class="fa-solid fa-copy"></i> COPY',
        className:'btn btn-secondary my-2'
        }
    ];
/**************************************************************************************************************** */
/******************************************Testear Nuevamente**************************************************** */
/**************************************************************************************************************** */


    const update = async () => {
    const selectedRows = table.value.dt.rows({ selected: true }).data().toArray();
    if (selectedRows.length > 0) {
        const selectedRowData = selectedRows[0];
        const id = selectedRowData.id; // Asegúrate de tener la propiedad de identificación adecuada aquí

        // Realiza la lógica de actualización aquí con los datos de la fila seleccionada
        try {
            // Por ejemplo:
            await sendRequest('PUT', selectedRowData, 'http://localhost:8000/api/v4/client/' + id);
            // Muestra una alerta o realiza alguna acción después de la actualización
            show_alert('Registro actualizado correctamente', 'success', '');
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la actualización
            show_alert('Error al actualizar el registro', 'error', '');
        }
    } else {
        // Muestra un mensaje si no se ha seleccionado ninguna fila
        show_alert('Por favor, seleccione una fila para actualizar', 'warning', '');
    }
};
/**************************************************************************************************************** */
/******************************************Testear Nuevamente**************************************************** */
/**************************************************************************************************************** */


    const save = async () => {

        let venta = parseFloat(form.value.Venta);
        let utilidad = parseFloat(form.value.Utilidad);
        let porcentaje_c_V = parseFloat(form.value.Porcentaje_c_v);
        // Aquí puedes continuar con el envío del formulario y cualquier otra lógica necesaria
        // Después de convertir las cadenas en números, puedes limpiar los campos del formulario
        form.value.Venta = venta; // Actualiza con el valor convertido a float
        form.value.Utilidad = utilidad; // Actualiza con el valor convertido a float
        form.value.Porcentaje_c_v = porcentaje_c_V; // Actualiza con el valor convertido a float
        console.log(form);
        await  sendRequest('POST',form.value,'http://localhost:8000/api/v4/create','listbet');
        showModal.value = false;
        //console.log(form);

    }

/**************************************************************************************************************** */
/******************************************Testear Nuevamente**************************************************** */
/**************************************************************************************************************** */


        const deleteCliente = () => {
            const selectedRows = table.value.dt.rows({ selected: true }).data().toArray();
            if (selectedRows.length > 0) {
                const id = selectedRows[0].id;
                const name = selectedRows[0].Sede;
                const alert = Swal.mixin({ buttonStyling: true });
                alert.fire({
                    title: '¿Está seguro de querer borrar el registro ' + name + '?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: '<i class="fa fa-solid fa-check"></i> Sí, borrar',
                    cancelButtonText: '<i class="fa fa-solid fa-check"></i> Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        confirmation(name, 'http://localhost:8000/api/v4/delete/' + id, '/listbet');
                    }
                });
            } else {
                let desc = 'Debe seleccionar una fila antes de poder borrarla';
                show_alert(desc, 'error', '');
            }
        };
        
/**************************************************************************************************************** */
/******************************************Testear Nuevamente**************************************************** */
/**************************************************************************************************************** */



    onMounted(  
        async ()=> { 
            const resp = await axios.get('http://localhost:8000/api/v4/transactions');
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
                        <button  class="btn btn-lg"  @click="openModal('Crear')">
                        <i class="fa-solid fa-circle-plus mx-1"></i>Agregar
                    </button>
                        <button class="btn btn-lg"  @click="openModalEdit('Editar')" >
                            <i class="fa-solid fa-circle-plus mx-1"></i>Editar
                        </button>
                        <button class="btn btn-lg" >
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

        <!-- ******************************************** @select="handleRowSelection"******************************************************************************************  -->

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
                        >
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Sede</th>
                            <th>Fecha</th>
                            <th>Venta</th>
                            <th>Ticket</th>
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
                            <label for="sede" class="form-label">SEDE</label>
                            <input type="text" id="sede" class="form-control" v-model="form.Sede">
                        </div>
                        <div class="mb-3">
                            <label for="porcentaje_c_v" class="form-label">Porcentaje </label>
                            <input type="text" id="porcentaje_c_v" class="form-control" v-model="form.Porcentaje_c_v">
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="codigo_sede" class="form-label">CODIGO</label>
                            <input type="text" id="codigo_sede" class="form-control" v-model="form.Codigo_sede">
                        </div>
                        <div class="mb-3"> 
                            <label for="ticket" class="form-label">TICKET</label>
                            <input type="text" id="ticket" class="form-control" v-model="form.Ticket">
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="venta" class="form-label">VENTA</label>
                            <input type="text" id="venta" class="form-control" v-model="form.Venta">
                        </div>
                        <div class="mb-3">
                            <label for="utilidad" class="form-label">UTILIDAD</label>
                            <input type="text" id="utilidad" class="form-control" v-model="form.Utilidad">
                        </div>
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
                <h5 class="modal-title">{{ modalTitleEdit }}</h5>
                <button type="button" class="btn-close" @click="showModalEdit = false"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="update">
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <label for="sede" class="form-label">SEDE</label>
                            <input type="text" id="sede" class="form-control" v-model="clientes.Sede">
                        </div>
                        <div class="mb-3">
                            <label for="utilidad" class="form-label">UTILIDAD</label>
                            <input type="text" id="utilidad" class="form-control" v-model="clientes.Utilidad">
                        </div>                        
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="codigo_sede" class="form-label">CODIGO</label>
                            <input type="text" id="codigo_sede" class="form-control" v-model="clientes.Codigo_sede">
                        </div>
                        <div class="mb-3"> 
                            <label for="ticket" class="form-label">TICKET</label>
                            <input type="text" id="ticket" class="form-control" v-model="clientes.Ticket">
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="venta" class="form-label">VENTA</label>
                            <input type="text" id="venta" class="form-control" v-model="clientes.Venta">
                        </div>                      
                        <div class="mb-3">
                            <label for="porcentaje_c_v" class="form-label">PORCENTAJE </label>
                            <input type="text" id="porcentaje_c_v" class="form-control" v-model="clientes.Porcentaje_c_v">
                        </div>
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