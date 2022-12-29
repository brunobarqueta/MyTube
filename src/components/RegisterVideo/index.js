import { StyledRegisterVideo } from "./styles"
import React from 'react'
import { createClient } from "@supabase/supabase-js"

const useForm = (props) => {
    const [values, setValues] = React.useState(props.initialValues);
    return {
        values,
        handleChange: (event) => {
            const value = event.target.value;
            const name = event.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm: () => {
            setValues({});
        }
    };
}

const PROJECT_URL = "https://ptqfpodvdwrhmrgamhsu.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cWZwb2R2ZHdyaG1yZ2FtaHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIwMTYwNDgsImV4cCI6MTk4NzU5MjA0OH0.1mfR6zLo8CYp8pFsDt1AvOpL9PA8p2MfWAzfhoC-Vb4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

const getThumbnail = (url) => {
    return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`;
}
const RegisterVideo = () => {
    const formCadastro = useForm({
        initialValues: { titulo: "Criança é parcialmente engolida por hipopótamo", url: "https://www.youtube.com/watch?v=PWfHwuSLp08" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel ? (

                <form onSubmit={(event) => {
                    event.preventDefault();

                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumbnail: getThumbnail(formCadastro.values.url),
                        playlist: "jogos"
                    })
                        .then((data) => {
                            console.log(data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input placeholder="Título do vídeo" name="titulo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange} />
                        <input placeholder="URL" name="url" value={formCadastro.values.url} onChange={formCadastro.handleChange} />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            ) : null}
        </StyledRegisterVideo>
    )
}

export default RegisterVideo