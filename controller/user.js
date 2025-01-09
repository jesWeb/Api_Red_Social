//dependecioas y modulos 
const bycrypt = require("bcrypt")
const user = require("../models/user")
const itemsPerPage = require("mongoose-pagination")
//servicios 
const jwt = require("../services/jwt");
//acciones de pruebas 
const prueba_User = (req, res) => {
    return res.status(200).send({
        message: "mensaje enviado desde:controller/user.js",
        usuario: req.user
    })
}

const registerUser = async (req, res) => {
    // Recoger datos de la petición
    let params = req.body;

    // Comprobar que los datos lleguen correctamente + validación
    if (!params.name || !params.nickname || !params.apellidos || !params.password || !params.email) {
        return res.status(400).json({
            status: 'error',
            message: "faltan datos por enviar"
        });
    }

    try {
        // Control de usuarios duplicados
        const users = await user.findOne({
            $or: [{
                    email: params.email.toLowerCase()
                },
                {
                    nickname: params.nickname.toLowerCase()
                }
            ]
        });

        // Si existe el usuario
        if (users && users.legth >= 1) {
            return res.status(200).send({
                status: 'error',
                message: 'El usuario ya existe'
            });
        }

        // Cifrar la contraseña
        let pwd = await bycrypt.hash(params.password, 10);
        console.log("Contraseña cifrada:", pwd);
        params.password = pwd;
        // Crear objeto de usuario
        let user_save = new user(params);

        // Guardar usuario en la base de datos
        try {
            const userStored = await user_save.save();
            return res.status(200).json({
                status: 'success',
                message: "Usuario Registrado",
                user: userStored
            });
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
            return res.status(500).json({
                status: 'error',
                message: 'Error al guardar usuario'
            });
        }
    } catch (error) {
        console.error("Error en la consulta a la base de datos:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Error en la consulta a la base de datos'
        });
    }
};

const login = async (req, res) => {

    try {
        // Recoger datos de la petición
        let params = req.body;

        if (!params.email || !params.password) {
            return res.status(400).json({
                status: "error",
                message: "faltan datos por enviar"
            });
        }

        // Buscar en la base de datos si existe
        const userLogin = await user.findOne({
            email: params.email
        });

        if (!userLogin) {
            return res.status(400).send({
                status: 'error',
                message: 'el usuario no existe'
            });
        }

        // Comprobar la contraseña
        const pwd = bycrypt.compareSync(params.password, userLogin.password);

        if (!pwd) {
            return res.status(400).send({
                status: 'error',
                message: 'no te has identificado correctamente'
            });
        }

        //generar token jwt
        const token = jwt.createToken(user);


        // Devolver datos del usuario
        return res.status(200).json({
            status: 'success',
            message: 'login',
            user: {
                id: userLogin._id,
                name: userLogin.name,
                nickname: userLogin.nickname
            },
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 'error',
            message: 'Hubo un error en el servidor'
        });
    }

}


const profile = async (req, res) => {
    //recibir parametro del id user
    const id = req.params.id;
    //consulta en db para sacar los datos del usuario 
    //nota el select ocultara el valor de la contraseña y el rol
    const PerfilData = await user.findById(id).select({
        password: 0,
        role: 0
    });
    const UserProfile = PerfilData;

    if (!UserProfile) {

        return res.status(404).send({
            status: 'error',
            message: 'No se ha encontrado el usuario'
        })
    } else {
        return res.status(200).send({
            status: 'success',
            message: 'Perfil de usuario',
            user: UserProfile
        })
    }
    //devilver datos al usuario
}

//listar usuarios 

const list = async (req, res) => {
    try {
        // Controlar la página en la que estamos
        let page = 1;

        if (req.params.page) {
            page = req.params.page;
        }

        page = parseInt(page);

        // Número de items por página
        let itemsPerPage = 5;


        const result = await user.find().sort('_id').paginate(page, itemsPerPage);

        // Verificar si no hay usuarios
        if (!result) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay usuarios que mostrar'
            });
        }


        return res.status(200).send({
            status: 'success',
            users: result.docs,
            page,
            itemsPerPage,
            total: result.total,
            pages: Math.ceil(result.total / itemsPerPage)
        });

    } catch (err) {
        // Manejar errores de consulta
        return res.status(500).send({
            status: 'error',
            message: 'Error en la consulta de usuarios',
            error: err.message,
        });
    }
};


//update 

const update = async (req, res) => {


    //recoger info del usuario 
    let usertoUpdate = req.body;
    let userIdentity = req.user;

    //eliminar campos sobrantes
    delete usertoUpdate.iat;
    delete usertoUpdate.exp;
    delete usertoUpdate.role;
    delete usertoUpdate.image;


    try { //compronar si el usuario ya extiste 

        // Control de usuarios duplicados
        const users = await user.find({
            $or: [{
                    email: usertoUpdate.email.toLowerCase()
                },
                {
                    nickname: usertoUpdate.nickname.toLowerCase()
                }
            ]
        });

        // Si existe el usuario
        let userIsset = false;

        users.forEach(() => {
            if (users && user._id != userIdentity.id) userIsset = true;
        })


        if (userIsset) {
            return res.status(200).send({
                status: 'error',
                message: 'El usuario ya, existe'
            });
        }

        //cifrarla contrasena
        if (usertoUpdate.password) {
            let pwd = await bycrypt.hash(usertoUpdate.password, 10);
            usertoUpdate.password = pwd;
        }

        //buscar y actualizar 
        let userUpdated;
        try {
            userUpdated = await user.findByIdAndUpdate(userIdentity.id, usertoUpdate, {
                new: true
            });
        } catch (error) {
            console.error("Error en la actualización del usuario:", error);
            return res.status(500).json({
                status: 'error',
                message: 'Error al actualizar el usuario'
            });
        }

        return res.status(200).send({
            status: 'success',
            message: 'metodo update',
            usertoUpdate
        });

    } catch (error) {
        console.error("Error en la consulta a la base de datos:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Error en la consulta a la base de datos'
        });
    }




}


//



//exportar acciones 
module.exports = {
    prueba_User,
    registerUser,
    login,
    profile,
    list,
    update
}