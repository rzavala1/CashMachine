const nanoid = require('nanoid');

const TABLE_ACOUNT = 'acount';
const ACOUNT_CREDIT = 2;
const ACOUNT_DEBIT = 1;
const TARIFF=.1;

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE_ACOUNT);
    }

    function get(id) {
        return store.get(TABLE_ACOUNT, id);
    }

    function getAcountsUser(id) {
        return store.getAcountForUser(TABLE_ACOUNT, id);
    }

    function getAcountsUser(id) {
        return store.getAcountForUser(TABLE_ACOUNT, id);
    }

    
    function getCashCredit(body) {
        /*Un usuario puede retirar dinero de una cuenta de crédito con una tarifa del 10%, 
        si el usuario tiene crédito y es
        menos de lo requerido.*/

        return store.transationCashCredit(TABLE_ACOUNT, body.id_acount,body.mount,TARIFF, ACOUNT_CREDIT);
    }

    function getCashDebit(body) {
        /*Un usuario puede retirar dinero de una cuenta de débito solo si el usuario
         tiene la cantidad disponible y es menor
        que la requerida.*/

        return store.transationCashDebit(TABLE_ACOUNT, body.id_acount,body.mount, ACOUNT_DEBIT);
    }

    function depositDebit(body) {
        /*Un usuario puede depositar más en su cuenta de débito*/
        
        return store.depositDebit(TABLE_ACOUNT, body.id_acount, body.mount, ACOUNT_DEBIT);
    }
    
    function payCredit(body) {
        /* Un usuario solo puede pagar su cuenta de crédito.*/
        //obtener cuenta por el idUsuario
        return store.depositDebit(TABLE_ACOUNT, body.id_acount, body.mount, ACOUNT_CREDIT);
    }

    function upsert(body) {
        const acount = {
            name: body.name
        }

        if (body.id) {
            acount.id = body.id;
        } else {
            acount.id = nanoid();
        }

        return store.upsert(TABLE_ACOUNT, acount);
    }

    return {
        list,
        get,
        upsert,
        getCashCredit,
        payCredit,
        getCashDebit,
        depositDebit,
        getAcountsUser
    };
}