import React, {
    useState,
    useCallback,
    FormEvent
} from 'react';

import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '../../service/api';

import { FormSignInContent } from './styles';

interface IUserLogin{
    usuario: string
    senha: string;
}

const FormSignIn: React.FC = () => {

    const [formDataContent, setFormDataContent] = useState<IUserLogin>({} as IUserLogin);

    const [isLoad, setIsLoad] = useState<boolean>(false)

    const history = useHistory()

    const loginSubmit = useCallback( 
        ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        setIsLoad(true)
        api.post('login', formDataContent).then(
            response => {
                localStorage.setItem('@tokenAfiaApp', response.data.token)

                toast.success('Login realizado!', {
                    onClose: () => history.push('/panel')
                })
            }
        ).catch( err => toast.error('OOOps, algo deu errado')).finally( () => setIsLoad(false))
    }, [formDataContent, history])

    return (
        <FormSignInContent>
            { isLoad ? ( <p>Carregando</p> ) : (
                <form onSubmit={loginSubmit}>
                <input type="text" placeholder="Nome de usuário"
                onChange={ e => setFormDataContent({...formDataContent, usuario: e.target.value})}
                />
                
                <input type="password" placeholder="Senha"
                onChange={ e => setFormDataContent({...formDataContent, senha: e.target.value})}
                />
                <button type="submit">Logar</button>
              </form>
            )}
        </FormSignInContent>
    );
}

export default FormSignIn;