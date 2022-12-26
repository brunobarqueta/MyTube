import { StyledRegisterVideo } from "./styles"
import React from 'react'

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

const RegisterVideo = () => {
    const formCadastro = useForm({
        initialValues: {titulo: "aaa", url: "http://"}
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
                    setFormVisivel(false);
                    formCadastro.clearForm(); 
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input placeholder="Título do vídeo" name="titulo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange}/>
                        <input placeholder="URL" name="url" value={formCadastro.values.url} onChange={formCadastro.handleChange}/>
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