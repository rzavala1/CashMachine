const db = {
    'user': [
        { id: '1', name: 'Juan', lastname:"Zamudio", password:"" },
    ],
    'type_acount': [
        { id: '1', name: 'Debito', description:"Tipo de cuenta de tipo debito"},
        { id: '2', name: 'Credito', description:"Tipo de cuenta de tipo credito"},
    ],
    'acount': [
        { id: '1', user:"1", type_acount: '1', mount:100},
        { id: '2', user:"1", type_acount: '2', mount:1000 },
    ],

};

async function list(table) {
    return db[table];
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function getAcountForUser(table, id) {
    let col = await list(table);
    return col.filter(item => item.user === id)|| null;
}

async function transationCashDebit(table, id,mount, type) {
    let col = await list(table);
    let result=col.filter((item)=>{if(item.id==id && item.type_acount==type){return col}});
    if(result){
        let tariffMount=result[0].mount-mount;
        if(result[0].mount>=tariffMount){
            //se modifica la cantidad
            result[0].mount=tariffMount;
            return upsert(table,result);;
        }
    }else{
        return null;
    }
}


async function depositDebit(table, id, mount, type) {
    let col = await list(table);
    let result=col.filter((item)=>{if(item.id==id && item.type_acount==type){return col}});

    if(result){
        result[0].mount=result[0].mount+mount;
        return upsert(table,result);;
    }else{
        return null;
    }
}

async function payCredit(table, id, mount, type) {
    let col = await list(table);
    let result=col.filter((item)=>{if(item.id==id && item.type_acount==type){return col}});

    if(result){
        result[0].mount=result[0].mount+mount;
        return upsert(table,result);;
    }else{
        return null;
    }
}


async function transationCashCredit(table, id, mount,tariff, type) {
    let col = await list(table);
    let result=col.filter((item)=>{if(item.id==id && item.type_acount==type){return col}});

    if(result){
        let tariffMount=result[0].mount-(result[0].mount*tariff)-mount;
        if(tariffMount<=result[0].mount){
            result[0].mount=tariffMount;
            return upsert(table,result);;
        }
    }
    return null;
}

async function upsert(table, data) {
    db[table].push(data);
}

async function remove(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    getAcountForUser,
    transationCashDebit,
    depositDebit,
    transationCashCredit,
    payCredit
};
