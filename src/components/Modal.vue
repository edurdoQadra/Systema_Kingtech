<script setup>
import { DefineProps } from 'vue';

const props = DefineProps({
    modal:string, title:string 
});

</script>

<template>
    <div class="modal" :id="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- <p>Modal body text goes here.</p> -->
        <!-- <form @submit.prevent="save">
            <div class="mb-3">
                <label for="administrador" class="form-label">Administrador</label>
                <input type="text" class="form-control" id="administrador" v-model="form.ADMINISTRADOR" required>
            </div>
            <div class="mb-3">
                <label for="reportes" class="form-label">Reportes</label>
                <input type="text" class="form-control" id="reportes" v-model="form.REPORTES" required>
            </div>
            <div class="mb-3">
                <label for="departamento" class="form-label">Departamento</label>
                <input type="text" class="form-control" id="departamento" v-model="form.DEPARTAMENTO" required>
            </div>
            <div class="mb-3">
                <label for="provincia" class="form-label">Provincia</label>
                <input type="text" class="form-control" id="provincia" v-model="form.PROVINCIA" required>
            </div>
            <div class="mb-3">
                <label for="distrito" class="form-label">Distrito</label>
                <input type="text" class="form-control" id="distrito" v-model="form.DISTRITO" required>
            </div>
            <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" class="form-control" id="direccion" v-model="form.DIRECCION" required>
            </div>
            <div class="mb-3">
                <label for="referencia" class="form-label">Referencia</label>
                <input type="text" class="form-control" id="referencia" v-model="form.REFERENCIA" required>
            </div>
            <div class="mb-3">
                <label for="asociado" class="form-label">Asociado</label>
                <input type="text" class="form-control" id="asociado" v-model="form.ASOCIADO" required>
            </div>
            <div class="mb-3">
                <label for="dni" class="form-label">DNI</label>
                <input type="text" class="form-control" id="dni" v-model="form.DNI" required>
            </div>
            <div class="mb-3">
                <label for="numero" class="form-label">Número</label>
                <input type="text" class="form-control" id="numero" v-model="form.NUMERO" required>
            </div>
            <div class="mb-3">
                <label for="razon_social" class="form-label">Razón Social</label>
                <input type="text" class="form-control" id="razon_social" v-model="form.RAZON_SOCIAL" required>
            </div>
            <div class="mb-3">
                <label for="ruc" class="form-label">RUC</label>
                <input type="text" class="form-control" id="ruc" v-model="form.RUC" required>
            </div>
            <div class="mb-3">
                <label for="porcentaje_empresa" class="form-label">Porcentaje de la Empresa</label>
                <input type="text" class="form-control" id="porcentaje_empresa" v-model="form.PORCENTAJE_EMPRESA" required>
            </div>
            <div class="mb-3">
                <label for="correo" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="correo" v-model="form.CORREO" required>
            </div>
            <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input type="tel" class="form-control" id="telefono" v-model="form.TELEFONO" required>
            </div>
            <div class="mb-3">
                <label for="estado_local" class="form-label">Estado Local</label>
                <input type="text" class="form-control" id="estado_local" v-model="form.ESTADO_LOCAL" required>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-primary">Registrarse</button>
            </div>
            </form> -->
        <!--  -->
        <slots></slots>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>