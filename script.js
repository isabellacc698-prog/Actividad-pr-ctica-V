
import { createClient } from
"https://esm.sh/@supabase/supabase-js@2";

// Datos de conexión de Supabase
const SUPABASE_URL = "https://hypxybgvxvpwfqflijty.supabase.co";

const SUPABASE_KEY = "sb_publishable_x6A2XiGzM9F2Qlk9xwBUvA_UK3HoJJz";

// Crear conexión
const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// FORMULARIO DE LOGIN
const formulario = document.getElementById("loginForm");

if (formulario) {

    formulario.addEventListener("submit", async function(event) {

        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const contrasena = document.getElementById("contrasena").value;
        const mensaje = document.getElementById("mensaje");

        mensaje.textContent = "Verificando usuario...";

        // Validar usuario en Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: usuario,
            password: contrasena
        });

        if (error) {

            mensaje.textContent = "Usuario o contraseña inválidos.";

        } else {

            window.location.href = "bienvenida.html";

        }

    });

}


// PÁGINA DE BIENVENIDA
const paginaBienvenida = document.getElementById("bienvenida");

if (paginaBienvenida) {

    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {

        window.location.href = "index.html";

    } else {

        document.getElementById("nombreUsuario").textContent =
            data.session.user.email;

    }

}


// CERRAR SESIÓN
const cerrarSesion = document.getElementById("cerrarSesion");

if (cerrarSesion) {

    cerrarSesion.addEventListener("click", async function() {

        await supabase.auth.signOut();

        window.location.href = "index.html";

    });

}
