const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');
const { isAdmin } = require('../lib/auth');

router.get('/addUser', (req, res) => {
    res.render('links/addUser');
});

router.get('/login', (req, res) => {
    res.render('links/login');
});

router.post('/searchData', (req, res) => {
    res.send('received');
});

router.post('/altas', async (req, res) => {
    console.log(req.body)
    const { Calle, No_Ext, No_Int, Colonia, CP } = req.body
    const { estatura, peso, forma_cabeza, tipo_cabello, color_cabello, tipo_cejas, color_ojos, tamano_orejas, tez_piel, vello_facial } = req.body
    const { nombre, nombre2, ap_paterno, ap_materno, alias, ine, fecha_nac, edad, sexo, pref_sexual, ocupacion, escolaridad, est_civil } = req.body
    const { ParteCuerpo, Descipcion, Link_Fotos } = req.body
    const { tipo_vestimenta, marca_pantalones, color_pantalon } = req.body
    const { tipo_vestimenta1, marca_playeras, color_ropa } = req.body
    const { tipo_vestimenta2, marca_calzado, color_calzado } = req.body
    const { marca_accesorios, color_accesorios } = req.body
    const { lugar, colonia, sector, fecha, hora } = req.body
    const { modus_operandi } = req.body
    const { tipo_arma, modelo, tamano } = req.body
    const { Motivo } = req.body
    const { ubicacion_oxxo } = req.body
    const { tipo_vehiculo, marca, serie, num_placa, color } = req.body
    const { tipo_familiar, nombre_familiar, telefono } = req.body
    const acceso = req.body['acceso[]'];
    const adiccion = req.body['acceso[]'];
    const newDatant = {
        Estatura: estatura,
        Peso: peso,
        Forma_cabeza: forma_cabeza,
        Cabello: tipo_cabello,
        Color_cabello: color_cabello,
        Cejas: tipo_cejas,
        Color_ojos: color_ojos,
        Tamaño_orejas: tamano_orejas,
        Tez: tez_piel,
        Vello_facial: vello_facial
    }
    const newDomicilio = {
        Calle, No_Ext, No_Int, Colonia, CP
    }
    const partec = {
        ParteCuerpo
    }
    const vinf = {
        Descripcion: tipo_vestimenta,
        Marca: marca_pantalones,
        Color: color_pantalon
    }
    const vsup = {
        Descripcion: tipo_vestimenta1,
        Marca: marca_playeras,
        Color: color_ropa
    }
    const calzado = {
        Descripcion: tipo_vestimenta2,
        Marca: marca_calzado,
        Color: color_calzado
    }
    const accesorios = {
        Marca: marca_accesorios,
        Color: color_accesorios
    }
    //Se inserta en la base de datos el tipo de Vestimenta
    await pool.query('INSERT INTO vestimenta_inferior SET ?', [vinf]);
    await pool.query('INSERT INTO vestimenta_superior SET ?', [vsup]);
    await pool.query('INSERT INTO calzado SET ?', [calzado]);
    //Se selecciona el ultimo elemento agregado a la vestimenta
    const vi = await pool.query('SELECT * FROM vestimenta_inferior ORDER BY Id_vInferior DESC LIMIT 1;')
    const vs = await pool.query('SELECT * FROM vestimenta_superior ORDER BY Id_vSuperior DESC LIMIT 1;')
    const ca = await pool.query('SELECT * FROM calzado ORDER BY Id_Calzado DESC LIMIT 1;')

    const vestimenta = {
        Id_vSuperior: vs[0].Id_vSuperior,
        id_vInferior: vi[0].Id_vInferior,
        Id_Calzado: ca[0].Id_Calzado
    }
    //Se agrega la Vestimenta
    await pool.query('INSERT INTO vestimenta SET ?', [vestimenta]);
    const ves_id = await pool.query('SELECT * FROM vestimenta ORDER BY Id_Vestimenta DESC LIMIT 1;')

    await pool.query('INSERT INTO accesorios SET ?', [accesorios]);
    await pool.query('INSERT INTO domicilio SET ?', [newDomicilio]);
    await pool.query('INSERT INTO datos_antropomorficos SET ?', [newDatant]);
    await pool.query('INSERT INTO parte_cuerpo SET ?', [partec]);
    const resul = await pool.query('SELECT * FROM domicilio ORDER BY Id_Domicilio DESC LIMIT 1;')
    const resul2 = await pool.query('SELECT * FROM datos_antropomorficos WHERE Id_Datant = LAST_INSERT_ID();')
    const resul3 = await pool.query('SELECT * FROM parte_cuerpo ORDER BY Id_pCuerpo DESC LIMIT 1;')
    console.log(resul)
    const newDetenido = {
        nombre, nombre2, ap_paterno, ap_materno, alias, ine, fecha_nac, edad, sexo, pref_sexual, ocupacion, id_Domicilio: resul[0].Id_Domicilio, Id_DatAnt: resul2[0].Id_Datant, escolaridad, est_civil
    }
    await pool.query('INSERT INTO datos_personales SET ?', [newDetenido]);
    const resul4 = await pool.query('SELECT * FROM datos_personales ORDER BY Id_Detenido DESC LIMIT 1;')

    const newTatuaje = {
        Id_Detenido: resul4[0].Id_Detenido,
        Id_pCuerpo: resul3[0].Id_pCuerpo,
        Descipcion,
        Link_Fotos
    }

    const newDatosFamiliares = {
        Id_Detenido: resul4[0].Id_Detenido,
        Tipo_Fam: tipo_familiar,
        Nombre_Fam: nombre_familiar,
        Telefono: telefono
    }

    await pool.query('INSERT INTO tatuajes_detenido SET ?', [newTatuaje]);
    await pool.query('INSERT INTO datos_familiares SET ?', [newDatosFamiliares]);

    const newDetencion = {
        lugar,
        Colonia: colonia,
        Sector: sector,
        Fecha: fecha,
        Hora: hora,
        id_Detenido: resul4[0].Id_Detenido,
        Id_Vestimenta: ves_id[0].Id_Vestimenta
    }

    const newModuOpe = {
        Modus: modus_operandi
    }
    const newArma = {
        Tipo_Arma: tipo_arma,
        Modelo: modelo,
        Tamanio: tamano
    }

    const motDetencion = {
        Motivo
    }

    const RegistroAcceso = JSON.stringify(acceso);
    const Adicciones = JSON.stringify(adiccion);

    const newOxxo = {
        Ubicacion: ubicacion_oxxo
    }

    const newVehiculo = {
        Tipo_Vehiculo: tipo_vehiculo,
        Marca: marca,
        Serie: serie,
        Num_Placa: num_placa,
        Color: color
    }

    await pool.query('INSERT INTO datos_detencion SET ?', [newDetencion]);
    await pool.query('INSERT INTO modus_operandi SET ?', [newModuOpe]);
    await pool.query('INSERT INTO arma SET ?', [newArma]);
    await pool.query('INSERT INTO motivos_detencion SET ?', [motDetencion]);
    await pool.query('INSERT INTO nivel_acceso (acceso) VALUES (?)', [RegistroAcceso]);
    await pool.query('INSERT INTO adicciones (Adiccion) VALUES (?)', [Adicciones]);
    await pool.query('INSERT INTO oxxo SET ?', [newOxxo]);
    await pool.query('INSERT INTO vehiculo SET ?', [newVehiculo]);

    const id_tatuaje = await pool.query('SELECT * FROM tatuajes_detenido ORDER BY Id_Tatuaje DESC LIMIT 1;')
    const id_adiccion = await pool.query('SELECT * FROM adicciones ORDER BY Id_Adiccion DESC LIMIT 1;')
    const id_familiares = await pool.query('SELECT * FROM datos_familiares ORDER BY Id_Familiar DESC LIMIT 1;')
    const id_datos_detencion = await pool.query('SELECT * FROM datos_detencion ORDER BY Id_Detencion DESC LIMIT 1;')
    const id_oxxo = await pool.query('SELECT * FROM oxxo ORDER BY Id_Oxxo DESC LIMIT 1;')

    const newGlobal = {
        id_detenido: resul4[0].Id_Detenido,
        id_datant: resul2[0].Id_Datant,
        id_tatuaje: id_tatuaje[0].Id_Tatuaje,
        id_adiccion: id_adiccion[0].Id_Adiccion,
        id_domicilio: resul[0].Id_Domicilio,
        id_familiar: id_familiares[0].Id_Familiar,
        id_datosdet: id_datos_detencion[0].Id_Detencion,
        id_oxxo: id_oxxo[0].Id_Oxxo
    }
    await pool.query('INSERT INTO global SET ?', [newGlobal]);


    res.redirect('/links');
});

router.get('/altas', isLoggedIn, isAdmin, (req, res) => {
    res.render('links/altas');
});

router.get('/', isLoggedIn, isAdmin, async (req, res) => {
    const id_global = await pool.query('SELECT global.*, datos_personales.*, datos_antropomorficos.*, domicilio.*, datos_detencion.*, oxxo.* FROM global JOIN datos_personales ON global.id_detenido = datos_personales.Id_Detenido JOIN datos_antropomorficos ON global.id_datant = datos_antropomorficos.Id_Datant JOIN domicilio ON global.id_domicilio = domicilio.Id_Domicilio JOIN datos_detencion ON global.id_datosdet = datos_detencion.Id_Detencion JOIN oxxo ON global.id_oxxo = oxxo.Id_Oxxo;')
    console.log(id_global)
    res.render('links/delitos', { id_global });
});

router.get('/consultas', isLoggedIn, async (req, res) => {
    res.render('links/consultas');
});




module.exports = router;