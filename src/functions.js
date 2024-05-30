import Swal from 'sweetalert2';
import { nextTick  } from '@vue/runtime-core';

export function show_alert(msj,icon,focus){
    if(focus !== ''){
        nextTick (()=>focus.value.focus());
    }
    Swal.fire({
        title:msj,icon:icon,buttonStiling:true
    });
}

// export function confirmation(name,url,redirect){
//     const alert = Swal.mixin({buttonStyling:true});
//     alert.fire({
//         title:'esta seguro de borrar el registro ' + name+ '?',
//         icon:'question',showCancelButton:true,
//         confirmbuttontext:'<i class="fa-solid fa-check"></i> Yes Delete',
//         cancelbuttontext:'<i class="fa-solid fa-ban"></i> Cancel'
//     }).then((result)=>{
//             if(result.isConfirmed){
//                 //send request
//                 sendRequest('DELETE', {}, url,redirect);
//             }
//     })
// }

export function confirmation(name, url, redirect) {
    const alert = Swal.mixin({ buttonStyling: true });
    alert.fire({
        title: '¿Está seguro de borrar el registro ' + name + '?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Yes Delete',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Envía la solicitud
            sendRequest('DELETE', {}, url, redirect);
        }
    })
}

// export async function sendRequest (method,params,url,redirect=''){
//         let res;
//         await axios ({method:method, url:url, data:params}).then(
//             response=>{
//                 res=response.data.status,
//                 show_alert(response.data.message,'success',''),
//                 setTimeout(
//                     ()=>(redirect !=='') ? window.location.href=redirect:'',2000)
//             }).catch((errors)=>{
//                 let desc='',
//                 res=errors.response.data.status;
//                 errors.response.data.errors.map((e)=>{desc=desc+''+e})
//                 show_alert(desc,'error','')
//             })
//             return res;
// }
export async function sendRequest(method, params, url, redirect = '') {
    console.log('sdfblsdb');
    let res;
    await axios({ method: method, url: url, data: params }).then(
        response => {
            res = response.data.status;
            show_alert(response.data.message, 'success', '');
            setTimeout(
                () => {
                    if (redirect !== '') {
                        window.location.href = redirect;
                    }
                },
                2000
            );
        }
    ).catch((errors) => {
        let desc = '';
        res = errors.response.data.status;
        if (errors.response.data.errors) {
            desc = errors.response.data.errors.map((e) => desc + '' + e);
        } else {
            desc = 'Unknown error occurred';
        }
        show_alert(desc, 'error', '');
    });
    return res;
}


